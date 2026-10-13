import { useCallback, useRef, useState } from "react";
import { extraerMensajeError } from "../utils/errorHandler";
import {
  CheckoutOperacion,
  cuentaCheckout,
  MENSAJE_CHECKOUT_INCIERTO,
} from "../utils/checkoutOperacion";
import { checkoutApi } from "../services/checkoutApi";
import { pedidosApi } from "../services/pedidosApi";

import type {
  CheckoutResponseDto,
  ConfirmarCheckoutDto,
  ConfirmarCheckoutResponseDto,
  ComprobanteTransferenciaResponseDto,
} from "../types/checkout";

export const useCheckout = () => {
  const operacionRef = useRef<{
    cuenta: string;
    operacion: CheckoutOperacion;
  } | null>(null);
  const [pendiente, setPendiente] = useState(false);
  const obtenerOperacion = useCallback(() => {
    const cuenta = cuentaCheckout();
    if (operacionRef.current?.cuenta !== cuenta)
      operacionRef.current = {
        cuenta,
        operacion: new CheckoutOperacion(window.localStorage, cuenta),
      };
    return operacionRef.current.operacion;
  }, []);

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
      const guardada = obtenerOperacion().pendiente();
      setPendiente(!!guardada);
      if (guardada) setError(MENSAJE_CHECKOUT_INCIERTO);
      const { data } = await checkoutApi.obtener();

      if (data.codigo !== "200") {
        const mensaje = data.mensaje || "No fue posible cargar el checkout.";
        if (!guardada) setError(mensaje);
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
  }, [obtenerOperacion]);

  /* ==========================================
     CONFIRMAR
  ========================================== */

  const enviarOperacion = useCallback(
    async (dto?: ConfirmarCheckoutDto) => {
      let operacion: CheckoutOperacion;
      try {
        operacion = obtenerOperacion();
      } catch (err) {
        setError(extraerMensajeError(err));
        return null;
      }
      return operacion.ejecutar(async () => {
        setConfirmando(true);
        setError(null);
        let enviada = false;
        try {
          const payload = dto ? operacion.preparar(dto) : operacion.pendiente();
          if (!payload) return null;
          setPendiente(true);
          enviada = true;
          const { data } = await checkoutApi.confirmar(payload);
          if (data.codigo !== "200") {
            // Solo una validación rechazada permite editar y crear una nueva operación.
            if (data.codigo === "400") {
              operacion.completar();
              setPendiente(false);
            }
            const mensaje =
              data.codigo === "400" ? data.mensaje : MENSAJE_CHECKOUT_INCIERTO;
            setError(mensaje);
            return null;
          }
          if (!data.respuesta || !Array.isArray(data.respuesta.pedidos))
            throw new Error("El servidor devolvió un resultado incompleto.");
          setResultado(data.respuesta);
          operacion.completar();
          setPendiente(false);
          return data.respuesta;
        } catch (err: unknown) {
          const response = (
            err as {
              response?: { status?: number; data?: { codigo?: string } };
            }
          ).response;
          if (
            enviada &&
            response?.status === 400 &&
            response.data?.codigo === "400"
          ) {
            operacion.completar();
            setPendiente(false);
            setError(extraerMensajeError(err));
          } else {
            setError(
              enviada ? MENSAJE_CHECKOUT_INCIERTO : extraerMensajeError(err),
            );
          }
          return null;
        } finally {
          setConfirmando(false);
        }
      });
    },
    [obtenerOperacion],
  );

  const confirmarCheckout = useCallback(
    (dto: ConfirmarCheckoutDto) => enviarOperacion(dto),
    [enviarOperacion],
  );
  const recuperarCheckout = useCallback(
    () => enviarOperacion(),
    [enviarOperacion],
  );
  const cerrarComprobacion = useCallback(async () => {
    try {
      obtenerOperacion().completar();
      setPendiente(false);
      await cargarCheckout();
    } catch (err) {
      setError(extraerMensajeError(err));
    }
  }, [obtenerOperacion, cargarCheckout]);

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
        const { data } = await pedidosApi.subirComprobante(pedidoUuid, archivo);

        if (data.codigo !== "200") {
          const mensaje =
            data.mensaje || "No fue posible subir el comprobante.";

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
    pendiente,
    recuperarCheckout,
    cerrarComprobacion,
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
