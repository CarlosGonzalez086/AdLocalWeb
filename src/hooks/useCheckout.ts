import { useCallback, useState } from "react";
import { showErrorAlert, notificarErrorApi } from "../utils/sweetalert";
import { extraerMensajeError } from "../utils/errorHandler";
import { checkoutApi } from "../services/checkoutApi";
import { pedidosApi } from "../services/pedidosApi";

import type {
  CheckoutResponseDto,
  ConfirmarCheckoutDto,
  ConfirmarCheckoutResponseDto,
  ComprobanteTransferenciaResponseDto,
} from "../types/checkout";

export const useCheckout = () => {
  const [checkout, setCheckout] = useState<CheckoutResponseDto | null>(null);

  const [resultado, setResultado] =
    useState<ConfirmarCheckoutResponseDto | null>(null);

  const [loading, setLoading] = useState(false);

  const [confirmando, setConfirmando] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [subiendoComprobante, setSubiendoComprobante] = useState<
    Record<string, boolean>
  >({});

  const [erroresComprobante, setErroresComprobante] = useState<
    Record<string, string | null>
  >({});

  /* ==========================================
     OBTENER CHECKOUT
  ========================================== */

  const cargarCheckout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await checkoutApi.obtener();

      if (data.codigo !== "200") {
        const mensaje = data.mensaje || "No fue posible cargar el checkout.";
        setError(mensaje);
        setCheckout(null);
        return null;
      }

      setCheckout(data.respuesta);
      return data.respuesta;
    } catch (err: unknown) {
      const mensaje = extraerMensajeError(
        err,
        "No fue posible cargar el checkout.",
      );

      setError(mensaje);
      setCheckout(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /* ==========================================
     CONFIRMAR
  ========================================== */

  const confirmarCheckout = useCallback(async (dto: ConfirmarCheckoutDto) => {
    setConfirmando(true);
    setError(null);

    try {
      const { data } = await checkoutApi.confirmar(dto);

      if (data.codigo !== "200") {
        const mensaje = data.mensaje || "No fue posible crear el pedido.";
        setError(mensaje);
        await showErrorAlert("No se pudo confirmar", mensaje);
        return null;
      }

      setResultado(data.respuesta);
      return data.respuesta;
    } catch (err: unknown) {
      const mensaje = extraerMensajeError(
        err,
        "No fue posible confirmar el pedido.",
      );

      setError(mensaje);
      await notificarErrorApi(err, "No fue posible confirmar el pedido.");
      return null;
    } finally {
      setConfirmando(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const subirComprobante = useCallback(
    async (
      pedidoUuid: string,
      archivo: File,
    ): Promise<ComprobanteTransferenciaResponseDto | null> => {
      setSubiendoComprobante((actual) => ({
        ...actual,
        [pedidoUuid]: true,
      }));

      setErroresComprobante((actual) => ({
        ...actual,
        [pedidoUuid]: null,
      }));

      try {
        const { data } = await pedidosApi.subirComprobante(
          pedidoUuid,
          archivo,
        );

        if (data.codigo !== "200") {
          const mensaje = data.mensaje || "No fue posible subir el comprobante.";

          setErroresComprobante((actual) => ({
            ...actual,
            [pedidoUuid]: mensaje,
          }));

          return null;
        }

        setResultado((actual) =>
          actual
            ? {
                ...actual,
                pedidos: actual.pedidos.map((pedido) =>
                  pedido.uuid === pedidoUuid
                    ? { ...pedido, estadoPago: data.respuesta.estadoPago }
                    : pedido,
                ),
              }
            : actual,
        );

        return data.respuesta;
      } catch (err: unknown) {
        const mensaje = extraerMensajeError(
          err,
          "No fue posible subir el comprobante.",
        );

        setErroresComprobante((actual) => ({
          ...actual,
          [pedidoUuid]: mensaje,
        }));

        return null;
      } finally {
        setSubiendoComprobante((actual) => ({
          ...actual,
          [pedidoUuid]: false,
        }));
      }
    },
    [],
  );

  return {
    checkout,
    resultado,
    loading,
    confirmando,
    error,
    cargarCheckout,
    confirmarCheckout,
    clearError,
    subirComprobante,
    subiendoComprobante,
    erroresComprobante,
  };
};
