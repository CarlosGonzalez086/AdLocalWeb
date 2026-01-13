import { e as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_DGJ8zzG5.mjs';
import 'piccolore';
import { A as App } from '../chunks/App_rwJr5YN-.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/jpeg" sizes="32x32" href="https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg"><title>AdLocal</title>${renderHead()}</head> <body> ${renderComponent($$result, "App", App, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/App.tsx", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BusinessTabs", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/business/BusinessTabs", "client:component-export": "default" })} ` })} </body></html>`;
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
