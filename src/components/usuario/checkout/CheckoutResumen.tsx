import { Button } from "@mui/material";
import {
  TipoEntregaPedido,
  type CheckoutComercioForm,
  type CheckoutResponseDto,
} from "../../../types/checkout";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  checkout: CheckoutResponseDto;
  forms: Record<string, CheckoutComercioForm>;

  loading: boolean;

  disabled: boolean;

  onConfirmar: () => void;
}

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",

  currency: "MXN",

  minimumFractionDigits: 2,

  maximumFractionDigits: 2,
});

export default function CheckoutResumen({
  checkout,
  forms,
  loading,
  disabled,
  onConfirmar,
}: Props) {
  return (
    <div className="checkoutSummaryCard">
      <div className="p-3 p-md-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <MaterialSymbol icon="receipt_long" size="medium" />

          <h2 className="fz-h3 fw-bold mb-0">Resumen</h2>
        </div>

        <div className="d-flex flex-column gap-3">
          {checkout.comercios.map((comercio) => (
            <div key={comercio.comercioUuid}>
              <div className="d-flex justify-content-between gap-3">
                <span className="checkoutMutedText fz-h5 fw-medium">
                  {comercio.comercio}
                </span>
                <strong className="fz-h5 fw-semibold">
                  {moneyFormatter.format(comercio.subtotal)}
                </strong>
              </div>
              {forms[comercio.comercioUuid]?.tipoEntrega ===
                TipoEntregaPedido.Domicilio && (
                <div className="d-flex justify-content-between gap-3 mt-2">
                  <span className="checkoutMutedText fz-h6 fw-regular">
                    Envío
                  </span>
                  <strong className="fz-h6 fw-semibold">
                    {comercio.costoEnvio === 0
                      ? "Gratis"
                      : moneyFormatter.format(comercio.costoEnvio)}
                  </strong>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="checkoutSummaryDivider my-3" />

        <div className="d-flex justify-content-between align-items-center">
          <strong className="fz-h3 fw-bold">Total</strong>

          <strong className="checkoutSummaryTotal fz-h2 fw-bold">
            {moneyFormatter.format(
              checkout.comercios.reduce(
                (total, comercio) =>
                  total +
                  comercio.subtotal +
                  (forms[comercio.comercioUuid]?.tipoEntrega ===
                  TipoEntregaPedido.Domicilio
                    ? comercio.costoEnvio
                    : 0),
                0,
              ),
            )}
          </strong>
        </div>

        <div className="checkoutSummaryInfo d-flex gap-2 p-3 mt-4">
          <MaterialSymbol icon="info" size="small" />

          <span className="fz-h6 fw-regular">
            Cada comercio recibirá un pedido independiente y podrá aprobarlo o
            rechazarlo.
          </span>
        </div>

        <Button
          type="button"
          fullWidth
          disabled={loading || disabled}
          className="btn-adlocal btn-adlocal--solid fz-h3 fw-bold mt-4"
          onClick={onConfirmar}
        >
          {loading ? (
            <>
              <MaterialSymbol icon="progress_activity" size="small" />

              <span className="ms-2">Confirmando...</span>
            </>
          ) : (
            <>
              <MaterialSymbol icon="shopping_bag" size="small" />

              <span className="ms-2">Confirmar pedido</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
