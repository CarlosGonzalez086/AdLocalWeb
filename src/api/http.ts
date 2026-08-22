export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080/api/"
    : "https://adlocalapi.onrender.com/api/";

export const URL_ADLOCAL_COMERCIO =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173/usuario/registro"
    : "https://adlocal.store/usuario/registro";
