import type { ApiResponse } from "../api/apiResponse";
import { httpUsuarioPublico } from "../api/httpUsuarioPublico";

export interface ClienteRegistroDto {
  nombre: string;
  email: string;
  password: string;
  confirmarPassword: string;
}

export interface LoginClienteDto {
  email: string;
  password: string;
}

export interface EmailDto {
  email: string;
}

export interface VerificarCodigoDto {
  email: string;
  codigo: string;
}

export interface RestablecerPasswordDto {
  email: string;
  codigo: string;
  password: string;
  confirmarPassword: string;
}

export interface LoginClienteResponse {
  token: string;
}

export const clienteAuthApi = {
  registro: (dto: ClienteRegistroDto) =>
    httpUsuarioPublico.post<ApiResponse<string>>("/ClienteAuth/registro", dto),

  login: (dto: LoginClienteDto) =>
    httpUsuarioPublico.post<ApiResponse<string>>("/ClienteAuth/login", dto),

  recuperarPassword: (dto: EmailDto) =>
    httpUsuarioPublico.post<ApiResponse<object>>(
      "/ClienteAuth/recuperar-password",
      dto,
    ),

  verificarCodigo: (dto: VerificarCodigoDto) =>
    httpUsuarioPublico.post<ApiResponse<object>>(
      "/ClienteAuth/verificar-codigo",
      dto,
    ),

  restablecerPassword: (dto: RestablecerPasswordDto) =>
    httpUsuarioPublico.post<ApiResponse<object>>(
      "/ClienteAuth/restablecer-password",
      dto,
    ),
};
