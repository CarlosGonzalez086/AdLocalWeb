import axios from "axios";
import type { ApiResponse } from "../api/apiResponse";
const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://adlocalapi.onrender.com/api"
    : "http://localhost:8080/api";

const municipioActual: string | null = (() => {
  const raw = localStorage.getItem("municipioActual");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { municipio?: string | null };
    return parsed?.municipio ?? null;
  } catch {
    return null;
  }
})();

const api = axios.create({
  baseURL: BASE_URL + "/comercios",
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
  estadoNombre: string;
  municipioNombre: string;
  promedioCalificacion: number;
  badge: string;
  distanciaKm: number;
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
  estadoNombre: string;
  municipioNombre: string;
  calificacion: number;
  badge: string;
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
  getDestacados: (page: number, pageSize: number) =>
    api.get<ApiResponse<ComercioDtoListItem[]>>("", {
      params: {
        tipo: "destacados",
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getPopulares: (page: number, pageSize: number) =>
    api.get<ApiResponse<ComercioDtoListItem[]>>("", {
      params: {
        tipo: "populares",
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getRecientes: (page: number, pageSize: number) =>
    api.get<ApiResponse<ComercioDtoListItem[]>>("", {
      params: {
        tipo: "recientes",
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getCercanos: (lat: number, lng: number, page: number, pageSize: number) =>
    api.get<ApiResponse<ComercioDtoListItem[]>>("", {
      params: {
        tipo: "cercanos",
        lat,
        lng,
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getById: (id: number) => api.get<ApiResponse<ComercioDto>>(`/${id}`),
  getByFiltros: (
    estadoId: number = 0,
    municipioId: number = 0,
    orden: "alfabetico" | "recientes" | "antiguos" | "populares" = "alfabetico",
    page: number = 1,
    pageSize: number = 8,
  ) =>
    api.get<ApiResponse<any>>("por-filtros", {
      params: { estadoId, municipioId, orden, page, pageSize },
    }),
};
