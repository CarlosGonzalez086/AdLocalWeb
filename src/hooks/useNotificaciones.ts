import { useCallback, useEffect, useState } from "react";
import {
  marcarNotificacionLeida,
  marcarTodasLeidas,
  obtenerNotificaciones,
} from "../services/notificacionesApi";
import type { Notificacion } from "../types/notificaciones";

export const useNotificaciones = (activo: boolean) => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [noLeidas, setNoLeidas] = useState(0);

  const cargar = useCallback(async () => {
    if (!activo) return;
    try {
      const resultado = await obtenerNotificaciones();

      setNotificaciones(resultado.respuesta.notificaciones ?? []);
      setNoLeidas(resultado.respuesta.noLeidas ?? 0);
    } catch {
      /* El interceptor gestiona la sesión. */
    }
  }, [activo]);

  useEffect(() => {
    if (!activo) return;
    void cargar();
    const intervalo = window.setInterval(() => void cargar(), 30000);
    const alMostrar = () =>
      document.visibilityState === "visible" && void cargar();
    document.addEventListener("visibilitychange", alMostrar);
    return () => {
      window.clearInterval(intervalo);
      document.removeEventListener("visibilitychange", alMostrar);
    };
  }, [activo, cargar]);

  const leer = async (notificacion: Notificacion) => {
    if (!notificacion.leida) {
      await marcarNotificacionLeida(notificacion.uuid);
      setNotificaciones((actuales) =>
        actuales.map((item) =>
          item.uuid === notificacion.uuid ? { ...item, leida: true } : item,
        ),
      );
      setNoLeidas((total) => Math.max(0, total - 1));
    }
  };

  const leerTodas = async () => {
    await marcarTodasLeidas();
    setNotificaciones((actuales) =>
      actuales.map((item) => ({ ...item, leida: true })),
    );
    setNoLeidas(0);
  };

  return { notificaciones, noLeidas, cargar, leer, leerTodas };
};
