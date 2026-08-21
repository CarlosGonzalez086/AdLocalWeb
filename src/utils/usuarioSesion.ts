import {
  clearStorageUsuario,
  getLocalStorageJWTUsuario,
} from "./storageUsuario";

export interface UsuarioSesion {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  fotoUrl: string | null;
  exp?: number;
}

interface JwtPayload {
  id?: string;
  nombre?: string;
  email?: string;
  sub?: string;
  rol?: string;
  fotoUrl?: string;
  exp?: number;
}

const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");

    while (base64.length % 4) {
      base64 += "=";
    }

    const binary = window.atob(base64);

    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

    const json = new TextDecoder().decode(bytes);

    return JSON.parse(json);
  } catch (error) {
    console.error("Error al decodificar JWT:", error);

    return null;
  }
};

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

  if (payload.exp && payload.exp * 1000 <= Date.now()) {
    clearStorageUsuario();

    return null;
  }

  const id = Number(payload.id);

  if (!id || !payload.nombre || payload.rol?.toLowerCase() !== "cliente") {
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
