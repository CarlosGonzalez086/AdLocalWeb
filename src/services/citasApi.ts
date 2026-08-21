import type { ApiResponse } from "../api/apiResponse";
import { httpUsuario } from "../api/httpUsuario";

export interface CitaDto {
  uuid: string;
  comercio: string;
  servicio: string;
  cliente: string;
  nombrePersona: string;
  telefonoCliente?: string;
  notasCliente?: string;
  nombreAtiende?: string;
  fechaInicio: string;
  fechaFin: string;
  estado: number;
}

export const citasApi = {
  disponibilidad: (productoUuid: string, fecha: string) =>
    httpUsuario.get<ApiResponse<string[]>>(
      `Citas/disponibilidad/${productoUuid}`,
      { params: { fecha } },
    ),
  crear: (data: {
    productoUuid: string;
    fechaInicio: string;
    nombrePersona: string;
    notas?: string;
  }) => httpUsuario.post<ApiResponse<CitaDto>>("Citas", data),
  mias: () => httpUsuario.get<ApiResponse<CitaDto[]>>("Citas/mias"),
};
