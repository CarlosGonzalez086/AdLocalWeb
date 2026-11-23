import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("P1 Operational Flows (AdLocalWeb)", () => {
  it("HomeHero enlaza chips de categorías con ?q= y BusquedaAvanzada lee ?q=", () => {
    const hero = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/business/HomeHero.tsx"),
      "utf8",
    );
    const adv = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/search/BusquedaAvanzada.tsx"),
      "utf8",
    );
    expect(hero).toContain("/comercios/busqueda-avanzada?q=");
    expect(adv).toContain('new URLSearchParams(window.location.search).get("q")');
    expect(adv).toContain("cargarPorFiltros");
  });

  it("ClienteLoginWrapper configura timer y valida ?returnUrl= relativo seguro", () => {
    const wrapper = fs.readFileSync(
      path.resolve(
        process.cwd(),
        "src/wrappers/usuario/ClienteLoginWrapper.tsx",
      ),
      "utf8",
    );
    expect(wrapper).toContain("timer:");
    expect(wrapper).toContain('params.get("returnUrl")');
    expect(wrapper).toContain('!rawReturnUrl.startsWith("//")');
  });

  it("Comercio.tsx espera la renovación asíncrona de sesión antes de redirigir", () => {
    const comercio = fs.readFileSync(
      path.resolve(process.cwd(), "src/components/business/Comercio.tsx"),
      "utf8",
    );
    expect(comercio).toContain("obtenerSesionValidaOActualizar");
    expect(comercio).toContain("await validarSesion()");
  });
});
