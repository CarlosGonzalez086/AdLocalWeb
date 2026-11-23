import axios, { type InternalAxiosRequestConfig } from "axios";

import {
  clearStorageUsuario,
  getLocalStorageJWTUsuario,
} from "../utils/storageUsuario";
import { renovarTokenSilencioso } from "../utils/tokenManager";
import { extraerMensajeError } from "../utils/errorHandler";
import { BACKEND_URL } from "./http";

export const httpUsuario = axios.create({
  baseURL: `${BACKEND_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpUsuario.interceptors.request.use(
  (config) => {
    const token = getLocalStorageJWTUsuario();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

httpUsuario.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
    const status = error.response?.status;

    // Si es 401 y no hemos reintentado todavía esta petición
    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const nuevoToken = await renovarTokenSilencioso();

        if (nuevoToken) {
          originalRequest.headers.Authorization = `Bearer ${nuevoToken}`;
          return httpUsuario(originalRequest);
        }
      } catch {
        // Fallo en la renovación silenciosa
      }

      // Si no se pudo renovar el token definitivamente, limpiar y redirigir
      clearStorageUsuario();
      if (typeof window !== "undefined") {
        const destino = window.location.pathname + window.location.search;
        const loginUrl =
          destino && !destino.startsWith("/usuario/login") && !destino.startsWith("//")
            ? `/usuario/login?returnUrl=${encodeURIComponent(destino)}`
            : "/usuario/login";
        window.location.href = loginUrl;
      }
    }

    if (error && typeof error === "object") {
      (error as Record<string, unknown>).mensajeAmigable =
        extraerMensajeError(error);
    }

    return Promise.reject(error);
  },
);
