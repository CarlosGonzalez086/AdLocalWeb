import axios, { type InternalAxiosRequestConfig } from "axios";

import {
  clearStorageUsuario,
  getLocalStorageJWTUsuario,
} from "../utils/storageUsuario";
import { renovarTokenSilencioso } from "../utils/tokenManager";
import { BACKEND_URL } from "./http";

export const httpUsuario = axios.create({
  baseURL: `${BACKEND_URL}`,
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
      } catch (renewalError) {
        console.error("Error al reintentar petición con token renovado:", renewalError);
      }

      // Si no se pudo renovar el token definitivamente, limpiar y redirigir
      clearStorageUsuario();
      if (typeof window !== "undefined") {
        window.location.href = "/usuario/login";
      }
    } else if (status === 403) {
      console.warn("Acceso denegado (403 Forbidden): permisos insuficientes");
    }

    return Promise.reject(error);
  },
);
