import { useCallback, useEffect, useMemo, useState } from "react";

import {
  carritoApi,
  type AgregarProductoCarritoDto,
  type CarritoDto,
} from "../services/carritoApi";

import { getUsuarioSesion } from "../utils/usuarioSesion";

export const useCarrito = () => {
  const [carrito, setCarrito] = useState<CarritoDto | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // PRODUCTOS DE TODOS LOS COMERCIOS
  // ==========================================

  const productos = useMemo(() => {
    if (!carrito) {
      return [];
    }

    return carrito.comercios.flatMap((comercio) => comercio.productos);
  }, [carrito]);

  // ==========================================
  // CARGAR CARRITO
  // ==========================================

  const cargarCarrito = useCallback(async () => {
    /*
     * El detalle del comercio es público.
     * No debemos consultar el carrito
     * si el visitante no inició sesión.
     */
    const usuario = getUsuarioSesion();

    if (!usuario) {
      setCarrito(null);
      setError(null);

      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await carritoApi.obtener();

      if (data.codigo !== "200") {
        setError(data.mensaje || "No fue posible cargar el carrito");

        setCarrito(null);

        return null;
      }

      const respuesta = data.respuesta as CarritoDto | null;

      if (!respuesta || !respuesta.uuid) {
        setCarrito(null);

        return null;
      }

      setCarrito(respuesta);

      return respuesta;
    } catch (err: any) {
      const mensaje =
        err?.response?.data?.mensaje ||
        err?.message ||
        "No fue posible cargar el carrito";

      setError(mensaje);

      setCarrito(null);

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // AGREGAR
  // ==========================================

  const agregarProducto = useCallback(
    async (dto: AgregarProductoCarritoDto) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await carritoApi.agregar(dto);

        if (data.codigo !== "200") {
          setError(data.mensaje || "No fue posible agregar el producto");

          return false;
        }

        await cargarCarrito();

        return true;
      } catch (err: any) {
        const mensaje =
          err?.response?.data?.mensaje ||
          err?.message ||
          "No fue posible agregar el producto";

        setError(mensaje);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [cargarCarrito],
  );

  // ==========================================
  // ACTUALIZAR CANTIDAD
  // ==========================================

  const actualizarCantidad = useCallback(
    async (detalleUuid: string, cantidad: number) => {
      if (cantidad <= 0) {
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const { data } = await carritoApi.actualizarCantidad({
          detalleUuid,
          cantidad,
        });

        if (data.codigo !== "200") {
          setError(data.mensaje || "No fue posible actualizar la cantidad");

          return false;
        }

        await cargarCarrito();

        return true;
      } catch (err: any) {
        const mensaje =
          err?.response?.data?.mensaje ||
          err?.message ||
          "No fue posible actualizar la cantidad";

        setError(mensaje);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [cargarCarrito],
  );

  // ==========================================
  // ELIMINAR PRODUCTO
  // ==========================================

  const eliminarProducto = useCallback(
    async (detalleUuid: string) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await carritoApi.eliminarProducto(detalleUuid);

        if (data.codigo !== "200") {
          setError(data.mensaje || "No fue posible eliminar el producto");

          return false;
        }

        await cargarCarrito();

        return true;
      } catch (err: any) {
        const mensaje =
          err?.response?.data?.mensaje ||
          err?.message ||
          "No fue posible eliminar el producto";

        setError(mensaje);

        return false;
      } finally {
        setLoading(false);
      }
    },
    [cargarCarrito],
  );

  // ==========================================
  // VACIAR
  // ==========================================

  const vaciarCarrito = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await carritoApi.vaciar();

      if (data.codigo !== "200") {
        setError(data.mensaje || "No fue posible vaciar el carrito");

        return false;
      }

      setCarrito(null);

      return true;
    } catch (err: any) {
      const mensaje =
        err?.response?.data?.mensaje ||
        err?.message ||
        "No fue posible vaciar el carrito";

      setError(mensaje);

      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // INCREMENTAR
  // ==========================================

  const incrementarCantidad = useCallback(
    async (detalleUuid: string) => {
      const producto = productos.find((x) => x.uuid === detalleUuid);

      if (!producto) {
        return false;
      }

      /*
       * Validación rápida del lado
       * del frontend.
       *
       * El backend también valida.
       */
      if (
        producto.manejaStock &&
        producto.stock !== null &&
        producto.stock !== undefined &&
        producto.cantidad >= producto.stock
      ) {
        setError(
          `Solo hay ${producto.stock} unidades disponibles de ${producto.nombre}.`,
        );

        return false;
      }

      return await actualizarCantidad(detalleUuid, producto.cantidad + 1);
    },
    [productos, actualizarCantidad],
  );

  // ==========================================
  // DISMINUIR
  // ==========================================

  const disminuirCantidad = useCallback(
    async (detalleUuid: string) => {
      const producto = productos.find((x) => x.uuid === detalleUuid);

      if (!producto) {
        return false;
      }

      /*
       * Si llega a 1,
       * eliminamos el producto.
       */
      if (producto.cantidad <= 1) {
        return await eliminarProducto(detalleUuid);
      }

      return await actualizarCantidad(detalleUuid, producto.cantidad - 1);
    },
    [productos, actualizarCantidad, eliminarProducto],
  );

  // ==========================================
  // BUSCAR POR PRODUCTO UUID
  // ==========================================

  const obtenerProductoCarrito = useCallback(
    (productoUuid: string) => {
      return (
        productos.find((producto) => producto.productoUuid === productoUuid) ??
        null
      );
    },
    [productos],
  );

  // ==========================================
  // LIMPIAR ERROR
  // ==========================================

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // ==========================================
  // CARGA INICIAL
  // ==========================================

  useEffect(() => {
    const usuario = getUsuarioSesion();

    if (!usuario) {
      setCarrito(null);

      return;
    }

    void cargarCarrito();
  }, [cargarCarrito]);

  return {
    carrito,

    // Agrupado por comercio
    comercios: carrito?.comercios ?? [],

    // Lista plana
    productos,

    subtotal: carrito?.subtotal ?? 0,

    totalProductos: carrito?.totalProductos ?? 0,

    totalComercios: carrito?.totalComercios ?? 0,

    tieneProductos: productos.length > 0,

    loading,

    error,

    cargarCarrito,

    agregarProducto,

    actualizarCantidad,

    incrementarCantidad,

    disminuirCantidad,

    eliminarProducto,

    vaciarCarrito,

    obtenerProductoCarrito,

    clearError,
  };
};
