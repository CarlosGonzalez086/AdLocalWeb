import {
  URL_DASHBOARD_COMERCIO,
  URL_PANEL_COMERCIO,
  URL_REGISTRO_COMERCIO,
} from "../../api/http";
import { ADLOCAL_MARK_URL } from "../../constants/brand";

export const LOGO_URL = ADLOCAL_MARK_URL;

export interface UsuarioSesion {
  id: number;
  nombre: string;
  rol: string;
  fotoUrl?: string | null;
}

export interface JwtUsuarioPayload {
  id?: string;
  nombre?: string;
  rol?: string;
  fotoUrl?: string;
  exp?: number;
}

export interface HeaderNavUrls {
  inicio: string;
  busquedaAvanzada: string;
  loginUsuario: string;
  registroUsuario: string;
  cuentaUsuario: string;
  carrito: string;
  pedidos: string;
  citas: string;
  registroNegocio: string;
  loginNegocio: string;
  dashboardNegocio: string;
}

export const getHeaderUrls = (): HeaderNavUrls => ({
  inicio: "/",
  busquedaAvanzada:
    import.meta.env.MODE === "production"
      ? "https://adlocal.store/comercios/busqueda-avanzada"
      : "/comercios/busqueda-avanzada",
  loginUsuario: "/usuario/login",
  registroUsuario: "/usuario/crear-cuenta",
  cuentaUsuario: "/usuario/perfil",
  carrito: "/usuario/carrito",
  pedidos: "/usuario/pedidos",
  citas: "/usuario/citas",
  registroNegocio: URL_REGISTRO_COMERCIO,
  loginNegocio: URL_PANEL_COMERCIO,
  dashboardNegocio: URL_DASHBOARD_COMERCIO,
});

export const decodeJwt = (token: string): JwtUsuarioPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    const binary = window.atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const obtenerIniciales = (nombre: string): string => {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "U";
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
};
