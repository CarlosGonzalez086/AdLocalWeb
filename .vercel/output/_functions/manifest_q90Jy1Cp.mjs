import 'piccolore';
import { n as decodeKey } from './chunks/astro/server_DGJ8zzG5.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BHZ3_fYv.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/USER/source/repos/AdLocalWeb/","cacheDir":"file:///C:/Users/USER/source/repos/AdLocalWeb/node_modules/.astro/","outDir":"file:///C:/Users/USER/source/repos/AdLocalWeb/dist/","srcDir":"file:///C:/Users/USER/source/repos/AdLocalWeb/src/","publicDir":"file:///C:/Users/USER/source/repos/AdLocalWeb/public/","buildClientDir":"file:///C:/Users/USER/source/repos/AdLocalWeb/dist/client/","buildServerDir":"file:///C:/Users/USER/source/repos/AdLocalWeb/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/BusinessTabs.DVyEPB8f.css"},{"type":"external","src":"/_astro/MapaComercio.CIGW-MKW.css"},{"type":"external","src":"/_astro/index.BlXzMdJO.css"}],"routeData":{"route":"/comercios/[slug]","isIndex":false,"type":"page","pattern":"^\\/comercios\\/([^/]+?)\\/?$","segments":[[{"content":"comercios","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/comercios/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.B5t0DL1j.css"},{"type":"external","src":"/_astro/BusinessTabs.DVyEPB8f.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/USER/source/repos/AdLocalWeb/src/pages/comercios/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Users/USER/source/repos/AdLocalWeb/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/comercios/[slug]@_@astro":"pages/comercios/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_q90Jy1Cp.mjs","C:/Users/USER/source/repos/AdLocalWeb/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_M_NcBGVT.mjs","@astrojs/react/client.js":"_astro/client.52Vj9PDQ.js","C:/Users/USER/source/repos/AdLocalWeb/src/components/business/MapaComercio.client.tsx":"_astro/MapaComercio.client.DnyeV1Zx.js","C:/Users/USER/source/repos/AdLocalWeb/src/wrappers/ComercioWraper":"_astro/ComercioWraper.Dj3XhMc5.js","C:/Users/USER/source/repos/AdLocalWeb/src/components/business/BusinessTabs":"_astro/BusinessTabs.BI6g8lQE.js","C:/Users/USER/source/repos/AdLocalWeb/src/components/App.tsx":"_astro/App.DAhDg4uD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.B5t0DL1j.css","/favicon.svg","/_astro/ajax-loader.BcnMEykj.gif","/_astro/App.B5FOa9ja.js","/_astro/App.DAhDg4uD.js","/_astro/BusinessTabs.BI6g8lQE.js","/_astro/BusinessTabs.DVyEPB8f.css","/_astro/Button.DES8R9lc.js","/_astro/client.52Vj9PDQ.js","/_astro/ComercioWraper.Dj3XhMc5.js","/_astro/generals.BH77-Xgt.js","/_astro/index.BlXzMdJO.css","/_astro/index.CaMD0FYj.js","/_astro/index.DQxNrm3y.js","/_astro/MapaComercio.CIGW-MKW.css","/_astro/MapaComercio.client.DnyeV1Zx.js","/_astro/slick.BlzDm7g2.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"fdxdL4qV+cyKFiv1wKksrE7m9odka2F1qNLihgqUKuk="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
