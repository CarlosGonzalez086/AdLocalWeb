// http.ts
export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.PUBLIC_BACKEND_URL
    : import.meta.env.PUBLIC_BACKEND_PROD_URL;

export const URL_ADLOCAL_COMERCIO =
  import.meta.env.MODE === "development"
    ? import.meta.env.PUBLIC_URL_ADLOCAL_COMERCIO
    : import.meta.env.PUBLIC_URL_ADLOCAL_PROD_COMERCIO;

export const BASE_URL = `${BACKEND_URL}/comercios`;

console.log("BACKEND_URL:", BACKEND_URL);
console.log("BASE_URL:", BASE_URL);