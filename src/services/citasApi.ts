import type { ApiResponse } from "../api/apiResponse";
import { httpUsuario } from "../api/httpUsuario";
import { httpUsuarioPublico } from "../api/httpUsuarioPublico";

export interface CitaDto {
  productoUuid: string;
  version: number;
  zonaHoraria: string;
  puedeGestionarCliente: boolean;
  motivoCancelacion?: string;
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

export interface CrearCitaDto {
  idempotencyKey: string;
  productoUuid: string;
  fechaInicio: string;
  zonaHoraria: string;
  nombrePersona: string;
  notas?: string;
}

export const citasApi = {
  disponibilidad: (productoUuid: string, fecha: string, citaUuid?: string) =>
    (citaUuid ? httpUsuario : httpUsuarioPublico).get<ApiResponse<string[]>>(
      `Citas/disponibilidad/${productoUuid}`,
      { params: { fecha, ...(citaUuid ? { citaUuid } : {}) } },
    ),
  crear: (data: CrearCitaDto) =>
    httpUsuario.post<ApiResponse<CitaDto>>("Citas", data),
  cancelar: (uuid: string, versionCita: number, motivo: string) =>
    httpUsuario.put<ApiResponse<CitaDto>>(`Citas/${uuid}/cancelar`, {
      versionCita,
      motivo,
    }),
  reprogramar: (
    uuid: string,
    versionCita: number,
    fechaInicio: string,
    zonaHoraria: string,
  ) =>
    httpUsuario.put<ApiResponse<CitaDto>>(`Citas/${uuid}/reprogramar`, {
      versionCita,
      fechaInicio,
      zonaHoraria,
    }),
  mias: () => httpUsuario.get<ApiResponse<CitaDto[]>>("Citas/mias"),
};
