import { Alert, Button, Skeleton } from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import Swal from "sweetalert2";

import CheckoutComercioCard from "./CheckoutComercioCard";
import CheckoutResumen from "./CheckoutResumen";
import CheckoutExito from "./CheckoutExito";
import {
  MetodoPagoPedido,
  TipoEntregaPedido,
  type CheckoutComercioForm,
  type CheckoutResponseDto,
  type ConfirmarCheckoutDto,
  type ConfirmarCheckoutResponseDto,
  type ComprobanteTransferenciaResponseDto,
} from "../../../types/checkout";
import type { DireccionUsuarioDto } from "../../../services/direccionesUsuarioApi";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  checkout: CheckoutResponseDto | null;

  direcciones: DireccionUsuarioDto[];

  loading: boolean;

  confirmando: boolean;

  error: string | null;

  resultado: ConfirmarCheckoutResponseDto | null;

  clearError: () => void;

  onConfirmar: (
    dto: ConfirmarCheckoutDto,
  ) => Promise<ConfirmarCheckoutResponseDto | null>;

  onSubirComprobante: (
    pedidoUuid: string,
    archivo: File,
  ) => Promise<ComprobanteTransferenciaResponseDto | null>;

  subiendoComprobante: Record<string, boolean>;

  erroresComprobante: Record<string, string | null>;
}

