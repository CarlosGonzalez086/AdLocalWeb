import type { ApiResponse } from "../api/apiResponse";
import { httpUsuario } from "../api/httpUsuario";

export interface AgregarProductoCarritoDto {
  productoUuid: string;
  cantidad: number;
  observaciones?: string | null;
}

export interface ActualizarCantidadCarritoDto {
  detalleUuid: string;
  cantidad: number;
}

export interface CarritoDetalleDto {
  uuid: string;

  productoUuid: string;

  idComercio: number;

  comercioUuid: string;

  comercioNombre: string;

  comercioLogoUrl?: string | null;

  nombre: string;

  descripcion?: string | null;

  logoUrl?: string | null;

  cantidad: number;

  precioUnitario: number;

  subtotal: number;

  observaciones?: string | null;

  disponible: boolean;

  manejaStock: boolean;

  stock?: number | null;

  permiteDomicilio: boolean;

  permiteRecoger: boolean;
}

export interface CarritoComercioDto {
  idComercio: number;

  comercioUuid: string;

  comercio: string;

  comercioLogoUrl?: string | null;

  totalProductos: number;

  subtotal: number;

  productos: CarritoDetalleDto[];
}

export interface CarritoDto {
  uuid: string;

  subtotal: number;

  totalProductos: number;

  totalComercios: number;

  fechaCreacion: string;

  comercios: CarritoComercioDto[];
}

export interface AgregarProductoResponse {
  carritoUuid: string;

  detalleUuid: string;

  productoUuid: string;

  comercioUuid: string;

  cantidad: number;

  subtotalDetalle: number;

  subtotalCarrito: number;
}

export interface ActualizarCantidadResponse {
  detalleUuid: string;

  cantidad: number;

  precioUnitario: number;

  subtotalDetalle: number;

  subtotalCarrito: number;
}

export interface EliminarProductoResponse {
  subtotal: number;

  carritoVacio: boolean;
}

export const carritoApi = {
  obtener: () => httpUsuario.get<ApiResponse<CarritoDto | null>>("/Carrito"),

  agregar: (dto: AgregarProductoCarritoDto) =>
    httpUsuario.post<ApiResponse<AgregarProductoResponse>>(
      "/Carrito/agregar",
      dto,
    ),

  actualizarCantidad: (dto: ActualizarCantidadCarritoDto) =>
    httpUsuario.put<ApiResponse<ActualizarCantidadResponse>>(
      "/Carrito/cantidad",
      dto,
    ),

  eliminarProducto: (detalleUuid: string) =>
    httpUsuario.delete<ApiResponse<EliminarProductoResponse>>(
      `/Carrito/producto/${detalleUuid}`,
    ),

  vaciar: () => httpUsuario.delete<ApiResponse<object>>("/Carrito/vaciar"),
};
