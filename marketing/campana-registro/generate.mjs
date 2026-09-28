import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const logoPath = join(here, "..", "..", "public", "adlocal-logo-comunidad.svg");

const colors = {
  teal: "#008989",
  tealDark: "#006D70",
  orange: "#E7692C",
  orangeDark: "#C9551D",
  ivory: "#F8F6F2",
  ink: "#1C1D1F",
  muted: "#555E61",
  border: "#EAE5DD",
};

const flyers = [
  {
    id: "01-descubre",
    photo: "panaderia.png",
    cropTop: 180,
    eyebrow: "01  /  PARA QUIENES ELIGEN CERCA",
    title: ["Lo mejor de tu barrio", "está más cerca."],
    body: [
      "Explora productos y servicios de tu zona.",
      "Crea tu cuenta y encuentra nuevos favoritos.",
    ],
    action: "Quiero descubrir",
    url: "adlocal.store/usuario/crear-cuenta",
    accent: colors.teal,
  },
  {
    id: "02-comercios",
    photo: "floreria.png",
    cropTop: 165,
    eyebrow: "02  /  PARA LOS NEGOCIOS DE AQUÍ",
    title: ["Tu negocio tiene", "un lugar aquí."],
    body: [
      "Presenta lo que haces a personas de tu zona.",
      "Regístrate y conecta con tu comunidad.",
    ],
    action: "Registrar mi negocio",
    url: "panel.adlocal.store/usuario/crear-cuenta",
    accent: colors.orange,
  },
  {
    id: "03-comunidad",
    photo: "comunidad.png",
    cropTop: 255,
    eyebrow: "03  /  TU COMUNIDAD, TU LUGAR",
    title: ["Elegir cerca nos", "acerca más."],
    body: [
      "Conoce los negocios que le dan vida a tu colonia.",
      "Cada elección local hace comunidad.",
    ],
    action: "Unirme a ADLocal",
    url: "adlocal.store/usuario/crear-cuenta",
    accent: colors.teal,
  },
];

const esc = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");

const logoSvg = await readFile(logoPath);
const wordmark = await sharp(logoSvg)
  .extract({ left: 100, top: 800, width: 1040, height: 230 })
  .resize({ width: 268 })
  .png()
  .toBuffer();
const wordmarkUri = `data:image/png;base64,${wordmark.toString("base64")}`;
const symbol = await sharp(logoSvg)
  .extract({ left: 185, top: 180, width: 870, height: 590 })
  .resize({ width: 104 })
  .png()
  .toBuffer();
const symbolUri = `data:image/png;base64,${symbol.toString("base64")}`;

for (const flyer of flyers) {
  const photo = await sharp(join(here, "assets", flyer.photo))
    .extract({ left: 0, top: flyer.cropTop, width: 1024, height: 635 })
    .resize(968, 600)
    .png()
    .toBuffer();
  const photoUri = `data:image/png;base64,${photo.toString("base64")}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" role="img" aria-labelledby="title desc">
  <title id="title">ADLocal: ${esc(flyer.title.join(" "))}</title>
  <desc id="desc">Flyer de campaña para ADLocal, plataforma de comercios locales.</desc>
  <defs>
    <clipPath id="photo-clip"><rect x="56" y="150" width="968" height="600" rx="28"/></clipPath>
  </defs>
  <rect width="1080" height="1350" fill="${colors.ivory}"/>
  <path d="M0 0h1080v10H0z" fill="${flyer.accent}"/>
  <image href="${symbolUri}" x="56" y="39" width="104" height="71" preserveAspectRatio="xMinYMid meet"/>
  <image href="${wordmarkUri}" x="174" y="51" width="268" height="60" preserveAspectRatio="xMinYMid meet"/>
  <text x="1024" y="88" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" letter-spacing="2.2" fill="${colors.tealDark}">TU PUENTE CON LA COMUNIDAD</text>
  <path d="M56 128h968" stroke="${colors.border}" stroke-width="2"/>

  <image href="${photoUri}" x="56" y="150" width="968" height="600" clip-path="url(#photo-clip)"/>
  <rect x="56" y="150" width="968" height="600" rx="28" fill="none" stroke="${colors.border}" stroke-width="2"/>

  <rect x="56" y="786" width="10" height="27" rx="5" fill="${flyer.accent}"/>
  <text x="85" y="809" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="2" fill="${flyer.accent}">${esc(flyer.eyebrow)}</text>

  <text x="56" y="894" font-family="Arial, Helvetica, sans-serif" font-size="69" font-weight="800" letter-spacing="-2.5" fill="${colors.ink}">${esc(flyer.title[0])}</text>
  <text x="56" y="969" font-family="Arial, Helvetica, sans-serif" font-size="69" font-weight="800" letter-spacing="-2.5" fill="${colors.ink}">${esc(flyer.title[1])}</text>

  <text x="58" y="1038" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${colors.muted}">${esc(flyer.body[0])}</text>
  <text x="58" y="1080" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${colors.muted}">${esc(flyer.body[1])}</text>

  <rect x="56" y="1137" width="510" height="83" rx="41.5" fill="${flyer.accent}"/>
  <text x="96" y="1190" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" fill="#FFFFFF">${esc(flyer.action)}</text>
  <path d="M508 1178h27m-13-13 13 13-13 13" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>

  <path d="M56 1252h968" stroke="${colors.border}" stroke-width="2"/>
  <circle cx="68" cy="1292" r="9" fill="${colors.orange}"/>
  <circle cx="95" cy="1292" r="9" fill="${colors.teal}"/>
  <text x="124" y="1301" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${colors.tealDark}">${esc(flyer.url)}</text>
  <text x="1024" y="1301" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="700" letter-spacing="1.5" fill="${colors.muted}">ADLOCAL</text>
</svg>`;

  await writeFile(join(here, `${flyer.id}.svg`), svg, "utf8");
  await sharp(Buffer.from(svg)).png().toFile(join(here, `${flyer.id}.png`));
  console.log(`Generado: ${flyer.id}.svg y ${flyer.id}.png`);
}
