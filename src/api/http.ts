// http.ts
export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.PUBLIC_BACKEND_URL
    : import.meta.env.PUBLIC_BACKEND_PROD_URL;

export const URL_ADLOCAL_COMERCIO =
  import.meta.env.MODE === "development"
    ? import.meta.env.PUBLIC_URL_ADLOCAL_COMERCIO
    : import.meta.env.PUBLIC_URL_ADLOCAL_PROD_COMERCIO;


