import axios from "axios";
import type { ApiResponse } from "../api/apiResponse";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://adlocalapi.onrender.com/api"
    : "http://localhost:8080/api";


const api = axios.create({
  baseURL: BASE_URL + "/ComercioVisitas",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (r) => r,
  (e) => {
    console.error("Error visitas API:", e);

    const message =
      e.response?.data?.mensaje ||
      e.response?.data?.message ||
      "Error al registrar la visita";

    throw new Error(message);
  },
);
export const visitasPublicApi = {

  registrarVisita: (comercioId: number) =>
    api.post<ApiResponse<null>>(`/${comercioId}`),
};
