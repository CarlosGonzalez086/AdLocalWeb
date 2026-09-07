import { useCallback, useState } from "react";
import {
  clienteAuthApi,
  type ClienteRegistroDto,
  type EmailDto,
  type LoginClienteDto,
  type RestablecerPasswordDto,
  type VerificarCodigoDto,
} from "../services/clienteAuthApi";
import {
  clearStorageUsuario,
  setLocalStorageJWTUsuario,
} from "../utils/storageUsuario";

export const useClienteAuth = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const registro = useCallback(async (dto: ClienteRegistroDto) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await clienteAuthApi.registro(dto);

      if (data.codigo !== "200") {
        setError(data.mensaje || "No fue posible registrar la cuenta");

        return null;
      }

      const rawRespuesta: any = data.respuesta;
      const token =
        typeof rawRespuesta === "string"
          ? rawRespuesta
          : rawRespuesta?.token || rawRespuesta?.result;

      if (!token) {
        setError("No se recibió el token de autenticación");

        return null;
      }

      setLocalStorageJWTUsuario(token);

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("usuarioSesionActualizada", { detail: { token } }),
        );
        window.dispatchEvent(new Event("storage"));
      }

      return token;
    } catch (err: any) {
      const mensaje =
        err?.response?.data?.mensaje ||
        err?.message ||
        "No fue posible registrar la cuenta";

      setError(mensaje);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (dto: LoginClienteDto) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await clienteAuthApi.login(dto);

      if (data.codigo !== "200") {
        setError(data.mensaje || "Correo o contraseña incorrectos");

        return null;
      }

      const rawRespuesta: any = data.respuesta;
      const token =
        typeof rawRespuesta === "string"
          ? rawRespuesta
          : rawRespuesta?.token || rawRespuesta?.result;

      if (!token) {
        setError("No se recibió el token de autenticación");

        return null;
      }

      setLocalStorageJWTUsuario(token);

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("usuarioSesionActualizada", { detail: { token } }),
        );
        window.dispatchEvent(new Event("storage"));
      }

      return token;
    } catch (err: any) {
      const mensaje =
        err?.response?.data?.mensaje ||
        err?.message ||
        "No fue posible iniciar sesión";

      setError(mensaje);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const recuperarPassword = useCallback(async (dto: EmailDto) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await clienteAuthApi.recuperarPassword(dto);

      if (data.codigo !== "200") {
        setError(data.mensaje || "No fue posible solicitar el código");

        return false;
      }

      return true;
    } catch (err: any) {
      const mensaje =
        err?.response?.data?.mensaje ||
        err?.message ||
        "No fue posible solicitar el código";

      setError(mensaje);

      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const verificarCodigo = useCallback(async (dto: VerificarCodigoDto) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await clienteAuthApi.verificarCodigo(dto);

      if (data.codigo !== "200") {
        setError(data.mensaje || "El código no es válido");

        return false;
      }

      return true;
    } catch (err: any) {
      const mensaje =
        err?.response?.data?.mensaje ||
        err?.message ||
        "El código no es válido";

      setError(mensaje);

      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const restablecerPassword = useCallback(
    async (dto: RestablecerPasswordDto) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await clienteAuthApi.restablecerPassword(dto);

        if (data.codigo !== "200") {
          setError(data.mensaje || "No fue posible actualizar la contraseña");

          return false;
        }

        return true;
      } catch (err: any) {
        const mensaje =
          err?.response?.data?.mensaje ||
          err?.message ||
          "No fue posible actualizar la contraseña";

        setError(mensaje);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    clearStorageUsuario();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("usuarioSesionActualizada"));
      window.dispatchEvent(new Event("storage"));
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,

    registro,
    login,
    recuperarPassword,
    verificarCodigo,
    restablecerPassword,

    logout,
    clearError,
  };
};
