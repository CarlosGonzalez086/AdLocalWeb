import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const panelRoot = resolve(webRoot, "..", "AdLocal");
const markPath = join(webRoot, "public", "logo-adlocal-mark.svg");
const logoPath = join(webRoot, "public", "logo-adlocal.svg");
const ivory = { r: 248, g: 246, b: 242, alpha: 1 };

await copyFile(logoPath, join(panelRoot, "public", "logo-adlocal.svg"));
await copyFile(markPath, join(panelRoot, "public", "logo-adlocal-mark.svg"));

async function icon(destination, size, scale) {
  const markSize = Math.round(size * scale);
  const mark = await sharp(markPath).resize(markSize, markSize).png().toBuffer();
  await mkdir(dirname(destination), { recursive: true });
  await sharp({ create: { width: size, height: size, channels: 4, background: ivory } })
    .composite([{ input: mark, left: Math.floor((size - markSize) / 2), top: Math.floor((size - markSize) / 2) }])
    .png()
    .toFile(destination);
  console.log(destination);
}

const webIcons = [
  ["adlocal-32.png", 32, 0.96],
  ["adlocal-48.png", 48, 0.94],
  ["adlocal-192.png", 192, 0.84],
  ["adlocal-512.png", 512, 0.84],
  ["adlocal-maskable-192.png", 192, 0.58],
  ["adlocal-maskable-512.png", 512, 0.58],
  ["adlocal-apple-touch-180.png", 180, 0.80],
];

const panelIcons = [
  ["adlocal-32.png", 32, 0.96],
  ["adlocal-64.png", 64, 0.91],
  ["adlocal-192.png", 192, 0.84],
  ["adlocal-512.png", 512, 0.84],
  ["adlocal-maskable-512.png", 512, 0.58],
  ["adlocal-apple-touch-180.png", 180, 0.80],
];

for (const [filename, size, scale] of webIcons) {
  await icon(join(webRoot, "public", "icons", filename), size, scale);
}
for (const [filename, size, scale] of panelIcons) {
  await icon(join(panelRoot, "public", filename), size, scale);
}

const socialLogo = await sharp(logoPath).resize({ width: 550 }).png().toBuffer();
const socialLabel = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <path d="M0 0h1200v12H0z" fill="#008989"/>
  <text x="600" y="555" text-anchor="middle" fill="#006D70" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700">Tu puente con la comunidad</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 4, background: ivory } })
  .composite([
    { input: socialLogo, left: 325, top: 45 },
    { input: socialLabel, left: 0, top: 0 },
  ])
  .png()
  .toFile(join(webRoot, "public", "adlocal-social.png"));
console.log(join(webRoot, "public", "adlocal-social.png"));
