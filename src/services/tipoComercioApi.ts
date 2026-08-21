import type { ApiResponse } from "../api/apiResponse";
import { httpUsuarioPublico } from "../api/httpUsuarioPublico";

export interface TipoComercioDto {
  id: number;
  nombre: string;
  descripcion?: string | null;
  activo: boolean;
}

export const tipoComercioApi = {
  getAllForSelect: () =>
    httpUsuarioPublico.get<ApiResponse<TipoComercioDto[]>>(`TiposComercio/getAllForSelect`),
};
