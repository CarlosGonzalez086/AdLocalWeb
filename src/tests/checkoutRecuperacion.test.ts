import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import CheckoutUsuario from "../components/usuario/checkout/CheckoutUsuario";

const props = {
  checkout: null, direcciones: [], loading: false, confirmando: false,
  error: "La respuesta se perdió.", resultado: null, pendiente: true,
  clearError: () => {}, onConfirmar: async () => null, onRecuperar: async () => null,
  onActualizar: async () => null, onSubirComprobante: async () => null,
  onCerrarComprobacion: async () => {},
  subiendoComprobante: {}, erroresComprobante: {},
};

describe("Vista de recuperación del checkout (renderizado React)", () => {
  it("ofrece recuperar el pedido aun cuando el carrito ya no existe", () => {
    const html = renderToStaticMarkup(createElement(CheckoutUsuario, props));
    expect(html).toContain("Recuperar resultado del pedido");
    expect(html).toContain("/usuario/pedidos");
    expect(html).not.toContain("No hay productos para procesar");
  });
  it("impide otro clic mientras recupera el resultado", () => {
    const html = renderToStaticMarkup(createElement(CheckoutUsuario, { ...props, confirmando: true }));
    expect(html).toContain("Comprobando pedido…");
    expect(html).toMatch(/<button[^>]*disabled/);
  });
  it("muestra el error cuando el checkout no pudo cargarse", () => {
    const html = renderToStaticMarkup(createElement(CheckoutUsuario, { ...props, pendiente: false }));
    expect(html).toContain("La respuesta se perdió.");
  });
});
