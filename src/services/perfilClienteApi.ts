import type { ApiResponse } from "../api/apiResponse";
import { httpUsuario } from "../api/httpUsuario";

export interface PerfilClienteDto {
  nombre: string;
  email: string;
  telefono?: string | null;
  fotoUrl?: string | null;
}
export interface ActualizarPerfilClienteDto {
  nombre: string;
  telefono?: string | null;
  fotoBase64?: string | null;
}
export interface PerfilClienteActualizadoDto extends PerfilClienteDto {
  token: string;
}

export const perfilClienteApi = {
  obtener: () =>
    httpUsuario.get<ApiResponse<PerfilClienteDto>>("/ClienteAuth/perfil"),
  actualizar: (dto: ActualizarPerfilClienteDto) =>
    httpUsuario.put<ApiResponse<PerfilClienteActualizadoDto>>(
      "/ClienteAuth/perfil",
      dto,
    ),
};
