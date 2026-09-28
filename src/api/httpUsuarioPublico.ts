import axios from "axios";
import { BACKEND_URL } from "./http";
import { extraerMensajeError } from "../utils/errorHandler";

export const httpUsuarioPublico = axios.create({
  baseURL: `${BACKEND_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpUsuarioPublico.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && typeof error === "object") {
      (error as Record<string, unknown>).mensajeAmigable =
        extraerMensajeError(error);
    }

    return Promise.reject(error);
  },
);
