import type { ApiResponse } from "../api/apiResponse";
import { httpUsuarioPublico } from "../api/httpUsuarioPublico";
import { getLocalStorageJWTUsuario } from "../utils/storageUsuario";

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

export interface ComercioListadoResponse {
  items: ComercioDtoListItem[];
  total: number;
  page: number;
  pageSize: number;
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
  tipoComercioId: number;
  tipoComercio: string;
}

export enum TipoProductoServicio {
  Producto = 1,
  Servicio = 2,
}

export enum ModalidadProductoServicio {
  Compra = 1,
  Reservacion = 2,
  Cotizacion = 3,
}

export interface ProductoServicioDto {
  id?: number;

  uuid: string;

  idComercio: number;

  nombre: string;

  descripcion?: string | null;

  logoUrl?: string | null;

  tipo: TipoProductoServicio;

  modalidad: ModalidadProductoServicio;

  precio?: number | null;

  precioDesde?: number | null;

  manejaStock: boolean;

  stock?: number | null;

  disponible: boolean;

  permiteDomicilio: boolean;

  permiteRecoger: boolean;

  duracionMinutos?: number | null;

  activo: boolean;

  eliminado?: boolean;

  visible: boolean;

  codigoInterno?: string | null;

  fechaCreacion?: string;

  fechaActualizacion?: string;

  fechaEliminado?: string;
}

export const comercioPublicApi = {
  getDestacados: (page: number, pageSize: number) =>
    httpUsuarioPublico.get<ApiResponse<ComercioListadoResponse>>("comercios", {
      params: {
        tipo: "destacados",
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getPopulares: (page: number, pageSize: number) =>
    httpUsuarioPublico.get<ApiResponse<ComercioListadoResponse>>("comercios", {
      params: {
        tipo: "populares",
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getRecientes: (page: number, pageSize: number) =>
    httpUsuarioPublico.get<ApiResponse<ComercioListadoResponse>>("comercios", {
      params: {
        tipo: "recientes",
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getSugeridos: (lat: number, lng: number, page: number, pageSize: number) =>
    httpUsuarioPublico.get<ApiResponse<ComercioListadoResponse>>("comercios", {
      params: {
        tipo: "sugeridos",
        lat,
        lng,
        municipio: municipioActual,
        page,
        pageSize,
      },
      headers: getLocalStorageJWTUsuario()
        ? { Authorization: `Bearer ${getLocalStorageJWTUsuario()}` }
        : undefined,
    }),

  getCercanos: (lat: number, lng: number, page: number, pageSize: number) =>
    httpUsuarioPublico.get<ApiResponse<ComercioListadoResponse>>("comercios", {
      params: {
        tipo: "cercanos",
        lat,
        lng,
        municipio: municipioActual,
        page,
        pageSize,
      },
    }),

  getById: (id: number) =>
    httpUsuarioPublico.get<ApiResponse<ComercioDto>>(`comercios/${id}`),
  getByFiltros: (
    estadoId: number = 0,
    municipioId: number = 0,
    idTipoComercio: number = 0,
    orden: "alfabetico" | "recientes" | "antiguos" | "populares" = "alfabetico",
    page: number = 1,
    pageSize: number = 8,
  ) =>
    httpUsuarioPublico.get<ApiResponse<any>>("comercios/por-filtros", {
      params: { estadoId, municipioId, idTipoComercio, orden, page, pageSize },
    }),
};
