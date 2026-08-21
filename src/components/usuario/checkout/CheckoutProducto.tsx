import type { FC } from "react";
import type { CheckoutProductoDto } from "../../../types/checkout";
import MaterialSymbol from "../../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  producto: CheckoutProductoDto;
}

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",

  currency: "MXN",

  minimumFractionDigits: 2,

  maximumFractionDigits: 2,
});

const CheckoutProducto: FC<Props> = ({ producto }) => {
  const hasImage = Boolean(producto.logoUrl?.trim());

  return (
    <div className="checkoutProductCard p-2 p-md-3">
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <div className="checkoutProductImageContainer d-flex align-items-center justify-content-center">
            {hasImage ? (
              <img
                src={producto.logoUrl!}
                alt={producto.nombre}
                className="checkoutProductImage"
              />
            ) : (
              <MaterialSymbol icon="inventory_2" size="medium" />
            )}
          </div>
        </div>

        <div className="col">
          <strong className="fz-h4 fw-semibold d-block">
            {producto.nombre}
          </strong>

          <span className="checkoutProductDetail fz-h5 fw-regular d-block mt-1">
            {producto.cantidad} ×{" "}
            {moneyFormatter.format(producto.precioUnitario)}
          </span>
        </div>

        <div className="col-auto">
          <strong className="fz-h4 fw-bold">
            {moneyFormatter.format(producto.subtotal)}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProducto;
