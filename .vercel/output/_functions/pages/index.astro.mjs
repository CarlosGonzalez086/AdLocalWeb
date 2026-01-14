import { e as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_DGJ8zzG5.mjs';
import 'piccolore';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><title>AdLocal | Comercios</title><link rel="icon" type="image/jpeg" sizes="32x32" href="https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg"><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">${renderHead()}</head> <body> <!-- El componente real solo en cliente --> ${renderComponent($$result, "BusinessWraper", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/BusinessWraper", "client:component-export": "default" })} </body></html>`;
}, "C:/Users/USER/source/repos/AdLocalWeb/src/pages/index.astro", void 0);

const $$file = "C:/Users/USER/source/repos/AdLocalWeb/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
