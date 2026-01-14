import { e as createComponent, f as createAstro, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DGJ8zzG5.mjs';
import 'piccolore';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const id = Number(slug?.split("_")[0]);
  if (isNaN(id)) {
    return Astro2.redirect("/");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Comercio</title><link rel="icon" type="image/jpeg" sizes="32x32" href="https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg"><link rel="stylesheet" href="/styles/global.css"><link rel="stylesheet" href="/styles/leaflet.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">${renderHead()}</head> <body> <!-- Componente React cargado solo en cliente --> ${renderComponent($$result, "ComercioWraper", null, { "id": id, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/ComercioWraper", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro", void 0);

const $$file = "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro";
const $$url = "/comercios/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
