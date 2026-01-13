export const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.BACKEND_URL_LOCAL
    : import.meta.env.BACKEND_PROD_URL;

export const URL_ADLOCAL_COMERCIO =
  import.meta.env.MODE === "development"
    ? import.meta.env.PUBLIC_URL_ADLOCAL_COMERCIO
    : import.meta.env.PUBLIC_URL_ADLOCAL_PROD_COMERCIO;