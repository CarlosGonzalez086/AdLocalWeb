import type { APIRoute } from "astro";
import { comercioPublicApi } from "../services/comercioPublicApi";
import { slugifyConId } from "../utils/generals";

export const prerender = false;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site, url }) => {
  const origin = site ? site.toString().replace(/\/$/, "") : url.origin;

  const staticPaths = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/comercios", changefreq: "daily", priority: "0.9" },
    { path: "/comercios/busqueda-avanzada", changefreq: "weekly", priority: "0.8" },
    { path: "/terminos", changefreq: "monthly", priority: "0.3" },
    { path: "/privacidad", changefreq: "monthly", priority: "0.3" },
  ];

  const dynamicEntries: Array<{ path: string; lastmod?: string }> = [];
  const PAGE_SIZE = 50;
  const MAX_PAGES = 20;
  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const resp = await comercioPublicApi.getDestacados(page, PAGE_SIZE);
      const items = resp?.data?.respuesta?.items ?? [];
      for (const comercio of items) {
        const slug = slugifyConId(comercio.id, comercio.nombre || "comercio");
        const lastmod = comercio.fechaCreacion
          ? comercio.fechaCreacion.split("T")[0]
          : undefined;
        dynamicEntries.push({
          path: `/comercios/${slug}`,
          lastmod,
        });
      }
      if (items.length < PAGE_SIZE) {
        break;
      }
    }
  } catch {
    // Degradar con las rutas ya recopiladas si el API falla
  }

  const urlsXml = [
    ...staticPaths.map(
      (item) => `  <url>
    <loc>${escapeXml(`${origin}${item.path}`)}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
    ),
    ...dynamicEntries.map(
      (item) => `  <url>
    <loc>${escapeXml(`${origin}${item.path}`)}</loc>${
        item.lastmod ? `\n    <lastmod>${escapeXml(item.lastmod)}</lastmod>` : ""
      }
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
    ),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
