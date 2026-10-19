import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { getMunicipioActual, comercioPublicApi } from "../services/comercioPublicApi";

describe("Fase 2 Architecture & SSR Hardening", () => {
  const originalWindow = globalThis.window;
  const originalLocalStorage = globalThis.localStorage;

  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.localStorage = originalLocalStorage;
  });

  it("getMunicipioActual() returns null safely in SSR when window/localStorage are undefined", () => {
    // @ts-expect-error simulating SSR
    delete (globalThis as Record<string, unknown>).window;
    // @ts-expect-error simulating SSR
    delete (globalThis as Record<string, unknown>).localStorage;

    expect(getMunicipioActual()).toBeNull();
  });

  it("getMunicipioActual() returns parsed municipality when running in browser with localStorage", () => {
    let store: Record<string, string> = {
      municipioActual: JSON.stringify({ municipio: "San Cristóbal de las Casas" }),
    };

    const mockStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, val: string) => {
        store[key] = val;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    (globalThis as Record<string, unknown>).window = {};
    (globalThis as Record<string, unknown>).localStorage = mockStorage;

    expect(getMunicipioActual()).toBe("San Cristóbal de las Casas");
  });

  it("getMunicipioActual() handles malformed JSON in localStorage gracefully without throwing", () => {
    let store: Record<string, string> = {
      municipioActual: "{bad-json",
    };

    const mockStorage = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, val: string) => {
        store[key] = val;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    (globalThis as Record<string, unknown>).window = {};
    (globalThis as Record<string, unknown>).localStorage = mockStorage;

    expect(getMunicipioActual()).toBeNull();
  });

  it("comercioPublicApi exports getById, getDestacados, and getByFiltros functions", () => {
    expect(typeof comercioPublicApi.getById).toBe("function");
    expect(typeof comercioPublicApi.getDestacados).toBe("function");
    expect(typeof comercioPublicApi.getByFiltros).toBe("function");
  });
});
