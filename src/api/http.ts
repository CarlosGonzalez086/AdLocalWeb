const isDev = import.meta.env.MODE === "development";

export const BACKEND_URL = isDev
  ? "http://localhost:8080/api/"
  : "https://adlocalapi.onrender.com/api/";

export const PANEL_BASE_URL = isDev
  ? "http://localhost:5173"
  : "https://panel.adlocal.store";

export const URL_PANEL_COMERCIO = `${PANEL_BASE_URL}/usuario/login`;
export const URL_REGISTRO_COMERCIO = `${PANEL_BASE_URL}/usuario/crear-cuenta`;
export const URL_DASHBOARD_COMERCIO = `${PANEL_BASE_URL}/usuario/app`;

// Retrocompatibilidad
export const URL_ADLOCAL_COMERCIO = URL_REGISTRO_COMERCIO;
