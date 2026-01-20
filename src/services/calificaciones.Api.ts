import axios from "axios";
import type { ApiResponse } from "../api/apiResponse";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://adlocalapi.onrender.com/api"
    : "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL + "/CalificacionesComentarios",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    console.log(e);

    const message =
      e.response?.data?.mensaje ||
      e.response?.data?.message ||
      "Error en la petición";

    throw new Error(message);
  }
);

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
    api.post<ApiResponse<CalificacionComentarioDto>>("", dto),


  obtenerTodos: (
    idComercio: number,
    page: number = 1,
    pageSize: number = 10,
    orderBy: "asc" | "desc" = "desc"
  ) =>
    api.get<ApiResponse<CalificacionComentarioListResponse>>("", {
      params: { idComercio, page, pageSize, orderBy },
    }),
};
