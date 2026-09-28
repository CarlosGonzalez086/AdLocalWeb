import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DgPQ7Nl5.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C5LvuYvp.mjs';
export { renderers } from '../renderers.mjs';

const $$Comercios = createComponent(($$result, $$props, $$slots) => {
  const title = "Comercios Locales | AdLocal";
  const description = "Explora todos los comercios afiliados a AdLocal en tu municipio y comunidad.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BusinessWraper", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/BusinessWraper", "client:component-export": "default" })} ` })}`;
}, "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios.astro", void 0);

const $$file = "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios.astro";
const $$url = "/comercios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Comercios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
