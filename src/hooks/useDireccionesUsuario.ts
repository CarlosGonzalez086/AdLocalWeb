import { useCallback, useEffect, useState } from "react";
import {
  showToast,
  showConfirmDialog,
} from "../utils/sweetalert";
import { extraerMensajeError } from "../utils/errorHandler";
import {
  direccionesUsuarioApi,
  type DireccionUsuarioDtoCreate,
  type DireccionUsuarioDto,
} from "../services/direccionesUsuarioApi";

export const useDireccionesUsuario = () => {
  const [direcciones, setDirecciones] = useState<DireccionUsuarioDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarDirecciones = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await direccionesUsuarioApi.obtenerTodas();

      if (data.codigo !== "200") {
        setError(data.mensaje || "No fue posible cargar las direcciones");
        setDirecciones([]);
        return;
      }

      setDirecciones(data.respuesta ?? []);
    } catch (err: unknown) {
      const mensaje = extraerMensajeError(
        err,
        "No fue posible cargar las direcciones",
      );

      setError(mensaje);
      setDirecciones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const crearDireccion = useCallback(
    async (dto: DireccionUsuarioDtoCreate) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await direccionesUsuarioApi.crear(dto);

        if (data.codigo !== "200") {
          setError(data.mensaje || "No fue posible registrar la dirección");
          return false;
        }

        await cargarDirecciones();
        showToast("Dirección guardada correctamente.", "success", 1500);

        return true;
      } catch (err: unknown) {
        const mensaje = extraerMensajeError(
          err,
          "No fue posible registrar la dirección",
        );

        setError(mensaje);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [cargarDirecciones],
  );

  const actualizarDireccion = useCallback(
    async (uuid: string, dto: DireccionUsuarioDtoCreate) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await direccionesUsuarioApi.actualizar(uuid, dto);

        if (data.codigo !== "200") {
          setError(data.mensaje || "No fue posible actualizar la dirección");
          return false;
        }

        await cargarDirecciones();
        showToast("Dirección actualizada correctamente.", "success", 1500);

        return true;
      } catch (err: unknown) {
        const mensaje = extraerMensajeError(
          err,
          "No fue posible actualizar la dirección",
        );

        setError(mensaje);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [cargarDirecciones],
  );

  const eliminarDireccion = useCallback(
    async (direccion: DireccionUsuarioDto) => {
      const result = await showConfirmDialog({
        title: "Eliminar dirección",
        text: `¿Deseas eliminar "${direccion.alias}"?`,
        icon: "warning",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        isDestructive: true,
      });

      if (!result.isConfirmed) {
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const { data } = await direccionesUsuarioApi.eliminar(direccion.uuid);

        if (data.codigo !== "200") {
          setError(data.mensaje || "No fue posible eliminar la dirección");
          return false;
        }

        await cargarDirecciones();
        showToast("Dirección eliminada correctamente.", "success", 1500);

        return true;
      } catch (err: unknown) {
        const mensaje = extraerMensajeError(
          err,
          "No fue posible eliminar la dirección",
        );

        setError(mensaje);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [cargarDirecciones],
  );

  const establecerPredeterminada = useCallback(
    async (direccion: DireccionUsuarioDto) => {
      if (direccion.esPredeterminada) {
        return true;
      }

      setLoading(true);
      setError(null);

      try {
        const { data } = await direccionesUsuarioApi.establecerPredeterminada(
          direccion.uuid,
        );

        if (data.codigo !== "200") {
          setError(
            data.mensaje ||
              "No fue posible cambiar la dirección predeterminada",
          );

          return false;
        }

        await cargarDirecciones();
        return true;
      } catch (err: unknown) {
        const mensaje = extraerMensajeError(
          err,
          "No fue posible cambiar la dirección predeterminada",
        );

        setError(mensaje);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [cargarDirecciones],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    void cargarDirecciones();
  }, [cargarDirecciones]);

  return {
    direcciones,
    loading,
    error,
    cargarDirecciones,
    crearDireccion,
    actualizarDireccion,
    eliminarDireccion,
    establecerPredeterminada,
    clearError,
  };
};
