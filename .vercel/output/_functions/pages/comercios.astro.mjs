import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_09C4vKdF.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CmYpdFxP.mjs';
import { B as BusinessWraper } from '../chunks/BusinessWraper_DsYutCjD.mjs';
import { G as comercioPublicApi } from '../chunks/generals_BNjAEWtJ.mjs';
export { renderers } from '../renderers.mjs';

const $$Comercios = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Comercios Locales | AdLocal";
  const description = "Explora todos los comercios afiliados a AdLocal en tu municipio y comunidad.";
  let initialComercios = [];
  try {
    const resp = await comercioPublicApi.getDestacados(1, 8);
    if (resp?.data?.respuesta?.items) {
      initialComercios = resp.data.respuesta.items;
    }
  } catch {
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "BusinessWraper", BusinessWraper, { "initialComercios": initialComercios, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/BusinessWraper", "client:component-export": "default" })} ${initialComercios.length > 0 && renderTemplate`${maybeRenderHead()}<noscript> <div style="padding: 1.5rem; max-width: 900px; margin: 0 auto; font-family: sans-serif;"> <h2>Comercios Locales</h2> <ul> ${initialComercios.map((c) => renderTemplate`<li> <a${addAttribute(`/comercios/${c.id}_${c.nombre.replace(/\s+/g, "_")}`, "href")}> <strong>${c.nombre}</strong> </a> ${c.descripcion && renderTemplate`<div>${c.descripcion}</div>`} ${c.municipioNombre && renderTemplate`<div>${c.municipioNombre}, ${c.estadoNombre}</div>`} </li>`)} </ul> </div> </noscript>`}` })}`;
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