export default function CheckoutUsuario({
  checkout,
  direcciones,

  loading,
  confirmando,

  error,

  resultado,

  clearError,

  onConfirmar,
  onSubirComprobante,
  subiendoComprobante,
  erroresComprobante,
}: Props) {
  const [forms, setForms] = useState<Record<string, CheckoutComercioForm>>({});

  /* ==========================================
     CREAR ESTADO INICIAL
  ========================================== */

  useEffect(() => {
    if (!checkout) {
      return;
    }

    const direccionPredeterminada =
      direcciones.find((x) => x.activo && x.esPredeterminada) ??
      direcciones.find((x) => x.activo);

    const nuevos: Record<string, CheckoutComercioForm> = {};

    checkout.comercios.forEach((comercio) => {
      let tipoEntrega: TipoEntregaPedido = TipoEntregaPedido.Recoger;

      if (comercio.permiteDomicilio) {
        tipoEntrega = TipoEntregaPedido.Domicilio;
      } else if (comercio.permiteRecoger) {
        tipoEntrega = TipoEntregaPedido.Recoger;
      }

      let metodoPago: MetodoPagoPedido = MetodoPagoPedido.Efectivo;

      if (!comercio.aceptaEfectivo && comercio.aceptaTransferencia) {
        metodoPago = MetodoPagoPedido.Transferencia;
      }

      nuevos[comercio.comercioUuid] = {
        comercioUuid: comercio.comercioUuid,

        tipoEntrega,

        metodoPago,

        direccionUuid:
          tipoEntrega === TipoEntregaPedido.Domicilio
            ? (direccionPredeterminada?.uuid ?? null)
            : null,

        observaciones: "",
      };
    });

    setForms(nuevos);
  }, [checkout, direcciones]);

  /* ==========================================
     CAMBIAR COMERCIO
  ========================================== */

  const handleChange = (
    comercioUuid: string,

    changes: Partial<CheckoutComercioForm>,
  ) => {
    setForms((current) => ({
      ...current,

      [comercioUuid]: {
        ...current[comercioUuid],

        ...changes,
      },
    }));
  };

  /* ==========================================
     VALIDAR
  ========================================== */

  const checkoutValido = useMemo(() => {
    if (!checkout) {
      return false;
    }

    return checkout.comercios.every((comercio) => {
      const form = forms[comercio.comercioUuid];

      if (!form) {
        return false;
      }

      if (
        form.tipoEntrega === TipoEntregaPedido.Domicilio &&
        !form.direccionUuid
      ) {
        return false;
      }

      if (
        form.metodoPago === MetodoPagoPedido.Efectivo &&
        !comercio.aceptaEfectivo
      ) {
        return false;
      }

      if (
        form.metodoPago === MetodoPagoPedido.Transferencia &&
        !comercio.aceptaTransferencia
      ) {
        return false;
      }

      return true;
    });
  }, [checkout, forms]);

  /* ==========================================
     CONFIRMAR
  ========================================== */

  const confirmar = async () => {
    if (!checkout || !checkoutValido) {
      await Swal.fire(
        "Checkout incompleto",
        "Revisa la entrega, dirección y método de pago de cada comercio.",
        "warning",
      );

      return;
    }

    const confirmacion = await Swal.fire({
      title: "Confirmar pedido",

      text:
        checkout.comercios.length > 1
          ? `Se crearán ${checkout.comercios.length} pedidos independientes, uno por comercio.`
          : "Tu pedido será enviado al comercio para su aprobación.",

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Sí, confirmar",

      cancelButtonText: "Regresar",

      reverseButtons: true,
    });

    if (!confirmacion.isConfirmed) {
      return;
    }

    const dto: ConfirmarCheckoutDto = {
      comercios: checkout.comercios.map((comercio) => {
        const form = forms[comercio.comercioUuid];

        return {
          comercioUuid: comercio.comercioUuid,

          tipoEntrega: form.tipoEntrega,

          metodoPago: form.metodoPago,

          direccionUuid:
            form.tipoEntrega === TipoEntregaPedido.Domicilio
              ? form.direccionUuid
              : null,

          observaciones: form.observaciones.trim() || null,
        };
      }),
    };

    await onConfirmar(dto);
  };

  /* ==========================================
     RESULTADO
  ========================================== */

  if (resultado) {
    return (
      <CheckoutExito
        resultado={resultado}
        onSubirComprobante={onSubirComprobante}
        subiendoComprobante={subiendoComprobante}
        erroresComprobante={erroresComprobante}
      />
    );
  }

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {
    return (
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <Skeleton variant="rounded" height={380} />

            <Skeleton variant="rounded" height={320} className="mt-4" />
          </div>

          <div className="col-12 col-lg-4">
            <Skeleton variant="rounded" height={300} />
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================
     SIN CHECKOUT
  ========================================== */

  if (!checkout) {
    return (
      <div className="container py-5">
        <div className="checkoutEmptyState text-center p-4 p-md-5">
          <div className="checkoutEmptyIcon d-flex align-items-center justify-content-center mx-auto">
            <MaterialSymbol icon="shopping_cart_off" size="large" />
          </div>

          <h1 className="fz-h2 fw-bold mt-3 mb-2">
            No hay productos para procesar
          </h1>

          <p className="checkoutMutedText fz-h4 fw-regular mb-4">
            Agrega productos a tu carrito antes de continuar con el checkout.
          </p>

          <Button
            type="button"
            className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Explorar comercios
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkoutPage">
      <div className="container py-4 py-lg-5">
        {/* HEADER */}

        <div className="row g-3 align-items-end mb-4">
          <div className="col">
            <span className="checkoutEyebrow fz-h5 fw-bold">
              Finalizar compra
            </span>

            <h1 className="checkoutTitle fw-bold mb-1">Checkout</h1>

            <p className="checkoutMutedText fz-h4 fw-regular mb-0">
              Configura la entrega y el método de pago de cada comercio.
            </p>
          </div>

          <div className="col-12 col-sm-auto">
            <Button
              type="button"
              className="btn-adlocal fz-h4 fw-medium"
              onClick={() => {
                window.location.href = "/usuario/carrito";
              }}
            >
              <MaterialSymbol icon="arrow_back" size="small" />

              <span className="ms-2">Volver al carrito</span>
            </Button>
          </div>
        </div>

        {error && (
          <Alert severity="error" className="mb-4" onClose={clearError}>
            {error}
          </Alert>
        )}

        <div className="row g-4">
          {/* COMERCIOS */}

          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-4">
              {checkout.comercios.map((comercio) => {
                const form = forms[comercio.comercioUuid];

                if (!form) {
                  return null;
                }

                return (
                  <CheckoutComercioCard
                    key={comercio.comercioUuid}
                    comercio={comercio}
                    form={form}
                    direcciones={direcciones}
                    onChange={handleChange}
                  />
                );
              })}
            </div>
          </div>

          {/* RESUMEN */}

          <div className="col-12 col-lg-4">
            <div className="checkoutSummarySticky">
              <CheckoutResumen
                checkout={checkout}
                forms={forms}
                loading={confirmando}
                disabled={!checkoutValido}
                onConfirmar={confirmar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
