import { useState, useEffect } from "react";
import {
  comercioPublicApi,
  type ComercioDtoListItem,
} from "../services/comercioPublicApi";
import Swal from "sweetalert2";

export const useComercioPublico = () => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const resetPaginacion = () => {
    setPage(1);
    setHasMore(true);
  };

  const cargarPopulares = async () => {
    setLoading(true);
    resetPaginacion();

    try {
      const { data } = await comercioPublicApi.getPopulares(1, 10);

      if (data.codigo !== "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }

      setComercios(data.respuesta?.items || []);
      setHasMore(false); // no hay paginación aquí
    } catch {
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarRecientes = async () => {
    setLoading(true);
    resetPaginacion();

    try {
      const { data } = await comercioPublicApi.getRecientes(1, 10);

      if (data.codigo !== "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }

      setComercios(data.respuesta?.items || []);
      setHasMore(false);
    } catch {
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarCercanos = async (lat: number, lng: number) => {
    setLoading(true);
    resetPaginacion();

    try {
      const { data } = await comercioPublicApi.getCercanos(lat, lng, 1, 10);

      if (data.codigo !== "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }

      setComercios(data.respuesta?.items || []);
      setHasMore(false);
    } catch {
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarPorFiltros = async (
    estadoId = 0,
    municipioId = 0,
    orden: "alfabetico" | "recientes" | "antiguos" | "populares",
    reset = false,
  ) => {
    setLoading(true);

    try {
      const currentPage = reset ? 1 : page;

      if (reset) {
        resetPaginacion();
      }

      const { data } = await comercioPublicApi.getByFiltros(
        estadoId,
        municipioId,
        orden,
        currentPage,
        8,
      );
      if (data.codigo !== "200") {
        Swal.fire("Error", data.mensaje, "error");
        return;
      }

      const items = data.respuesta.items || [];
      const total = data.respuesta.total;

      setComercios(prev => (reset ? items : [...prev, ...items]));
      setHasMore(currentPage * 8 < total);
      setPage(currentPage + 1);
    } catch {
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
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
    hasMore,
    cargarPopulares,
    cargarRecientes,
    cargarCercanos,
    cargarPorId: async (id: number) => {
      setLoading(true);
      try {
        const { data } = await comercioPublicApi.getById(id);
        return data.codigo === "200" ? data.respuesta : null;
      } catch {
        return null;
      } finally {
        setLoading(false);
      }
    },
    cargarPorFiltros,
  };
};

