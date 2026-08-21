import type { ApiResponse } from "../api/apiResponse";
import { httpUsuario } from "../api/httpUsuario";

export interface DireccionUsuarioDtoCreate {
  alias: string;

  calle: string;

  numeroExterior: string;

  numeroInterior?: string | null;

  colonia: string;

  codigoPostal: string;

  idEstado: number;

  idMunicipio: number;

  latitud?: number | null;

  longitud?: number | null;

  referencias?: string | null;

  telefono?: string | null;

  esPredeterminada: boolean;
}


export interface DireccionUsuarioDto {
  uuid: string;

  alias: string;

  calle: string;

  numeroExterior: string;

  numeroInterior?: string | null;

  colonia: string;

  codigoPostal: string;

  idEstado: number;

  estado: string;

  idMunicipio: number;

  municipio: string;

  latitud?: number | null;

  longitud?: number | null;

  referencias?: string | null;

  telefono?: string | null;

  esPredeterminada: boolean;

  activo: boolean;

  fechaCreacion: string;

  fechaActualizacion?: string | null;
}

export const direccionesUsuarioApi = {
  obtenerTodas: () =>
    httpUsuario.get<ApiResponse<DireccionUsuarioDto[]>>("/DireccionesUsuario"),

  obtenerPorUuid: (uuid: string) =>
    httpUsuario.get<ApiResponse<DireccionUsuarioDto>>(
      `/DireccionesUsuario/${uuid}`,
    ),

  crear: (dto: DireccionUsuarioDtoCreate) =>
    httpUsuario.post<ApiResponse<DireccionUsuarioDto>>(
      "/DireccionesUsuario",
      dto,
    ),

  actualizar: (uuid: string, dto: DireccionUsuarioDtoCreate) =>
    httpUsuario.put<ApiResponse<boolean>>(`/DireccionesUsuario/${uuid}`, dto),

  eliminar: (uuid: string) =>
    httpUsuario.delete<ApiResponse<boolean>>(`/DireccionesUsuario/${uuid}`),

  establecerPredeterminada: (uuid: string) =>
    httpUsuario.put<ApiResponse<boolean>>(
      `/DireccionesUsuario/${uuid}/predeterminada`,
    ),
};
