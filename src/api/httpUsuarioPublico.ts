import axios from "axios";
import { BACKEND_URL } from "./http";

export const httpUsuarioPublico = axios.create({
  baseURL: `${BACKEND_URL}`,

  headers: {
    "Content-Type": "application/json",
  },
});

httpUsuarioPublico.interceptors.response.use(
  (response) => response,

  (error) => {
    console.log("STATUS PUBLICO:", error.response?.status);

    console.log("ERROR API PUBLICA:", error.response?.data);

    return Promise.reject(error);
  },
);
