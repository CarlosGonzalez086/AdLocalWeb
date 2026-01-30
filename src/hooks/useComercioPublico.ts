import { useState, useEffect } from "react";
import {
  comercioPublicApi,
  type ComercioDtoListItem,
} from "../services/comercioPublicApi";
import Swal from "sweetalert2";

export const useComercioPublico = () => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(false);

  const cargarPopulares = async () => {
    setLoading(true);
    try {
      const { data } = await comercioPublicApi.getPopulares();
      if (data.codigo != "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }
      setComercios(data.respuesta || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No pudimos cargar los comercios en este momento. Revisa tu conexión e inténtalo nuevamente.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#007AFF",
        backdrop: "rgba(0,0,0,0.4)",
      });

      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarRecientes = async () => {
    setLoading(true);
    try {
      const { data } = await comercioPublicApi.getRecientes();
      if (data.codigo != "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }
      setComercios(data.respuesta || []);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No pudimos cargar los comercios en este momento. Revisa tu conexión e inténtalo nuevamente.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#007AFF",
        backdrop: "rgba(0,0,0,0.4)",
      });

      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarCercanos = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const { data } = await comercioPublicApi.getCercanos(lat, lng);
      if (data.codigo != "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }
      setComercios(data.respuesta || []);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No pudimos cargar los comercios en este momento. Revisa tu conexión e inténtalo nuevamente.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#007AFF",
        backdrop: "rgba(0,0,0,0.4)",
      });

      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarPorId = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await comercioPublicApi.getById(id);
      if (data.codigo != "200") {
        Swal.fire("Error", data.mensaje, "error");
        return null;
      }
      return data.respuesta || null;
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No pudimos cargar el comercio en este momento. Revisa tu conexión e inténtalo nuevamente.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#007AFF",
        backdrop: "rgba(0,0,0,0.4)",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  const cargarPorFiltros = async (
    estadoId: number = 0,
    municipioId: number = 0,
    ordenSeleccionado: "alfabetico" | "recientes" | "antiguos" | "populares",
  ) => {
    setLoading(true);
    try {
      const { data } = await comercioPublicApi.getByFiltros(
        estadoId,
        municipioId,
        ordenSeleccionado,
      );
      if (data.codigo != "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }
      setComercios(data.respuesta || []);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Algo salió mal",
        text: "No pudimos cargar los comercios en este momento. Revisa tu conexión e inténtalo nuevamente.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#007AFF",
        backdrop: "rgba(0,0,0,0.4)",
      });

      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPopulares();
  }, []);

  return {
    comercios,
    loading,
    cargarPopulares,
    cargarRecientes,
    cargarCercanos,
    cargarPorId,
    cargarPorFiltros,
  };
};
