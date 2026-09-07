import axios from "axios";
import type { ApiResponse } from "../api/apiResponse";
import { BACKEND_URL } from "../api/http";
import { httpUsuarioPublico } from "../api/httpUsuarioPublico";
import { getLocalStorageJWTUsuario } from "../utils/storageUsuario";

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

export interface UsuarioRenovadoDto {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  comercioId?: number | null;
}

export interface RenovarTokenResponse {
  token: string;
  usuario: UsuarioRenovadoDto;
}

export const clienteAuthApi = {
  registro: (dto: ClienteRegistroDto) =>
    httpUsuarioPublico.post<ApiResponse<string>>("/ClienteAuth/registro", dto),

  login: (dto: LoginClienteDto) =>
    httpUsuarioPublico.post<ApiResponse<string>>("/ClienteAuth/login", dto),

  renovarToken: (token?: string) => {
    const currentToken = token || getLocalStorageJWTUsuario();
    return axios.post<ApiResponse<RenovarTokenResponse>>(
      `${BACKEND_URL}ClienteAuth/renovar-token`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
      },
    );
  },

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
