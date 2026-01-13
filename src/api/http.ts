export const URL_ADLOCAL_COMERCIO = import.meta.env.PROD
  ? "https://ad-local-gamma.vercel.app/registro"
  : "http://localhost:5173/registro";

export const BACKEND_URL = import.meta.env.PROD
  ? "https://adlocalapi.onrender.com/api"
  : "http://localhost:8080/api";
