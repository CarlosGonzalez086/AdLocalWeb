import { Alert, Button } from "@mui/material";
import {
  EstadoPagoPedido,
  MetodoPagoPedido,
  type ComprobanteTransferenciaResponseDto,
  type ConfirmarCheckoutResponseDto,
} from "../../../types/checkout";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";
import ComprobanteTransferenciaUploader from "./ComprobanteTransferenciaUploader";

interface Props {
  resultado: ConfirmarCheckoutResponseDto;

  onSubirComprobante: (
    pedidoUuid: string,
    archivo: File,
  ) => Promise<ComprobanteTransferenciaResponseDto | null>;

  subiendoComprobante: Record<string, boolean>;

  erroresComprobante: Record<string, string | null>;
}

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",

  currency: "MXN",

  minimumFractionDigits: 2,

  maximumFractionDigits: 2,
});

export default function CheckoutExito({
  resultado,
  onSubirComprobante,
  subiendoComprobante,
  erroresComprobante,
}: Props) {
  const transferenciasPendientes = resultado.pedidos.filter(
    (pedido) =>
      pedido.metodoPago === MetodoPagoPedido.Transferencia &&
      pedido.estadoPago === EstadoPagoPedido.PendienteComprobante,
  ).length;

  return (
    <div className="checkoutSuccessContainer py-4 py-md-5">
      <div className="checkoutSuccessCard p-4 p-md-5">
        <div className="text-center">
          <div className="checkoutSuccessIcon d-flex align-items-center justify-content-center mx-auto">
            <MaterialSymbol icon="check" size="large" />
          </div>

          <h1 className="fz-h2 fw-bold mt-3 mb-2">Pedido confirmado</h1>

          <p className="checkoutMutedText fz-h4 fw-regular mb-0">
            {transferenciasPendientes > 0
              ? "Tus pedidos fueron creados. Adjunta los comprobantes de las transferencias para enviarlos a verificación."
              : resultado.totalPedidos === 1
                ? "Tu pedido fue enviado al comercio."
                : `Se crearon ${resultado.totalPedidos} pedidos para los comercios de tu carrito.`}
          </p>
        </div>

        <div className="row g-3 mt-3">
          {resultado.pedidos.map((pedido) => (
            <div key={pedido.uuid} className="col-12">
              <div className="checkoutSuccessOrder p-3">
                <div className="row g-2 align-items-center">
                  <div className="col">
                    <span className="checkoutCommerceLabel fz-h6 fw-semibold d-block">
                      {pedido.numeroPedido}
                    </span>

                    <strong className="fz-h4 fw-semibold d-block mt-1">
                      {pedido.comercio}
                    </strong>
                  </div>

                  <div className="col-auto">
                    <strong className="fz-h4 fw-bold">
                      {moneyFormatter.format(pedido.total)}
                    </strong>
                  </div>
                </div>

                {pedido.metodoPago === MetodoPagoPedido.Transferencia &&
                  pedido.estadoPago ===
                    EstadoPagoPedido.PendienteComprobante && (
                    <ComprobanteTransferenciaUploader
                      pedidoUuid={pedido.uuid}
                      loading={Boolean(subiendoComprobante[pedido.uuid])}
                      error={erroresComprobante[pedido.uuid]}
                      onSubir={onSubirComprobante}
                    />
                  )}

                {pedido.metodoPago === MetodoPagoPedido.Transferencia &&
                  pedido.estadoPago ===
                    EstadoPagoPedido.PendienteVerificacion && (
                    <Alert severity="success" className="mt-3">
                      Comprobante recibido. El comercio verificará tu pago.
                    </Alert>
                  )}
              </div>
            </div>
          ))}
        </div>

        <div className="row g-2 mt-4">
          <div className="col-12 col-sm-6">
            <Button
              type="button"
              fullWidth
              className="btn-adlocal fz-h4 fw-semibold"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Seguir comprando
            </Button>
          </div>

          <div className="col-12 col-sm-6">
            <Button
              type="button"
              fullWidth
              className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
              onClick={() => {
                window.location.href = "/usuario/pedidos";
              }}
            >
              <MaterialSymbol icon="receipt_long" size="small" />

              <span className="ms-2">Ver mis pedidos</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
