import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DGJ8zzG5.mjs';
import 'piccolore';
import { A as App } from '../../chunks/App_DHjCC7Df.mjs';
import axios from 'axios';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const BACKEND_URL = "https://adlocalapi.onrender.com/api";
const BASE_URL = `${BACKEND_URL}/comercios`;
console.log("BACKEND_URL:", BACKEND_URL);
console.log("BASE_URL:", BASE_URL);

console.log("BACKEND_URL:", BACKEND_URL);
console.log("BASE_URL:", BASE_URL);
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
api.interceptors.response.use(
  (r) => r,
  (e) => {
    const message = e.response?.data?.mensaje || e.response?.data?.message || "Error en la petición";
    throw new Error(message);
  }
);
const comercioPublicApi = {
  getPopulares: () => api.get("", {
    params: { tipo: "populares" }
  }),
  getRecientes: () => api.get("", {
    params: { tipo: "recientes" }
  }),
  getCercanos: (lat, lng) => api.get("", {
    params: { tipo: "cercanos", lat, lng }
  }),
  getById: (id) => api.get(`/${id}`)
};

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const parts = slug?.split("_");
  const id = Number(parts?.[0]);
  let comercio = null;
  try {
    const response = await comercioPublicApi.getById(id);
    comercio = response.data.respuesta ?? null;
  } catch (err) {
    console.error("ERROR AL OBTENER COMERCIO:", err);
  }
  if (!comercio) {
    return Astro2.redirect("/");
  }
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/jpeg" sizes="32x32"${addAttribute(comercio.logoBase64 ?? "https://uzgnfwbztoizcctyfdiv.supabase.co/storage/v1/object/public/Imagenes/AZuAXHqalTLlz8th7NMdBA-AZuAXHqaHD92HliWBxJzdA.jpg", "href")}><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-sA+1E9IYJrySAB8GkuPxHohDpC3Lx2F0YlGOCq4SvYg=" crossorigin=""><title>${comercio.nombre}</title>${renderHead()}</head> <body> ${renderComponent($$result, "App", App, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/App", "client:component-export": "default" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ComercioDetalle", null, { "client:only": "react", "comercio": comercio, "productos": comercio.productos ?? [], "loadingProducts": false, "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/components/business/ComercioDetalle", "client:component-export": "default" })} ` })} </body></html>`;
}, "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro", void 0);

const $$file = "C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro";
const $$url = "/comercios/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
