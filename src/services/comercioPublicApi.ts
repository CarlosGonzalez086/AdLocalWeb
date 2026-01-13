import axios from "axios";
import type { ApiResponse } from "../api/apiResponse";
const BASE_URL =
  typeof window === "undefined"
    ? // SSR (server) en Astro/Vercel
      import.meta.env.PUBLIC_BACKEND_PROD_URL ?? import.meta.env.PUBLIC_BACKEND_URL_LOCAL
    : // Cliente
      import.meta.env.PUBLIC_BACKEND_URL + "/comercios";
    
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(BASE_URL);

api.interceptors.response.use(
  (r) => r,
  (e) => {
    const message =
      e.response?.data?.mensaje ||
      e.response?.data?.message ||
      "Error en la petición";

    throw new Error(message);
  }
);

export interface HorarioComercioDto {
  dia: number;
  abierto: boolean;
  horaApertura?: string;
  horaCierre?: string;
  horaAperturaFormateada?: string;
  horaCierreFormateada?: string;
}

export interface ComercioDtoListItem {
  id: number;
  nombre: string;
  idUsuario: number;
  descripcion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  logoUrl?: string;
  lat?: number;
  lng?: number;
  colorPrimario?: string;
  colorSecundario?: string;
  activo: boolean;
  fechaCreacion: string;
}

export interface ComercioDto {
  id: number;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  descripcion?: string;
  logoBase64?: string;
  imagenes?: string[];
  lat: number;
  lng: number;
  colorPrimario?: string;
  colorSecundario?: string;
  activo?: boolean;
  horarios?: HorarioComercioDto[];
  productos?: ProductoServicioDto[];
}

export interface ProductoServicioDto {
  id?: number;

  idComercio: number;
  idUsuario: number;

  nombre: string;
  descripcion?: string;

  logoUrl?: string;

  tipo: number;

  precio?: number;
  stock?: number;

  activo: boolean;
  eliminado?: boolean;
  visible?: boolean;

  codigoInterno?: string;

  fechaCreacion?: string;
  fechaActualizacion?: string;
  fechaEliminado?: string;
}

export const comercioPublicApi = {
  getPopulares: () =>
    api.get<ApiResponse<ComercioDtoListItem[]>>("", {
      params: { tipo: "populares" },
    }),

  getRecientes: () =>
    api.get<ApiResponse<ComercioDtoListItem[]>>("", {
      params: { tipo: "recientes" },
    }),

  getCercanos: (lat: number, lng: number) =>
    api.get<ApiResponse<ComercioDtoListItem[]>>("", {
      params: { tipo: "cercanos", lat, lng },
    }),

  getById: (id: number) => api.get<ApiResponse<ComercioDto>>(`/${id}`),
};
