import { Button } from "@mui/material";

import Swal from "sweetalert2";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";
import type { CuentaTransferenciaCheckoutDto } from "../../../types/checkout";

interface Props {
  cuenta: CuentaTransferenciaCheckoutDto;

  instrucciones?: string | null;
}

export default function CheckoutTransferencia({
  cuenta,
  instrucciones,
}: Props) {
  const copiar = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);

      await Swal.fire({
        icon: "success",

        title: `${label} copiada`,

        timer: 900,

        timerProgressBar: true,

        showConfirmButton: false,
      });
    } catch {
      await Swal.fire(
        "Error",
        `No se pudo copiar ${label.toLowerCase()}.`,
        "error",
      );
    }
  };

  return (
    <div className="checkoutTransferCard p-3">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="checkoutTransferIcon d-flex align-items-center justify-content-center flex-shrink-0">
          <MaterialSymbol icon="account_balance" size="medium" />
        </div>

        <div>
          <strong className="fz-h4 fw-semibold d-block">
            Datos para transferencia
          </strong>

          <span className="checkoutMutedText fz-h5 fw-regular">
            Realiza el pago utilizando alguno de estos datos.
          </span>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <span className="checkoutFieldLabel fz-h6 fw-medium d-block">
            Banco
          </span>

          <strong className="fz-h4 fw-semibold d-block mt-1">
            {cuenta.banco}
          </strong>
        </div>

        <div className="col-12 col-md-6">
          <span className="checkoutFieldLabel fz-h6 fw-medium d-block">
            Beneficiario
          </span>

          <strong className="fz-h4 fw-semibold d-block mt-1">
            {cuenta.beneficiario}
          </strong>
        </div>

        {cuenta.clabe && (
          <div className="col-12">
            <div className="checkoutBankValue p-2 p-md-3">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <span className="checkoutFieldLabel fz-h6 fw-medium d-block">
                    CLABE
                  </span>

                  <strong className="fz-h4 fw-semibold d-block mt-1">
                    {cuenta.clabe}
                  </strong>
                </div>

                <div className="col-auto">
                  <Button
                    type="button"
                    className="btn-adlocal btn-adlocal--sm"
                    onClick={() => copiar(cuenta.clabe!, "CLABE")}
                  >
                    <MaterialSymbol icon="content_copy" size="small" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {cuenta.numeroCuenta && (
          <div className="col-12 col-md-6">
            <div className="checkoutBankValue p-2">
              <span className="checkoutFieldLabel fz-h6 fw-medium d-block">
                Número de cuenta
              </span>

              <strong className="fz-h5 fw-semibold d-block mt-1">
                {cuenta.numeroCuenta}
              </strong>
            </div>
          </div>
        )}

        {cuenta.numeroTarjeta && (
          <div className="col-12 col-md-6">
            <div className="checkoutBankValue p-2">
              <span className="checkoutFieldLabel fz-h6 fw-medium d-block">
                Tarjeta
              </span>

              <strong className="fz-h5 fw-semibold d-block mt-1">
                {cuenta.numeroTarjeta}
              </strong>
            </div>
          </div>
        )}

        {instrucciones && (
          <div className="col-12">
            <div className="checkoutTransferInstructions p-3">
              <div className="d-flex align-items-start gap-2">
                <MaterialSymbol icon="info" size="small" />

                <span className="fz-h5 fw-regular">{instrucciones}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
