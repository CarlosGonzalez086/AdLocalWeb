import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_DgPQ7Nl5.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_C5LvuYvp.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const title = "AdLocal | Tu Directorio de Comercios Locales";
  const description = "Descubre y apoya comercios locales, panader\xEDas, cafeter\xEDas, tiendas y servicios cerca de ti en tu comunidad con AdLocal.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BusinessWraper", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/BusinessWraper", "client:component-export": "default" })} ` })}`;
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
