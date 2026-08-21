import type {
  EstadoPagoPedido,
  EstadoPedido,
  MetodoPagoPedido,
  TipoEntregaPedido,
} from "./checkout";

export interface PagedResponse<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

export interface PedidoClienteListadoDto {
  uuid: string;
  numeroPedido: string;
  comercio: string;
  comercioLogoUrl?: string | null;
  total: number;
  estado: EstadoPedido;
  estadoPago: EstadoPagoPedido;
  metodoPago: MetodoPagoPedido;
  tipoEntrega: TipoEntregaPedido;
  totalProductos: number;
  fechaCreacion: string;
  fechaComprobantePago?: string | null;
  puedeSubirComprobante: boolean;
}

export interface PedidoClienteProductoDto {
  uuid: string;
  productoUuid: string;
  nombre: string;
  logoUrl?: string | null;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  observaciones?: string | null;
}

export interface PedidoClienteHistorialDto {
  estado: EstadoPedido;
  comentario?: string | null;
  fecha: string;
}

export interface PedidoClienteDetalleDto extends PedidoClienteListadoDto {
  observacionesCliente?: string | null;
  direccion?: string | null;
  telefonoEntrega?: string | null;
  banco?: string | null;
  beneficiario?: string | null;
  numeroCuenta?: string | null;
  clabe?: string | null;
  numeroTarjeta?: string | null;
  instruccionesTransferencia?: string | null;
  productos: PedidoClienteProductoDto[];
  historial: PedidoClienteHistorialDto[];
}
