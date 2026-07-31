import type { FC } from "react";

import type { ProductoServicioDto } from "../../services/comercioPublicApi";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import styles from "../../styles/ProductoCard.module.css";

interface Props {
  producto: ProductoServicioDto;
}

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ProductoCard: FC<Props> = ({ producto }) => {
  const hasImage = Boolean(producto.logoUrl?.trim());

  const hasPrice = producto.precio !== null && producto.precio !== undefined;

  const formattedPrice = hasPrice
    ? moneyFormatter.format(Number(producto.precio))
    : null;

  return (
    <article className={styles.productCard}>
      <div className={styles.imageContainer}>
        {hasImage ? (
          <img
            src={producto.logoUrl}
            alt={producto.nombre}
            loading="lazy"
            className={styles.productImage}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <MaterialSymbol icon="inventory_2" size="large" />
          </div>
        )}

        {hasPrice && (
          <span className={styles.mobilePrice}>{formattedPrice}</span>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.information}>
          <h3 className={styles.productName}>{producto.nombre}</h3>

          {producto.descripcion && (
            <p className={styles.description}>{producto.descripcion}</p>
          )}
        </div>

        {hasPrice && (
          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Precio</span>

            <span className={styles.price}>{formattedPrice}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductoCard;
