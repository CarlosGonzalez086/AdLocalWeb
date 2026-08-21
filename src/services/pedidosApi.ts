import type { ApiResponse } from "../api/apiResponse";
import { httpUsuario } from "../api/httpUsuario";
import type {
  ComprobanteTransferenciaResponseDto,
  EstadoPagoPedido,
  SubirComprobanteTransferenciaDto,
} from "../types/checkout";
import type {
  PagedResponse,
  PedidoClienteDetalleDto,
  PedidoClienteListadoDto,
} from "../types/pedidos";

export const pedidosApi = {
  obtenerTodos: (
    page = 1,
    pageSize = 10,
    estadoPago?: EstadoPagoPedido | null,
  ) =>
    httpUsuario.get<ApiResponse<PagedResponse<PedidoClienteListadoDto>>>(
      "/Pedidos",
      {
        params: {
          page,
          pageSize,
          ...(estadoPago ? { estadoPago } : {}),
        },
      },
    ),

  obtenerDetalle: (pedidoUuid: string) =>
    httpUsuario.get<ApiResponse<PedidoClienteDetalleDto>>(
      `/Pedidos/${pedidoUuid}`,
    ),

  subirComprobante: async (pedidoUuid: string, archivo: File) => {
    const archivoBase64 = await new Promise<string>((resolve, reject) => {
      const lector = new FileReader();
      lector.onload = () => typeof lector.result === "string"
        ? resolve(lector.result)
        : reject(new Error("No fue posible leer el comprobante."));
      lector.onerror = () => reject(new Error("No fue posible leer el comprobante."));
      lector.readAsDataURL(archivo);
    });

    const comprobante: SubirComprobanteTransferenciaDto = {
      archivoBase64,
      nombreArchivo: archivo.name,
    };

    return httpUsuario.post<ApiResponse<ComprobanteTransferenciaResponseDto>>(
      `/Pedidos/${pedidoUuid}/comprobante-transferencia`,
      comprobante,
    );
  },
};
