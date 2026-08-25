export const MetodoPagoPedido = {
  Efectivo: 1,
  Transferencia: 2,
} as const;

export type MetodoPagoPedido =
  (typeof MetodoPagoPedido)[keyof typeof MetodoPagoPedido];

export const TipoEntregaPedido = {
  Recoger: 1,
  Domicilio: 2,
} as const;

export type TipoEntregaPedido =
  (typeof TipoEntregaPedido)[keyof typeof TipoEntregaPedido];

export const EstadoPedido = {
  PendienteAprobacion: 1,
  Aprobado: 2,
  Rechazado: 3,
  Preparando: 4,
  ListoParaRecoger: 5,
  ListoParaEnviar: 6,
  Enviado: 7,
  Entregado: 8,
  Completado: 9,
  Cancelado: 10,
} as const;

export type EstadoPedido = (typeof EstadoPedido)[keyof typeof EstadoPedido];

export const EstadoPagoPedido = {
  Pendiente: 1,
  PendienteComprobante: 1,
  PendienteVerificacion: 2,
  Pagado: 3,
  Rechazado: 4,
  Reembolsado: 5,
} as const;

export type EstadoPagoPedido =
  (typeof EstadoPagoPedido)[keyof typeof EstadoPagoPedido];

/* ==========================================
   CHECKOUT
========================================== */

export interface CheckoutProductoDto {
  productoUuid: string;

  nombre: string;

  logoUrl?: string | null;

  cantidad: number;

  precioUnitario: number;

  subtotal: number;
  permiteDomicilio: boolean;

  permiteRecoger: boolean;
}

export interface CuentaTransferenciaCheckoutDto {
  banco: string;

  beneficiario: string;

  numeroCuenta?: string | null;

  clabe?: string | null;

  numeroTarjeta?: string | null;
}

export interface CheckoutComercioResponseDto {
  comercioUuid: string;

  comercio: string;

  logoUrl?: string | null;

  subtotal: number;
  costoEnvio: number;
  totalDomicilio: number;
  compraMinimaEnvioGratis?: number | null;

  aceptaEfectivo: boolean;

  aceptaTransferencia: boolean;

  permiteDomicilio: boolean;

  permiteRecoger: boolean;

  instruccionesTransferencia?: string | null;

  cuentaTransferencia?: CuentaTransferenciaCheckoutDto | null;

  productos: CheckoutProductoDto[];
}

export interface CheckoutResponseDto {
  totalGeneral: number;

  comercios: CheckoutComercioResponseDto[];
}

/* ==========================================
   CONFIRMACIÓN
========================================== */

export interface CheckoutComercioConfirmacionDto {
  comercioUuid: string;

  tipoEntrega: TipoEntregaPedido;

  metodoPago: MetodoPagoPedido;

  direccionUuid?: string | null;

  observaciones?: string | null;
}

export interface ConfirmarCheckoutDto {
  comercios: CheckoutComercioConfirmacionDto[];
}

/* ==========================================
   RESPUESTA DE CONFIRMACIÓN
========================================== */

export interface PedidoCheckoutResponseDto {
  uuid: string;

  numeroPedido: string;

  comercioUuid: string;

  comercio: string;

  total: number;

  estado: EstadoPedido;

  estadoPago: EstadoPagoPedido;

  metodoPago: MetodoPagoPedido;

  tipoEntrega: TipoEntregaPedido;

  requiereComprobante: boolean;
}

export interface ComprobanteTransferenciaResponseDto {
  pedidoUuid: string;

  comprobanteUuid: string;

  estadoPago: EstadoPagoPedido;

  fechaCarga: string;
}

export interface SubirComprobanteTransferenciaDto {
  archivoBase64: string;
  nombreArchivo: string;
}

export interface ConfirmarCheckoutResponseDto {
  totalPedidos: number;

  totalGeneral: number;

  pedidos: PedidoCheckoutResponseDto[];
}

/* ==========================================
   ESTADO DEL FORMULARIO FRONT
========================================== */

export interface CheckoutComercioForm {
  comercioUuid: string;

  tipoEntrega: TipoEntregaPedido;

  metodoPago: MetodoPagoPedido;

  direccionUuid: string | null;

  observaciones: string;
}
