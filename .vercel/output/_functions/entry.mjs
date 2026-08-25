import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_wk01IRmZ.mjs';
import { manifest } from './manifest_EhDcR6G0.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/comercios/busqueda-avanzada.astro.mjs');
const _page2 = () => import('./pages/comercios/_slug_.astro.mjs');
const _page3 = () => import('./pages/comercios.astro.mjs');
const _page4 = () => import('./pages/usuario/carrito.astro.mjs');
const _page5 = () => import('./pages/usuario/checkout.astro.mjs');
const _page6 = () => import('./pages/usuario/citas.astro.mjs');
const _page7 = () => import('./pages/usuario/crear-cuenta.astro.mjs');
const _page8 = () => import('./pages/usuario/direcciones.astro.mjs');
const _page9 = () => import('./pages/usuario/login.astro.mjs');
const _page10 = () => import('./pages/usuario/pedidos.astro.mjs');
const _page11 = () => import('./pages/usuario/perfil/editar.astro.mjs');
const _page12 = () => import('./pages/usuario/perfil.astro.mjs');
const _page13 = () => import('./pages/usuario/recuperar-contrasena.astro.mjs');
const _page14 = () => import('./pages/usuario/restablecer-contrasena.astro.mjs');
const _page15 = () => import('./pages/usuario/verificar-codigo.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/comercios/busqueda-avanzada.astro", _page1],
    ["src/pages/comercios/[slug].astro", _page2],
    ["src/pages/comercios.astro", _page3],
    ["src/pages/usuario/carrito.astro", _page4],
    ["src/pages/usuario/checkout.astro", _page5],
    ["src/pages/usuario/citas.astro", _page6],
    ["src/pages/usuario/crear-cuenta.astro", _page7],
    ["src/pages/usuario/direcciones.astro", _page8],
    ["src/pages/usuario/login.astro", _page9],
    ["src/pages/usuario/pedidos.astro", _page10],
    ["src/pages/usuario/perfil/editar.astro", _page11],
    ["src/pages/usuario/perfil.astro", _page12],
    ["src/pages/usuario/recuperar-contrasena.astro", _page13],
    ["src/pages/usuario/restablecer-contrasena.astro", _page14],
    ["src/pages/usuario/verificar-codigo.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c7438bb3-692e-48aa-9f97-800167ddee43",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
