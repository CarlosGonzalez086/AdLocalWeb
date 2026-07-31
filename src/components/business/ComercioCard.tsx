import type { CSSProperties, FC } from "react";

import type { ComercioDtoListItem } from "../../services/comercioPublicApi";
import { slugifyConId } from "../../utils/generals";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import styles from "../../styles/ComercioCard.module.css";

interface Props {
  comercio: ComercioDtoListItem;
}

type BadgeType =
  | "premium"
  | "recomendado"
  | "esencial";

interface BadgeConfig {
  label: string;
  icon: string;
  className: string;
}

interface CardCSSProperties extends CSSProperties {
  "--card-primary": string;
  "--card-secondary": string;
}

const getBadgeConfig = (
  badge?: string,
): BadgeConfig | null => {
  if (!badge) {
    return null;
  }

  const normalizedBadge = badge
    .trim()
    .toLowerCase();

  const badgeType: BadgeType = normalizedBadge.includes(
    "premium",
  )
    ? "premium"
    : normalizedBadge.includes("recomendado")
      ? "recomendado"
      : "esencial";

  const configurations: Record<
    BadgeType,
    BadgeConfig
  > = {
    premium: {
      label: "Premium",
      icon: "workspace_premium",
      className: styles.badgePremium,
    },
    recomendado: {
      label: "Recomendado",
      icon: "recommend",
      className: styles.badgeRecommended,
    },
    esencial: {
      label: "Esencial",
      icon: "verified",
      className: styles.badgeEssential,
    },
  };

  return configurations[badgeType];
};

const RatingStars: FC<{
  value: number;
}> = ({ value }) => {
  const normalizedValue = Math.min(
    Math.max(value, 0),
    5,
  );

  const filledPercentage =
    (normalizedValue / 5) * 100;

  const stars = Array.from({
    length: 5,
  });

  return (
    <div
      className={styles.ratingStars}
      aria-label={`Calificación ${normalizedValue.toFixed(
        1,
      )} de 5`}
      role="img"
    >
      <div className={styles.ratingStarsEmpty}>
        {stars.map((_, index) => (
          <MaterialSymbol
            key={`empty-${index}`}
            icon="star"
            size="small"
            filled
          />
        ))}
      </div>

      <div
        className={styles.ratingStarsFilled}
        style={{
          width: `${filledPercentage}%`,
        }}
      >
        {stars.map((_, index) => (
          <MaterialSymbol
            key={`filled-${index}`}
            icon="star"
            size="small"
            filled
          />
        ))}
      </div>
    </div>
  );
};

const ComercioCard: FC<Props> = ({
  comercio,
}) => {
  const slug = slugifyConId(
    comercio.id,
    comercio.nombre,
  );

  const badgeConfig = getBadgeConfig(
    comercio.badge,
  );

  const rating = Number(
    comercio.promedioCalificacion ?? 0,
  );

  const distance = Number(
    comercio.distanciaKm ?? 0,
  );

  const primaryColor =
    comercio.colorPrimario || "#5B3A29";

  const secondaryColor =
    comercio.colorSecundario || "#3A2419";

  const cardStyles: CardCSSProperties = {
    "--card-primary": primaryColor,
    "--card-secondary": secondaryColor,
  };

  const coverStyles: CSSProperties = {
    backgroundImage: comercio.logoUrl
      ? `url("${comercio.logoUrl}")`
      : `linear-gradient(
          135deg,
          ${primaryColor},
          ${secondaryColor}
        )`,
  };

  const address = [
    comercio.direccion,
    comercio.municipioNombre,
    comercio.estadoNombre,
  ]
    .filter(Boolean)
    .join(", ");

  const initial =
    comercio.nombre
      ?.trim()
      .charAt(0)
      .toUpperCase() || "A";

  return (
    <a
      href={`/comercios/${slug}`}
      className={styles.cardLink}
      style={cardStyles}
      aria-label={`Ver información de ${comercio.nombre}`}
    >
      <article className={styles.card}>
        <div className={styles.cover}>
          <div
            className={styles.coverImage}
            style={coverStyles}
          />

          <div className={styles.coverOverlay} />

          {badgeConfig && (
            <div
              className={[
                styles.badge,
                badgeConfig.className,
              ].join(" ")}
            >
              <MaterialSymbol
                icon={badgeConfig.icon}
                size="small"
                filled
              />

              <span>{badgeConfig.label}</span>
            </div>
          )}

          <div className={styles.businessIdentity}>
            <div className={styles.avatar}>
              {comercio.logoUrl ? (
                <img
                  src={comercio.logoUrl}
                  alt=""
                  loading="lazy"
                  className={styles.avatarImage}
                />
              ) : (
                <span className={styles.avatarInitial}>
                  {initial}
                </span>
              )}
            </div>

            <h2 className={styles.businessName}>
              {comercio.nombre}
            </h2>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.information}>
            <div className={styles.address}>
              <MaterialSymbol
                icon="location_on"
                size="small"
                filled
                className={styles.addressIcon}
              />

              <p className={styles.addressText}>
                {address
                  ? `${address}.`
                  : "Dirección no disponible."}
              </p>
            </div>

            <div className={styles.businessMetadata}>
              <div className={styles.ratingContainer}>
                <span className={styles.ratingNumber}>
                  {rating.toFixed(1)}
                </span>

                <RatingStars value={rating} />
              </div>

              {distance > 0 && (
                <>
                  <span
                    className={styles.metadataSeparator}
                    aria-hidden="true"
                  />

                  <span className={styles.distanceBadge}>
                    <MaterialSymbol
                      icon="near_me"
                      size="small"
                      filled
                    />

                    <span>
                      {distance.toFixed(1)} km
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={styles.detailsButton}>
            <span>Ver detalles</span>

            <MaterialSymbol
              icon="arrow_forward_ios"
              size="small"
              className={styles.detailsIcon}
            />
          </div>
        </div>
      </article>
    </a>
  );
};

export default ComercioCard;