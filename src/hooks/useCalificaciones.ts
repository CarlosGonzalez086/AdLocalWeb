import { useState, useEffect, useCallback } from "react";
import Swal from "../utils/sweetalert";
import {
  calificacionesApi,
  type CalificacionComentarioCreateDto,
  type CalificacionComentarioDto,
  type CalificacionComentarioListResponse,
} from "../services/calificaciones.Api";

export const useCalificaciones = (idComercio: number) => {
  const [comentarios, setComentarios] = useState<CalificacionComentarioDto[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc");
  const [totalRecords, setTotalRecords] = useState(0);

  const cargarComentarios = useCallback(
    async (
      pageParam: number = page,
      orderParam: "asc" | "desc" = orderBy,
    ) => {
      setLoading(true);
      try {
        const { data } = await calificacionesApi.obtenerTodos(
          idComercio,
          pageParam,
          pageSize,
          orderParam,
        );

        if (data.codigo !== "200") {
          Swal.fire("Error", data.mensaje, "error");
          setComentarios([]);
          return;
        }

        const respuesta = data.respuesta as CalificacionComentarioListResponse;
        setComentarios(respuesta.data || []);
        setTotalRecords(respuesta.totalRecords || 0);
        setPage(respuesta.page || 1);
        setOrderBy(orderParam);
      } catch {
        Swal.fire("Error", "No se pudieron cargar los comentarios", "error");
        setComentarios([]);
      } finally {
        setLoading(false);
      }
    },
    [idComercio, page, pageSize, orderBy],
  );

  const crearComentario = async (dto: CalificacionComentarioCreateDto) => {
    setLoading(true);
    try {
      const { data } = await calificacionesApi.crear(dto);
      if (data.codigo !== "200") {
        Swal.fire("Error", data.mensaje, "error");
        return null;
      }
      Swal.fire("Éxito", "Comentario enviado correctamente", "success");
      cargarComentarios(1, orderBy);
      return data.respuesta as CalificacionComentarioDto;
    } catch {
      Swal.fire("Error", "No se pudo enviar el comentario", "error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cambiarOrden = (nuevoOrden: "asc" | "desc") => {
    setOrderBy(nuevoOrden);
    cargarComentarios(1, nuevoOrden);
  };

  const cambiarPagina = (nuevaPagina: number) => {
    setPage(nuevaPagina);
    cargarComentarios(nuevaPagina, orderBy);
  };

  useEffect(() => {
    if (idComercio) {
      void cargarComentarios();
    }
  }, [idComercio, cargarComentarios]);

  return {
    comentarios,
    loading,
    totalRecords,
    page,
    pageSize,
    orderBy,
    cargarComentarios,
    crearComentario,
    cambiarOrden,
    cambiarPagina,
  };
};
