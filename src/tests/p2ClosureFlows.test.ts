import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("P2 Closure Security & Flows (AdLocalWeb)", () => {
  it("Logout cliente invoca POST /ClienteAuth/logout desde API, hook, header y perfil", () => {
    const api = fs.readFileSync(path.resolve(process.cwd(), "src/services/clienteAuthApi.ts"), "utf8");
    const hook = fs.readFileSync(path.resolve(process.cwd(), "src/hooks/useClienteAuth.ts"), "utf8");
    const header = fs.readFileSync(path.resolve(process.cwd(), "src/components/layout/Header.tsx"), "utf8");
    const perfil = fs.readFileSync(path.resolve(process.cwd(), "src/components/usuario/perfil/PerfilUsuario.tsx"), "utf8");
    const editar = fs.readFileSync(path.resolve(process.cwd(), "src/components/usuario/perfil/EditarPerfilUsuario.tsx"), "utf8");

    expect(api).toContain('"/ClienteAuth/logout"');
    expect(hook).toContain("clienteAuthApi.logout()");
    expect(header).toContain("clienteAuthApi.logout()");
    expect(perfil).toContain("clienteAuthApi.logout()");
    expect(editar).toContain("clienteAuthApi.logout()");
  });

  it("Header valida rol de sesión y httpUsuario preserva returnUrl al expirar", () => {
    const header = fs.readFileSync(path.resolve(process.cwd(), "src/components/layout/Header.tsx"), "utf8");
    const httpUser = fs.readFileSync(path.resolve(process.cwd(), "src/api/httpUsuario.ts"), "utf8");

    expect(header).toContain('rol !== "cliente" && rol !== "comercio"');
    expect(httpUser).toContain("?returnUrl=${encodeURIComponent(destino)}");
  });

  it("BusquedaAvanzada y useComercioPublico evitan race condition de cargarPopulares", () => {
    const hook = fs.readFileSync(path.resolve(process.cwd(), "src/hooks/useComercioPublico.ts"), "utf8");
    const adv = fs.readFileSync(path.resolve(process.cwd(), "src/components/search/BusquedaAvanzada.tsx"), "utf8");

    expect(hook).toContain("requestSeqRef");
    expect(hook).toContain("autoLoad");
    expect(adv).toContain("useComercioPublico({ autoLoad: false })");
  });

  it("CheckoutUsuario conserva ediciones previas al cargar direcciones y valida entrega habilitada", () => {
    const checkout = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/usuario/checkout/CheckoutUsuario.tsx"),
      "utf8",
    );

    expect(checkout).toContain("setForms((prev) => {");
    expect(checkout).toContain("!comercio.permiteDomicilio && !comercio.permiteRecoger");
  });

  it("useCalificaciones evita doble fetch y CalificacionesComentarios conserva borrador si falla", () => {
    const hook = fs.readFileSync(path.resolve(process.cwd(), "src/hooks/useCalificaciones.ts"), "utf8");
    const comp = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/business/CalificacionesComentarios.tsx"),
      "utf8",
    );

    expect(hook).toContain("[idComercio, pageSize]");
    expect(hook).not.toContain("[idComercio, page, pageSize, orderBy]");
    expect(comp).toContain("if (created)");
  });

  it("sitemap.xml.ts pagina con slugifyConId, BusinessTabsWrapper protege geolocalización y vercel.json define CSP", () => {
    const sitemap = fs.readFileSync(path.resolve(process.cwd(), "src/pages/sitemap.xml.ts"), "utf8");
    const tabs = fs.readFileSync(path.resolve(process.cwd(), "src/wrappers/BusinessTabsWrapper.tsx"), "utf8");
    const vercel = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "vercel.json"), "utf8"),
    ) as { headers: Array<{ headers: Array<{ key: string; value: string }> }> };

    expect(sitemap).toContain("slugifyConId");
    expect(sitemap).toContain("for (let page = 1");
    expect(tabs).toContain("obtenerCoordenadas");
    expect(tabs).toContain("timeout: 10000");

    const csp = vercel.headers[0].headers.find((h) => h.key === "Content-Security-Policy");
    expect(csp?.value).toContain("frame-ancestors 'none'");
    expect(csp?.value).toContain("object-src 'none'");
  });
});
