import { e as createComponent, r as renderTemplate, k as renderComponent, l as renderHead } from '../chunks/astro/server_B9tQKVLy.mjs';
import 'piccolore';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Comercios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>AdLocal | Comercios</title><link rel="icon" type="image/jpeg" sizes="32x32" href="https://pub-d5a2e881682f4782a4be2517d547d3c7.r2.dev/logo-comercio-imagen/WhatsApp%20Image%202025-12-23%20at%2021.19.26%20(1).jpeg"><link rel="stylesheet" href="../../styles/App.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">', '</head> <body> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"><\/script> ', " </body></html>"])), renderHead(), renderComponent($$result, "BusinessWraper", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/BusinessWraper", "client:component-export": "default" }));
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
