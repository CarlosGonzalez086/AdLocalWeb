import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import PedidosUsuario from "../components/usuario/pedidos/PedidosUsuario";
import type { PedidoClienteDetalleDto } from "../types/pedidos";

const detalle: PedidoClienteDetalleDto = { uuid: "pedido", numeroPedido: "PED-SINTETICO", comercio: "Comercio sintético",
  total: 90, estado: 10, estadoPago: 5, metodoPago: 2, tipoEntrega: 1,
  totalProductos: 2, fechaCreacion: "2026-10-12T12:00:00Z", puedeSubirComprobante: false, productos: [],
  historial: [{ estado: 10, evento: "Reembolso", estadoPago: 5, comentario: "Motivo visible del reembolso", fecha: "2026-10-12T13:00:00Z" }],
  reembolso: { uuid: "reembolso", monto: 90, metodo: 2, referencia: "REFERENCIA-SINTETICA", motivo: "Pedido cancelado", fechaCreacion: "2026-10-12T13:00:00Z" } };
const props = { pedidos: { items: [detalle], totalItems: 1, totalPages: 1, page: 1, pageSize: 10 }, detalle,
  loading: false, loadingDetalle: false, subiendo: false, error: null, errorComprobante: null, pagina: 1, filtroPago: null,
  onPagina: () => {}, onFiltro: () => {}, onSeleccionar: async () => {}, onSubirComprobante: async () => null };
describe("Seguimiento real renderizado de pedidos reembolsados", () => {
  it("muestra referencia, motivo y distinción entre registro y recepción del dinero", () => {
    const html = renderToStaticMarkup(createElement(PedidosUsuario, props));
    expect(html).toContain("REFERENCIA-SINTETICA"); expect(html).toContain("Pedido cancelado");
    expect(html).toContain("Si no recibiste el dinero");
  });
  it("expone el motivo del historial y evita pedir otra transferencia", () => {
    const html = renderToStaticMarkup(createElement(PedidosUsuario, props));
    expect(html).toContain("Motivo visible del reembolso"); expect(html).toContain("Reembolso: Reembolsado");
    expect(html).not.toContain("Transferencia bancaria");
  });
});
