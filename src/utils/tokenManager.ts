import { clienteAuthApi } from "../services/clienteAuthApi";
import { decodeJwtPayload, type JwtBasePayload } from "./jwt";
import {
  clearStorageUsuario,
  getLocalStorageJWTUsuario,
  getLocalStorageRefreshTokenUsuario,
  setLocalStorageJWTUsuario,
  setLocalStorageRefreshTokenUsuario,
} from "./storageUsuario";

export type { JwtBasePayload as JwtPayload };
export { decodeJwtPayload };

/**
 * Retorna true si el token ya expiró o si expirará dentro de `margenMinutos`.
 */
export const isTokenProximoAExpirar = (
  token?: string,
  margenMinutos = 10,
): boolean => {
  const currentToken = token || getLocalStorageJWTUsuario();
  if (!currentToken) return true;

  const payload = decodeJwtPayload(currentToken);
  if (!payload || !payload.exp) return false;

  const nowSeconds = Math.floor(Date.now() / 1000);
  const expirationSeconds = payload.exp;
  const margenSeconds = margenMinutos * 60;

  return expirationSeconds - nowSeconds <= margenSeconds;
};

// Singleton promise para evitar llamadas de renovación concurrentes
let refreshPromise: Promise<string | null> | null = null;

/**
 * Renueva el token JWT consumiendo POST /api/ClienteAuth/renovar-token.
 * Si ya hay una renovación en curso, reutiliza la misma promesa (mutex).
 */
export const renovarTokenSilencioso = async (): Promise<string | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  const tokenActual = getLocalStorageJWTUsuario();
  const refreshActual = getLocalStorageRefreshTokenUsuario();
  if (!tokenActual && !refreshActual) {
    return null;
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const { data } = await clienteAuthApi.renovarToken(tokenActual);

      if (data && (data.codigo === "200" || String(data.codigo) === "200")) {
        const nuevoToken = data.respuesta?.token;

        if (nuevoToken) {
          setLocalStorageJWTUsuario(nuevoToken);
          if (data.respuesta?.refreshToken) {
            setLocalStorageRefreshTokenUsuario(data.respuesta.refreshToken);
          }

          if (data.respuesta?.usuario) {
            try {
              window.localStorage.setItem(
                "cliente",
                JSON.stringify(data.respuesta.usuario),
              );
              window.localStorage.setItem(
                "usuario",
                JSON.stringify(data.respuesta.usuario),
              );
            } catch {
              // Silencioso: ignorar error de cuota o storage bloqueado en navegador
            }
          }

          // Notificar a todos los componentes de la ventana actual y otras pestañas
          window.dispatchEvent(
            new CustomEvent("usuarioSesionActualizada", {
              detail: {
                token: nuevoToken,
                usuario: data.respuesta?.usuario,
              },
            }),
          );
          window.dispatchEvent(new Event("storage"));

          return nuevoToken;
        }
      }

      // Si el backend devolvió código de error distinto a 200
      return null;
    } catch (error: unknown) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      // Solo si el servidor rechaza el token con 401/403 de forma terminante
      if (status === 401 || status === 403) {
        clearStorageUsuario();
        window.dispatchEvent(new Event("usuarioSesionActualizada"));
        window.dispatchEvent(new Event("storage"));
      }

      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
