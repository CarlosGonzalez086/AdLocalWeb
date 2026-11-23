import { useState, useEffect, useCallback, useRef } from "react";
import {
  comercioPublicApi,
  type ComercioDtoListItem,
} from "../services/comercioPublicApi";
import Swal from "../utils/sweetalert";

export const useComercioPublico = ({ autoLoad = true }: { autoLoad?: boolean } = {}) => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const requestSeqRef = useRef(0);
  const pageRef = useRef(1);

  const resetPaginacion = useCallback(() => {
    setHasMore(true);
  }, []);

  const cargarPopulares = useCallback(async () => {
    const reqId = ++requestSeqRef.current;
    setLoading(true);
    pageRef.current = 1;
    resetPaginacion();

    try {
      const { data } = await comercioPublicApi.getPopulares(1, 10);
      if (reqId !== requestSeqRef.current) return;

      if (data.codigo !== "200") {
        Swal.fire("Error", data.mensaje, "error");
        setComercios([]);
        return;
      }

      setComercios(data.respuesta?.items || []);
      setHasMore(false); // no hay paginación aquí
    } catch {
      if (reqId !== requestSeqRef.current) return;
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
      setComercios([]);
    } finally {
      if (reqId === requestSeqRef.current) setLoading(false);
    }
  }, [resetPaginacion]);

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

  const cargarPorFiltros = useCallback(async (
    estadoId = 0,
    municipioId = 0,
    idTipoComercio = 0,
    orden: "alfabetico" | "recientes" | "antiguos" | "populares" = "alfabetico",
    reset = false,
    search = "",
  ) => {
    const reqId = ++requestSeqRef.current;
    setLoading(true);

    try {
      const currentPage = reset ? 1 : pageRef.current;

      if (reset) {
        pageRef.current = 1;
        resetPaginacion();
      }

      const { data } = await comercioPublicApi.getByFiltros(
        estadoId,
        municipioId,
        idTipoComercio,
        orden,
        currentPage,
        8,
        search,
      );
      if (reqId !== requestSeqRef.current) return;

      if (data.codigo !== "200") {
        Swal.fire("Error", data.mensaje, "error");
        return;
      }

      const items = data.respuesta.items || [];
      const total = data.respuesta.total;

      pageRef.current = currentPage + 1;
      setComercios(prev => (reset ? items : [...prev, ...items]));
      setHasMore(currentPage * 8 < total);
    } catch {
      if (reqId !== requestSeqRef.current) return;
      Swal.fire("Error", "No se pudieron cargar los comercios", "error");
    } finally {
      if (reqId === requestSeqRef.current) setLoading(false);
    }
  }, [resetPaginacion]);

  useEffect(() => {
    if (!autoLoad) return;
    void cargarPopulares();
  }, [autoLoad, cargarPopulares]);

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

