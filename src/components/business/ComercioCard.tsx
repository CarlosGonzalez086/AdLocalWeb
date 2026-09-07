import type { CSSProperties, FC } from "react";

import type { ComercioDtoListItem } from "../../services/comercioPublicApi";
import { slugifyConId } from "../../utils/generals";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

interface Props {
  comercio: ComercioDtoListItem;
}

type BadgeType = "premium" | "recomendado" | "esencial";

interface BadgeConfig {
  label: string;
  icon: string;
  className: string;
}

interface CardCSSProperties extends CSSProperties {
  "--card-primary": string;
  "--card-secondary": string;
}

const getBadgeConfig = (badge?: string): BadgeConfig | null => {
  if (!badge) {
    return null;
  }

  const normalizedBadge = badge.trim().toLowerCase();

  const badgeType: BadgeType = normalizedBadge.includes("premium")
    ? "premium"
    : normalizedBadge.includes("recomendado")
      ? "recomendado"
      : "esencial";

  const configurations: Record<BadgeType, BadgeConfig> = {
    premium: {
      label: "Favorito Local",
      icon: "workspace_premium",
      className: "comercioCardBadgePremium",
    },
    recomendado: {
      label: "Recomendado",
      icon: "recommend",
      className: "comercioCardBadgeRecommended",
    },
    esencial: {
      label: "Comercio Vecino",
      icon: "storefront",
      className: "comercioCardBadgeEssential",
    },
  };

  return configurations[badgeType];
};

const RatingStars: FC<{
  value: number;
}> = ({ value }) => {
  const normalizedValue = Math.min(Math.max(value, 0), 5);

  const filledPercentage = (normalizedValue / 5) * 100;

  const stars = Array.from({
    length: 5,
  });

  return (
    <div
      className="comercioCardRatingStars w-100"
      aria-label={`Calificación ${normalizedValue.toFixed(1)} de 5`}
      role="img"
    >
      <div className="comercioCardRatingStarsEmpty">
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
        className="comercioCardRatingStarsFilled"
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

const ComercioCard: FC<Props> = ({ comercio }) => {
  const slug = slugifyConId(comercio.id, comercio.nombre);

  const badgeConfig = getBadgeConfig(comercio.badge);

  const rating = Number(comercio.promedioCalificacion ?? 0);

  const distance = Number(comercio.distanciaKm ?? 0);

  const primaryColor = comercio.colorPrimario || "#5B3A29";

  const secondaryColor = comercio.colorSecundario || "#3A2419";

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

  const initial = comercio.nombre?.trim().charAt(0).toUpperCase() || "A";

  return (
    <a
      href={`/comercios/${slug}`}
      className="comercioCardLink"
      style={cardStyles}
      aria-label={`Ver información de ${comercio.nombre}`}
    >
      <article className="comercioCard">
        <div className="comercioCardCover">
          <div className="comercioCardCoverImage" style={coverStyles} />

          <div className="comercioCardCoverOverlay" />

          {badgeConfig && (
            <div className={`comercioCardBadge ${badgeConfig.className}`}>
              <MaterialSymbol icon={badgeConfig.icon} size="small" filled />

              <span className="fz-h6 fw-semibold">{badgeConfig.label}</span>
            </div>
          )}

          <div className="comercioCardIdentity">
            <div className="comercioCardAvatar">
              {comercio.logoUrl ? (
                <img
                  src={comercio.logoUrl}
                  alt=""
                  loading="lazy"
                  className="comercioCardAvatarImage"
                />
              ) : (
                <span className="comercioCardAvatarInitial fz-h3 fw-bold">
                  {initial}
                </span>
              )}
            </div>

            <h2 className="comercioCardBusinessName fz-h3 fw-bold mb-0">
              {comercio.nombre}
            </h2>
          </div>
        </div>

        <div className="comercioCardContent">
          <div className="comercioCardInformation">
            <div className="comercioCardAddress">
              <MaterialSymbol
                icon="location_on"
                size="small"
                filled
                className="comercioCardAddressIcon"
              />

              <p className="comercioCardAddressText fz-h5 fw-regular mb-0">
                {address ? `${address}.` : "Dirección no disponible."}
              </p>
            </div>

            <div className="comercioCardMetadata">
              <div className="comercioCardRatingContainer w-50">
                <span className="fz-h5 fw-semibold">{rating.toFixed(1)}</span>

                <RatingStars value={rating} />
              </div>

              {distance > 0 && (
                <div className="d-flex justify-content-end align-items-center w-50">
                  <span className="comercioCardDistance">
                    <MaterialSymbol icon="near_me" size="small" filled />

                    <span className="fz-h5 fw-medium">
                      {distance < 1
                        ? `a ${Math.round(distance * 1000)} m`
                        : `a ${distance.toFixed(1)} km`}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="comercioCardDetails">
            <span className="fz-h5 fw-semibold">Conocer negocio</span>

            <MaterialSymbol
              icon="arrow_forward"
              size="small"
              className="comercioCardDetailsIcon"
            />
          </div>
        </div>
      </article>
    </a>
  );
};

export default ComercioCard;
