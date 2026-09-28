import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DgPQ7Nl5.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_C5LvuYvp.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const parts = slug?.split("_");
  const id = Number(slug?.split("_")[0]);
  const nombre = parts?.slice(1).join("_").replace(/_/g, " ");
  if (isNaN(id)) return Astro2.redirect("/");
  const title = `${nombre || "Comercio"} | AdLocal`;
  const description = `Consulta cat\xE1logo, informaci\xF3n, ubicaci\xF3n y contacto de ${nombre || "comercio local"} en AdLocal.`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ComercioWraper", null, { "id": id, "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/ComercioWraper", "client:component-export": "default" })} ` })}`;
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
