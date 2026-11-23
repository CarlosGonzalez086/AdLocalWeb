import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { decodeJwtPayload } from "../utils/jwt";
import { decodeJwt } from "../components/layout/headerTypes";

describe("P2 SEO, Security Headers & Cleanup (AdLocalWeb)", () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    if (typeof globalThis.window === "undefined") {
      (globalThis as Record<string, unknown>).window = {
        atob: (b64: string) => Buffer.from(b64, "base64").toString("binary"),
      };
    }
  });

  afterEach(() => {
    globalThis.window = originalWindow;
  });

  it("decodeJwtPayload decodifica tokens válidos y rechaza tokens malformados", () => {
    const payload = Buffer.from(
      JSON.stringify({ id: "42", nombre: "Sofía", rol: "Cliente", exp: 1999999999 }),
      "utf8",
    )
      .toString("base64url");
    const token = `eyJhbGciOiJIUzI1NiJ9.${payload}.sig`;

    const parsed = decodeJwtPayload<{ id: string; nombre: string }>(token);
    expect(parsed?.id).toBe("42");
    expect(parsed?.nombre).toBe("Sofía");
    expect(decodeJwt(token)?.nombre).toBe("Sofía");
    expect(decodeJwtPayload("invalido")).toBeNull();
  });

  it("tokenManager, usuarioSesion y headerTypes reutilizan utils/jwt sin duplicar TextDecoder", () => {
    for (const relPath of [
      "src/utils/tokenManager.ts",
      "src/utils/usuarioSesion.ts",
      "src/components/layout/headerTypes.ts",
    ]) {
      const content = fs.readFileSync(path.resolve(process.cwd(), relPath), "utf8");
      expect(content).not.toContain("new TextDecoder()");
      expect(content).toContain("decodeJwtPayload");
    }
  });

  it("Layout.astro y [slug].astro limpian canonical, evitan data: en og:image y retornan 404 si no existe", () => {
    const layout = fs.readFileSync(
      path.resolve(process.cwd(), "src/layouts/Layout.astro"),
      "utf8",
    );
    const slug = fs.readFileSync(
      path.resolve(process.cwd(), "src/pages/comercios/[slug].astro"),
      "utf8",
    );
    const config = fs.readFileSync(
      path.resolve(process.cwd(), "astro.config.mjs"),
      "utf8",
    );

    expect(config).toContain('site: "https://adlocal.store"');
    expect(layout).toContain("new URL(Astro.url.pathname, Astro.url.origin)");
    expect(layout).toContain('!ogImage.startsWith("data:")');
    expect(slug).toContain("Astro.response.status = 404");
    expect(slug).toContain('!comercioData.logoBase64.startsWith("data:")');
  });

  it("ComercioDetalle descarta coordenadas (0, 0) y BusinessTabsWrapper inicializa hasMore por PAGE_SIZE", () => {
    const detalle = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/business/ComercioDetalle.tsx"),
      "utf8",
    );
    const tabs = fs.readFileSync(
      path.resolve(process.cwd(), "src/wrappers/BusinessTabsWrapper.tsx"),
      "utf8",
    );

    expect(detalle).toContain("(latitude !== 0 || longitude !== 0)");
    expect(tabs).toContain("initialComercios.length >= PAGE_SIZE");
  });

  it("Existen robots.txt, 404.astro, terminos.astro, privacidad.astro, sitemap.xml.ts y vercel.json con headers", () => {
    const robots = fs.readFileSync(path.resolve(process.cwd(), "public/robots.txt"), "utf8");
    const vercel = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "vercel.json"), "utf8"),
    ) as { headers: Array<{ headers: Array<{ key: string }> }> };

    expect(robots).toContain("Disallow: /usuario/");
    expect(robots).toContain("Sitemap: https://adlocal.store/sitemap.xml");
    expect(fs.existsSync(path.resolve(process.cwd(), "src/pages/404.astro"))).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), "src/pages/terminos.astro"))).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), "src/pages/privacidad.astro"))).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), "src/pages/sitemap.xml.ts"))).toBe(true);

    const headerKeys = vercel.headers[0].headers.map((h) => h.key);
    expect(headerKeys).toContain("X-Content-Type-Options");
    expect(headerKeys).toContain("X-Frame-Options");
    expect(headerKeys).toContain("Strict-Transport-Security");
  });
});
