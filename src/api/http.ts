export const URL_ADLOCAL_COMERCIO =
  import.meta.env.NODE_ENV === "production"
    ? "http://localhost:5173/registro"
    : "https://ad-local-gamma.vercel.app/registro";

export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080/api"
    : "https://adlocalapi.onrender.com/api";
