import { Button } from "@mui/material";
import type { FC } from "react";

import {
  ModalidadProductoServicio,
  TipoProductoServicio,
  type ProductoServicioDto,
} from "../../services/comercioPublicApi";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface ProductoCarritoInfo {
  detalleUuid: string;
  cantidad: number;
}

interface Props {
  producto: ProductoServicioDto;

  carritoInfo?: ProductoCarritoInfo | null;

  loading?: boolean;

  onAgregarCarrito?: (producto: ProductoServicioDto) => Promise<void>;

  onIncrementar?: (detalleUuid: string) => Promise<boolean>;

  onDisminuir?: (detalleUuid: string) => Promise<boolean>;

  onEliminar?: (detalleUuid: string) => Promise<boolean>;

  onReservar?: (producto: ProductoServicioDto) => void;

  onCotizar?: (producto: ProductoServicioDto) => void;
}

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ProductoCard: FC<Props> = ({
  producto,
  carritoInfo = null,
  loading = false,

  onAgregarCarrito,
  onIncrementar,
  onDisminuir,
  onEliminar,

  onReservar,
  onCotizar,
}) => {
  const hasImage = Boolean(producto.logoUrl?.trim());

  const esProducto = producto.tipo === TipoProductoServicio.Producto;

  const esServicio = producto.tipo === TipoProductoServicio.Servicio;

  const esCompra = producto.modalidad === ModalidadProductoServicio.Compra;

  const esReservacion =
    producto.modalidad === ModalidadProductoServicio.Reservacion;

  const esCotizacion =
    producto.modalidad === ModalidadProductoServicio.Cotizacion;

  const hasPrice = producto.precio !== null && producto.precio !== undefined;

  const hasPrecioDesde =
    producto.precioDesde !== null && producto.precioDesde !== undefined;

  const formattedPrice = hasPrice
    ? moneyFormatter.format(Number(producto.precio))
    : null;

  const formattedPrecioDesde = hasPrecioDesde
    ? moneyFormatter.format(Number(producto.precioDesde))
    : null;

  const agotado = producto.manejaStock && (producto.stock ?? 0) <= 0;

  const disponible =
    producto.activo && producto.visible && producto.disponible && !agotado;

  const estaEnCarrito = Boolean(carritoInfo);

  const cantidad = carritoInfo?.cantidad ?? 0;

  const alcanzoStock =
    producto.manejaStock &&
    producto.stock !== null &&
    producto.stock !== undefined &&
    cantidad >= producto.stock;

  const renderPrecio = () => {
    if (esCotizacion) {
      if (formattedPrecioDesde) {
        return (
          <>
            <span className="productoCardPriceLabel fz-h6 fw-medium">
              Desde
            </span>

            <span className="productoCardPrice fz-h3 fw-bold">
              {formattedPrecioDesde}
            </span>
          </>
        );
      }

      return (
        <>
          <span className="productoCardPriceLabel fz-h6 fw-medium">Precio</span>

          <span className="productoCardQuotePrice fz-h4 fw-semibold">
            A cotizar
          </span>
        </>
      );
    }

    if (!formattedPrice) {
      return null;
    }

    return (
      <>
        <span className="productoCardPriceLabel fz-h6 fw-medium">Precio</span>

        <span className="productoCardPrice fz-h3 fw-bold">
          {formattedPrice}
        </span>
      </>
    );
  };

  const renderAccionCompra = () => {
    if (!disponible) {
      return (
        <div className="productoCardUnavailable">
          <MaterialSymbol icon="block" size="small" />

          <span>{agotado ? "Agotado" : "No disponible"}</span>
        </div>
      );
    }

    if (!estaEnCarrito) {
      return (
        <Button
          type="button"
          disabled={loading}
          className="btn-adlocal btn-adlocal--solid productoCardAddButton"
          onClick={() => onAgregarCarrito?.(producto)}
        >
          <MaterialSymbol icon="add_shopping_cart" size="small" />

          <span className="ms-2">Agregar</span>
        </Button>
      );
    }

    return (
      <div className="w-100 d-flex align-items-center gap-1 flex-wrap justify-content-center">
        <div className="productoCardQuantity">
          <button
            type="button"
            disabled={loading}
            className="productoCardQuantityButton"
            onClick={() => onDisminuir?.(carritoInfo!.detalleUuid)}
            aria-label="Disminuir cantidad"
          >
            <MaterialSymbol icon="remove" size="small" />
          </button>

          <span className="productoCardQuantityValue fz-h4 fw-bold">
            {cantidad}
          </span>

          <button
            type="button"
            disabled={loading || alcanzoStock}
            className="productoCardQuantityButton"
            onClick={() => onIncrementar?.(carritoInfo!.detalleUuid)}
            aria-label="Aumentar cantidad"
          >
            <MaterialSymbol icon="add" size="small" />
          </button>
        </div>

        <button
          type="button"
          disabled={loading}
          className="productoCardRemoveButton"
          onClick={() => onEliminar?.(carritoInfo!.detalleUuid)}
          aria-label={`Quitar ${producto.nombre} del carrito`}
        >
          <MaterialSymbol icon="delete" size="small" />
        </button>
      </div>
    );
  };

  const renderAccion = () => {
    if (esCompra) {
      return renderAccionCompra();
    }

    if (esServicio && esReservacion) {
      return (
        <Button
          type="button"
          disabled={loading || !disponible}
          className="btn-adlocal btn-adlocal--solid productoCardActionButton"
          onClick={() => onReservar?.(producto)}
        >
          <MaterialSymbol icon="calendar_month" size="small" />

          <span className="ms-2">Reservar cita</span>
        </Button>
      );
    }

    if (esServicio && esCotizacion) {
      return (
        <Button
          type="button"
          disabled={loading || !disponible}
          className="btn-adlocal productoCardActionButton"
          onClick={() => onCotizar?.(producto)}
        >
          <MaterialSymbol icon="request_quote" size="small" />

          <span className="ms-2">Solicitar cotización</span>
        </Button>
      );
    }

    return null;
  };

  return (
    <div className="productoCard">
      <div className="productoCardImageContainer">
        {hasImage ? (
          <img
            src={producto.logoUrl!}
            alt={producto.nombre}
            loading="lazy"
            className="productoCardImage"
          />
        ) : (
          <div className="productoCardImagePlaceholder" aria-hidden="true">
            <MaterialSymbol
              icon={esServicio ? "design_services" : "inventory_2"}
              size="large"
            />
          </div>
        )}

        {!disponible && (
          <span className="productoCardAvailabilityBadge fz-h6 fw-bold">
            {agotado ? "Agotado" : "No disponible"}
          </span>
        )}

        {esCompra && formattedPrice && (
          <span className="productoCardMobilePrice fz-h4 fw-bold">
            {formattedPrice}
          </span>
        )}

        {esCotizacion && formattedPrecioDesde && (
          <span className="productoCardMobilePrice fz-h4 fw-bold">
            Desde {formattedPrecioDesde}
          </span>
        )}
      </div>

      <div className="productoCardContent w-100 d-flex justify-content-between align-items-center p-3 flex-column">
        <div className="w-100">
          <div className="d-flex justify-content-start align-items-center gap-1">
            <span className="fz-h6 fw-semibold">
              {esProducto ? "Producto" : "Servicio"}
            </span>

            {esReservacion && (
              <div className="d-flex justify-content-start align-items-center gap-1">
                <MaterialSymbol icon="calendar_month" size="small" />
                <span className="fz-h6 fw-semibold">Cita</span>
              </div>
            )}

            {esCotizacion && (
              <div className="d-flex justify-content-start align-items-center gap-1">
                <MaterialSymbol icon="request_quote" size="small" />
                <span className="fz-h6 fw-semibold">Cotización</span>
              </div>
            )}
          </div>

          <h3 className="fz-h3 fw-semibold text-break word-wrap mt-1">
            {producto.nombre}
          </h3>

          {producto.descripcion && (
            <h5 className="fz-h5 fw-regular text-break word-wrap mt-1">
              {producto.descripcion}
            </h5>
          )}

          {esReservacion && producto.duracionMinutos && (
            <div className="w-100 d-flex justify-content-start align-items-center gap-1">
              <MaterialSymbol icon="schedule" size="small" />

              <span className="fz-h5 fw-medium">
                {producto.duracionMinutos} min
              </span>
            </div>
          )}
        </div>

        <div className="w-100 d-flex justify-content-between align-items-center mt-2">
          <div className="w-100 d-flex justify-content-start align-items-start flex-column">{renderPrecio()}</div>

          <div className="w-100 d-flex justify-content-end align-items-end flex-column">{renderAccion()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
