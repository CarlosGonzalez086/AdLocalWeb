import { decodeJwtPayload, type JwtBasePayload } from "./jwt";
import { isTokenProximoAExpirar, renovarTokenSilencioso } from "./tokenManager";
import {
  clearStorageUsuario,
  getLocalStorageJWTUsuario,
  getLocalStorageRefreshTokenUsuario,
} from "./storageUsuario";

export interface UsuarioSesion {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  fotoUrl: string | null;
  exp?: number;
}

interface JwtPayload extends JwtBasePayload {
  id?: string;
  nombre?: string;
  email?: string;
  sub?: string;
  rol?: string;
  fotoUrl?: string;
  exp?: number;
}

const decodeJwt = (token: string): JwtPayload | null =>
  decodeJwtPayload<JwtPayload>(token);

export const getUsuarioSesion = (): UsuarioSesion | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = getLocalStorageJWTUsuario();

  if (!token) {
    return null;
  }

  const payload = decodeJwt(token);

  if (!payload) {
    clearStorageUsuario();
    return null;
  }

  // Si ya expiró el token, intentamos renovarlo silenciosamente
  if (payload.exp && payload.exp * 1000 <= Date.now()) {
    renovarTokenSilencioso().catch(() => {});
    return null;
  }

  // Si le quedan menos de 5 minutos, renovamos en background
  if (isTokenProximoAExpirar(token, 5)) {
    renovarTokenSilencioso().catch(() => {});
  }

  const id = Number(payload.id);
  const rol = payload.rol?.toLowerCase();

  if (!id || !payload.nombre || (rol !== "cliente" && rol !== "comercio")) {
    clearStorageUsuario();

    return null;
  }

  return {
    id,
    nombre: payload.nombre,
    email: payload.email ?? payload.sub ?? "",
    rol: payload.rol ?? "",
    fotoUrl: payload.fotoUrl || null,
    exp: payload.exp,
  };
};

/**
 * Valida la sesión y renueva el token de forma asíncrona si está vencido o por vencer.
 */
export const obtenerSesionValidaOActualizar = async (): Promise<UsuarioSesion | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = getLocalStorageJWTUsuario();
  const refreshToken = getLocalStorageRefreshTokenUsuario();
  if (!token && !refreshToken) return null;

  if (!token || isTokenProximoAExpirar(token, 5)) {
    const nuevoToken = await renovarTokenSilencioso();
    if (nuevoToken) {
      return getUsuarioSesion();
    }
  }

  return getUsuarioSesion();
};

export const getInicialesUsuario = (nombre: string): string => {
  const partes = nombre.trim().split(/\s+/).filter(Boolean);

  if (partes.length === 0) {
    return "U";
  }

  if (partes.length === 1) {
    return partes[0].substring(0, 2).toUpperCase();
  }

  return (partes[0][0] + partes[1][0]).toUpperCase();
};
