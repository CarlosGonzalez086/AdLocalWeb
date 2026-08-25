import { Radio, TextField } from "@mui/material";

import CheckoutProducto from "./CheckoutProducto";
import CheckoutDireccionSelector from "./CheckoutDireccionSelector";
import CheckoutTransferencia from "./CheckoutTransferencia";
import {
  MetodoPagoPedido,
  TipoEntregaPedido,
  type CheckoutComercioForm,
  type CheckoutComercioResponseDto,
} from "../../../types/checkout";
import type { DireccionUsuarioDto } from "../../../services/direccionesUsuarioApi";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  comercio: CheckoutComercioResponseDto;

  form: CheckoutComercioForm;

  direcciones: DireccionUsuarioDto[];

  onChange: (
    comercioUuid: string,
    changes: Partial<CheckoutComercioForm>,
  ) => void;
}

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",

  currency: "MXN",

  minimumFractionDigits: 2,

  maximumFractionDigits: 2,
});

export default function CheckoutComercioCard({
  comercio,
  form,
  direcciones,
  onChange,
}: Props) {
  const initial = comercio.comercio?.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="checkoutCommerceCard">
      {/* HEADER */}

      <div className="p-3 p-md-4">
        <div className="row g-3 align-items-center">
          <div className="col">
            <div className="d-flex align-items-center gap-3">
              <div className="checkoutCommerceLogo d-flex align-items-center justify-content-center flex-shrink-0">
                {comercio.logoUrl ? (
                  <img src={comercio.logoUrl} alt={comercio.comercio} />
                ) : (
                  <span className="fz-h3 fw-bold">{initial}</span>
                )}
              </div>

              <div>
                <span className="checkoutCommerceLabel fz-h6 fw-semibold d-block">
                  Pedido en
                </span>

                <h2 className="fz-h3 fw-bold mb-0">{comercio.comercio}</h2>
              </div>
            </div>
          </div>

          <div className="col-auto text-end">
            <span className="checkoutCommerceLabel fz-h6 fw-semibold d-block">
              Subtotal
            </span>

            <strong className="checkoutCommerceTotal fz-h3 fw-bold">
              {moneyFormatter.format(comercio.subtotal)}
            </strong>
            {form.tipoEntrega === TipoEntregaPedido.Domicilio && (
              <span className="checkoutCommerceLabel fz-h6 fw-semibold d-block mt-1">
                Envío:{" "}
                {comercio.costoEnvio === 0
                  ? "Gratis"
                  : moneyFormatter.format(comercio.costoEnvio)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="checkoutCardDivider" />

      {/* PRODUCTOS */}

      <div className="p-3 p-md-4">
        <h3 className="fz-h4 fw-bold mb-3">Productos</h3>

        <div className="d-flex flex-column gap-2">
          {comercio.productos.map((producto) => (
            <CheckoutProducto key={producto.productoUuid} producto={producto} />
          ))}
        </div>
      </div>

      <div className="checkoutCardDivider" />

      {/* ENTREGA */}

      <div className="p-3 p-md-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <MaterialSymbol icon="local_shipping" size="small" />

          <h3 className="fz-h4 fw-bold mb-0">¿Cómo quieres recibirlo?</h3>
        </div>

        <div className="row g-3">
          {comercio.permiteDomicilio && (
            <div className="col-12 col-sm-6">
              <button
                type="button"
                className={`checkoutOptionCard w-100 text-start p-3 ${
                  form.tipoEntrega === TipoEntregaPedido.Domicilio
                    ? "checkoutOptionCardActive"
                    : ""
                }`}
                onClick={() =>
                  onChange(comercio.comercioUuid, {
                    tipoEntrega: TipoEntregaPedido.Domicilio,
                  })
                }
              >
                <div className="d-flex align-items-center gap-2">
                  <Radio
                    checked={form.tipoEntrega === TipoEntregaPedido.Domicilio}
                    tabIndex={-1}
                  />

                  <div>
                    <strong className="fz-h4 fw-semibold d-block">
                      A domicilio
                    </strong>

                    <span className="checkoutMutedText fz-h5 fw-regular d-block mt-1">
                      Recibe el pedido en una de tus direcciones.
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}

          {comercio.permiteRecoger && (
            <div className="col-12 col-sm-6">
              <button
                type="button"
                className={`checkoutOptionCard w-100 text-start p-3 ${
                  form.tipoEntrega === TipoEntregaPedido.Recoger
                    ? "checkoutOptionCardActive"
                    : ""
                }`}
                onClick={() =>
                  onChange(comercio.comercioUuid, {
                    tipoEntrega: TipoEntregaPedido.Recoger,

                    direccionUuid: null,
                  })
                }
              >
                <div className="d-flex align-items-center gap-2">
                  <Radio
                    checked={form.tipoEntrega === TipoEntregaPedido.Recoger}
                    tabIndex={-1}
                  />

                  <div>
                    <strong className="fz-h4 fw-semibold d-block">
                      Recoger
                    </strong>

                    <span className="checkoutMutedText fz-h5 fw-regular d-block mt-1">
                      Recoge tu pedido directamente en el comercio.
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {form.tipoEntrega === TipoEntregaPedido.Domicilio && (
          <div className="mt-4">
            <h4 className="fz-h4 fw-semibold mb-3">Dirección de entrega</h4>

            <CheckoutDireccionSelector
              direcciones={direcciones}
              value={form.direccionUuid}
              onChange={(uuid) =>
                onChange(comercio.comercioUuid, {
                  direccionUuid: uuid,
                })
              }
            />
          </div>
        )}
      </div>

      <div className="checkoutCardDivider" />

      {/* PAGO */}

      <div className="p-3 p-md-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <MaterialSymbol icon="payments" size="small" />

          <h3 className="fz-h4 fw-bold mb-0">Método de pago</h3>
        </div>

        <div className="row g-3">
          {comercio.aceptaEfectivo && (
            <div className="col-12 col-sm-6">
              <button
                type="button"
                className={`checkoutOptionCard w-100 text-start p-3 ${
                  form.metodoPago === MetodoPagoPedido.Efectivo
                    ? "checkoutOptionCardActive"
                    : ""
                }`}
                onClick={() =>
                  onChange(comercio.comercioUuid, {
                    metodoPago: MetodoPagoPedido.Efectivo,
                  })
                }
              >
                <div className="d-flex align-items-center gap-2">
                  <Radio
                    checked={form.metodoPago === MetodoPagoPedido.Efectivo}
                    tabIndex={-1}
                  />

                  <MaterialSymbol icon="payments" size="medium" />

                  <div>
                    <strong className="fz-h4 fw-semibold d-block">
                      Efectivo
                    </strong>

                    <span className="checkoutMutedText fz-h5 fw-regular">
                      Paga al recibir o recoger.
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}

          {comercio.aceptaTransferencia && (
            <div className="col-12 col-sm-6">
              <button
                type="button"
                className={`checkoutOptionCard w-100 text-start p-3 ${
                  form.metodoPago === MetodoPagoPedido.Transferencia
                    ? "checkoutOptionCardActive"
                    : ""
                }`}
                onClick={() =>
                  onChange(comercio.comercioUuid, {
                    metodoPago: MetodoPagoPedido.Transferencia,
                  })
                }
              >
                <div className="d-flex align-items-center gap-2">
                  <Radio
                    checked={form.metodoPago === MetodoPagoPedido.Transferencia}
                    tabIndex={-1}
                  />

                  <MaterialSymbol icon="account_balance" size="medium" />

                  <div>
                    <strong className="fz-h4 fw-semibold d-block">
                      Transferencia
                    </strong>

                    <span className="checkoutMutedText fz-h5 fw-regular">
                      Transfiere directamente al comercio.
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {form.metodoPago === MetodoPagoPedido.Transferencia &&
          comercio.cuentaTransferencia && (
            <div className="mt-4">
              <CheckoutTransferencia
                cuenta={comercio.cuentaTransferencia}
                instrucciones={comercio.instruccionesTransferencia}
              />
            </div>
          )}
      </div>

      <div className="checkoutCardDivider" />

      {/* OBSERVACIONES */}

      <div className="p-3 p-md-4">
        <TextField
          label="Indicaciones para el comercio"
          placeholder="Ej. Sin cebolla, llamar al llegar..."
          value={form.observaciones}
          multiline
          minRows={2}
          fullWidth
          slotProps={{
            htmlInput: {
              maxLength: 500,
            },
          }}
          onChange={(event) =>
            onChange(comercio.comercioUuid, {
              observaciones: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
