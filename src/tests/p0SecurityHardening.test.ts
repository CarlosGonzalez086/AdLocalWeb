import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("P0 Security Hardening (AdLocalWeb)", () => {
  it("[slug].astro escapa caracteres HTML peligrosos en JSON-LD", () => {
    const slugFile = path.resolve(
      process.cwd(),
      "src/pages/comercios/[slug].astro",
    );
    const content = fs.readFileSync(slugFile, "utf8");
    expect(content).toContain('.replace(/</g, "\\\\u003c")');
    expect(content).not.toContain("set:html={JSON.stringify(jsonLd)}");
  });

  it("sw.js excluye peticiones cross-origin y rutas autenticadas /usuario/", () => {
    const swFile = path.resolve(process.cwd(), "public/sw.js");
    const content = fs.readFileSync(swFile, "utf8");
    expect(content).toContain("url.origin !== self.location.origin");
    expect(content).toContain("url.pathname.startsWith('/usuario/')");
    expect(content).not.toContain("'adlocal-pwa-v2'");
  });

  it("NotificacionesMenu valida destino seguro antes de redirigir", () => {
    const notifFile = path.resolve(
      process.cwd(),
      "src/components/usuario/notificaciones/NotificacionesMenu.tsx",
    );
    const content = fs.readFileSync(notifFile, "utf8");
    expect(content).toContain("obtenerDestinoSeguro");
    expect(content).toContain('!limpia.startsWith("//")');
  });

  it("calificacionesApi.crear utiliza cliente autenticado httpUsuario", () => {
    const califApi = path.resolve(
      process.cwd(),
      "src/services/calificaciones.Api.ts",
    );
    const content = fs.readFileSync(califApi, "utf8");
    expect(content).toContain("httpUsuario.post");
  });
});
