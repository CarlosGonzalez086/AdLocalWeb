import type { ApiResponse } from "../api/apiResponse";
import { httpUsuarioPublico } from "../api/httpUsuarioPublico";

export interface CalificacionComentarioCreateDto {
  calificacion: number;
  comentario: string;
  idComercio: number;
  nombrePersona: string;
}

export interface CalificacionComentarioDto {
  id: number;
  calificacion: number;
  comentario: string;
  idComercio: number;
  nombrePersona: string;
  fechaCreacion: string;
}

export interface CalificacionComentarioListResponse {
  totalRecords: number;
  page: number;
  pageSize: number;
  data: CalificacionComentarioDto[];
}

export const calificacionesApi = {
  crear: (dto: CalificacionComentarioCreateDto) =>
    httpUsuarioPublico.post<ApiResponse<CalificacionComentarioDto>>(
      "CalificacionesComentarios",
      dto,
    ),

  obtenerTodos: (
    idComercio: number,
    page: number = 1,
    pageSize: number = 10,
    orderBy: "asc" | "desc" = "desc",
  ) =>
    httpUsuarioPublico.get<ApiResponse<CalificacionComentarioListResponse>>(
      "CalificacionesComentarios",
      {
        params: { idComercio, page, pageSize, orderBy },
      },
    ),
};
