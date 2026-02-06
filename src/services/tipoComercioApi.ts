import axios from "axios";
import type { ApiResponse } from "../api/apiResponse";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://adlocalapi.onrender.com/api"
    : "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL + "/TiposComercio",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    const message =
      e.response?.data?.mensaje ||
      e.response?.data?.message ||
      e.cod ||
      "Error en la petición";

    throw new Error(message);
  },
);

export interface TipoComercioDto {
  id: number;
  nombre: string;
  descripcion?: string | null;
  activo: boolean;
}

export const tipoComercioApi = {
  getAllForSelect: () =>
    api.get<ApiResponse<TipoComercioDto[]>>(`/getAllForSelect`),
};
