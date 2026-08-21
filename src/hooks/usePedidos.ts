import { useCallback, useEffect, useState } from "react";
import { pedidosApi } from "../services/pedidosApi";
import type { EstadoPagoPedido } from "../types/checkout";
import type {
  PagedResponse,
  PedidoClienteDetalleDto,
  PedidoClienteListadoDto,
} from "../types/pedidos";

const paginaVacia: PagedResponse<PedidoClienteListadoDto> = {
  page: 1,
  pageSize: 10,
  totalPages: 0,
  totalItems: 0,
  items: [],
};

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState(paginaVacia);
  const [detalle, setDetalle] = useState<PedidoClienteDetalleDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetalle, setLoadingDetalle] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorComprobante, setErrorComprobante] = useState<string | null>(null);
  const [pagina, setPagina] = useState(1);
  const [filtroPago, setFiltroPago] = useState<EstadoPagoPedido | null>(null);

  const cargarPedidos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await pedidosApi.obtenerTodos(pagina, 10, filtroPago);

      if (data.codigo !== "200") {
        setError(data.mensaje || "No fue posible cargar los pedidos.");
        return;
      }

      setPedidos(data.respuesta);
    } catch (error: any) {
      setError(
        error?.response?.data?.mensaje ||
          error?.message ||
          "No fue posible cargar los pedidos.",
      );
    } finally {
      setLoading(false);
    }
  }, [pagina, filtroPago]);

  const seleccionarPedido = useCallback(async (pedidoUuid: string) => {
    setLoadingDetalle(true);
    setError(null);

    try {
      const { data } = await pedidosApi.obtenerDetalle(pedidoUuid);

      if (data.codigo !== "200") {
        setError(data.mensaje || "No fue posible cargar el pedido.");
        return;
      }

      setDetalle(data.respuesta);
      setErrorComprobante(null);
    } catch (error: any) {
      setError(
        error?.response?.data?.mensaje ||
          error?.message ||
          "No fue posible cargar el pedido.",
      );
    } finally {
      setLoadingDetalle(false);
    }
  }, []);

  const subirComprobante = useCallback(
    async (pedidoUuid: string, archivo: File) => {
      setSubiendo(true);
      setErrorComprobante(null);

      try {
        const { data } = await pedidosApi.subirComprobante(pedidoUuid, archivo);

        if (data.codigo !== "200") {
          setErrorComprobante(
            data.mensaje || "No fue posible subir el comprobante.",
          );
          return null;
        }

        await Promise.all([cargarPedidos(), seleccionarPedido(pedidoUuid)]);
        return data.respuesta;
      } catch (error: any) {
        setErrorComprobante(
          error?.response?.data?.mensaje ||
            error?.message ||
            "No fue posible subir el comprobante.",
        );
        return null;
      } finally {
        setSubiendo(false);
      }
    },
    [cargarPedidos, seleccionarPedido],
  );

  const cambiarFiltro = useCallback((estado: EstadoPagoPedido | null) => {
    setPagina(1);
    setFiltroPago(estado);
    setDetalle(null);
  }, []);

  useEffect(() => {
    void cargarPedidos();
  }, [cargarPedidos]);

  return {
    pedidos,
    detalle,
    loading,
    loadingDetalle,
    subiendo,
    error,
    errorComprobante,
    pagina,
    filtroPago,
    setPagina,
    cambiarFiltro,
    seleccionarPedido,
    subirComprobante,
  };
};
