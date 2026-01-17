import { useState, useEffect } from "react";
import {
  comercioPublicApi,
  type ComercioDtoListItem,
} from "../services/comercioPublicApi";
import Swal from "sweetalert2";

export const useComercioPublico = () => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar comercios populares por defecto
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
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar comercios recientes
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
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar comercios cercanos
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
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar un comercio por ID
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
      Swal.fire("Error", "No se pudo cargar el comercio", "error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  //Cargar comercios por filtros de estado y municipio
const cargarPorFiltros = async (
  estadoId: number = 0,
  municipioId: number = 0,
  ordenSeleccionado: "alfabetico" | "recientes" | "antiguos",
) => {
  setLoading(true);
  try {
    const { data } = await comercioPublicApi.getByFiltros(
      estadoId,
      municipioId,
      ordenSeleccionado
    );
    if (data.codigo != "200") {
      Swal.fire("Error", data.mensaje, "error");
      setComercios([]);
      return;
    }
    setComercios(data.respuesta || []);
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "No se pudieron cargar los comercios", "error");
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
