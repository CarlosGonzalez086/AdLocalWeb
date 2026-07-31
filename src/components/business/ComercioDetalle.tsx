import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Rating,
} from "@mui/material";
import React, { Suspense, type CSSProperties } from "react";

import type {
  ComercioDto,
  ProductoServicioDto,
} from "../../services/comercioPublicApi";

import { DIAS_SEMANA_MAP, estaAbiertoAhora } from "../../utils/generals";

import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";
import CalificacionesComentarios from "./CalificacionesComentarios";
import ProductoCard from "./ProductoCard";

import styles from "../../styles/ComercioDetalle.module.css";

const MapaComercioLazy = React.lazy(() => import("./MapaComercio.client"));

interface Props {
  comercio: ComercioDto | null;
  productos: ProductoServicioDto[];
  loadingProducts?: boolean;
}

interface DetailCSSProperties extends CSSProperties {
  "--business-primary": string;
  "--business-secondary": string;
}

type BadgeType = "premium" | "recomendado" | "esencial";

interface BadgeConfig {
  label: string;
  icon: string;
  className: string;
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

export default function ComercioDetalle({
  comercio,
  productos,
  loadingProducts = false,
}: Props) {
  if (!comercio) {
    return (
      <section className={styles.notFound}>
        <div className={styles.notFoundIcon}>
          <MaterialSymbol icon="storefront" size="large" />
        </div>

        <h1 className={styles.notFoundTitle}>Comercio no disponible</h1>

        <p className={styles.notFoundDescription}>
          No fue posible encontrar la información del comercio solicitado.
        </p>

        <a href="/" className={styles.notFoundButton}>
          <MaterialSymbol icon="arrow_back" size="small" />

          <span>Regresar al inicio</span>
        </a>
      </section>
    );
  }

  const colorPrimario = comercio.colorPrimario || "#6f4e37";

  const colorSecundario = comercio.colorSecundario || "#3e2723";

  const detailStyles: DetailCSSProperties = {
    "--business-primary": colorPrimario,
    "--business-secondary": colorSecundario,
  };

  const horarios = [...(comercio.horarios ?? [])].sort((a, b) => a.dia - b.dia);

  const abiertoAhora = horarios.length > 0 ? estaAbiertoAhora(horarios) : false;

  const badgeConfig = getBadgeConfig(comercio.badge);

  const calificacion = Number(comercio.calificacion ?? 0);

  const latitude = Number(comercio.lat);
  const longitude = Number(comercio.lng);

  const hasLocation = Number.isFinite(latitude) && Number.isFinite(longitude);

  const address = [
    comercio.direccion,
    comercio.municipioNombre,
    comercio.estadoNombre,
  ]
    .filter(Boolean)
    .join(", ");

  const whatsappNumber = comercio.telefono?.replace(/\D/g, "") ?? "";

  const initial = comercio.nombre?.trim().charAt(0).toUpperCase() || "A";

  const carouselId = `carouselComercio-${comercio.id}`;

  const carouselTarget = `#${carouselId}`;

  const handleOpenMap = () => {
    if (!hasLocation) {
      return;
    }

    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <article className={styles.detail} style={detailStyles}>
      <header className={styles.hero}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => window.location.assign("/")}
        >
          <MaterialSymbol icon="arrow_back" size="small" />

          <span>Volver</span>
        </button>

        {badgeConfig && (
          <div className={[styles.badge, badgeConfig.className].join(" ")}>
            <MaterialSymbol icon={badgeConfig.icon} size="small" filled />

            <span>{badgeConfig.label}</span>
          </div>
        )}

        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            {comercio.logoBase64 ? (
              <img
                src={comercio.logoBase64}
                alt={`Logotipo de ${comercio.nombre}`}
                className={styles.logo}
              />
            ) : (
              <span className={styles.logoInitial}>{initial}</span>
            )}
          </div>

          <h1 className={styles.businessName}>{comercio.nombre}</h1>

          <div className={styles.ratingContainer}>
            <span className={styles.ratingValue}>
              {calificacion.toFixed(1)}
            </span>

            <Rating
              value={calificacion}
              precision={0.5}
              readOnly
              size="small"
              icon={<MaterialSymbol icon="star" size="small" filled />}
              emptyIcon={<MaterialSymbol icon="star" size="small" filled />}
              className={styles.rating}
              aria-label={`Calificación ${calificacion.toFixed(1)} de 5`}
            />
          </div>

          {comercio.descripcion && (
            <p className={styles.description}>{comercio.descripcion}</p>
          )}

          {horarios.length > 0 && (
            <span
              className={[
                styles.openStatus,
                abiertoAhora
                  ? styles.openStatusActive
                  : styles.openStatusClosed,
              ].join(" ")}
            >
              <MaterialSymbol icon="schedule" size="small" />

              <span>{abiertoAhora ? "Abierto ahora" : "Cerrado ahora"}</span>
            </span>
          )}
        </div>
      </header>

      <div className={styles.body}>
        <section
          className={styles.contactCard}
          aria-label="Información de contacto"
        >
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>
              <MaterialSymbol icon="location_on" size="medium" filled />
            </span>

            <div className={styles.contactContent}>
              <span className={styles.contactLabel}>Dirección</span>

              <p className={styles.contactText}>
                {address ? `${address}.` : "Dirección no disponible."}
              </p>
            </div>
          </div>

          {comercio.telefono && (
            <div className={styles.contactItem}>
              <span
                className={[styles.contactIcon, styles.whatsappIcon].join(" ")}
              >
                <MaterialSymbol icon="chat" size="medium" filled />
              </span>

              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>WhatsApp</span>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  {comercio.telefono}
                </a>
              </div>
            </div>
          )}

          {comercio.email && (
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <MaterialSymbol icon="mail" size="medium" />
              </span>

              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Correo electrónico</span>

                <a
                  href={`mailto:${comercio.email}`}
                  className={styles.contactLink}
                >
                  {comercio.email}
                </a>
              </div>
            </div>
          )}

          {comercio.tipoComercio && (
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>
                <MaterialSymbol icon="category" size="medium" />
              </span>

              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Categoría</span>

                <p className={styles.contactText}>{comercio.tipoComercio}</p>
              </div>
            </div>
          )}
        </section>

        {comercio.imagenes && comercio.imagenes.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>
                <MaterialSymbol icon="photo_library" size="medium" />
              </span>

              <div>
                <h2 className={styles.sectionTitle}>Imágenes del negocio</h2>

                <p className={styles.sectionDescription}>
                  Conoce las instalaciones y servicios del comercio.
                </p>
              </div>
            </div>

            <div className={styles.gallery}>
              <div
                id={carouselId}
                className={`${styles.carousel} carousel slide`}
                data-bs-ride="carousel"
              >
                {comercio.imagenes.length > 1 && (
                  <div
                    className={`${styles.carouselIndicators} carousel-indicators`}
                  >
                    {comercio.imagenes.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target={carouselTarget}
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Mostrar imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                <div className="carousel-inner">
                  {comercio.imagenes.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className={[
                        styles.carouselItem,
                        "carousel-item",
                        index === 0 ? "active" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <img
                        src={image}
                        alt={`Imagen ${index + 1} de ${comercio.nombre}`}
                        className={styles.carouselImage}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

                {comercio.imagenes.length > 1 && (
                  <>
                    <button
                      className={`${styles.carouselControl} carousel-control-prev`}
                      type="button"
                      data-bs-target={carouselTarget}
                      data-bs-slide="prev"
                      aria-label="Imagen anterior"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      className={`${styles.carouselControl} carousel-control-next`}
                      type="button"
                      data-bs-target={carouselTarget}
                      data-bs-slide="next"
                      aria-label="Imagen siguiente"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {horarios.length > 0 && (
          <Accordion className={styles.accordion} elevation={0} disableGutters>
            <AccordionSummary
              className={styles.accordionSummary}
              expandIcon={<MaterialSymbol icon="expand_more" size="medium" />}
            >
              <span className={styles.accordionIcon}>
                <MaterialSymbol icon="schedule" size="medium" />
              </span>

              <div>
                <h2 className={styles.accordionTitle}>Horarios de atención</h2>

                <p className={styles.accordionDescription}>
                  Consulta los días y horarios disponibles.
                </p>
              </div>
            </AccordionSummary>

            <AccordionDetails className={styles.accordionDetails}>
              <div className={styles.scheduleList}>
                {horarios.map((horario) => (
                  <div
                    key={horario.dia}
                    className={[
                      styles.scheduleRow,
                      horario.abierto
                        ? styles.scheduleRowOpen
                        : styles.scheduleRowClosed,
                    ].join(" ")}
                  >
                    <span className={styles.scheduleDay}>
                      {DIAS_SEMANA_MAP[horario.dia]}
                    </span>

                    {horario.abierto ? (
                      <span className={styles.scheduleTime}>
                        {horario.horaAperturaFormateada}
                        <span className={styles.scheduleSeparator}>–</span>
                        {horario.horaCierreFormateada}
                      </span>
                    ) : (
                      <span className={styles.closedBadge}>Cerrado</span>
                    )}
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        <Accordion className={styles.accordion} elevation={0} disableGutters>
          <AccordionSummary
            className={styles.accordionSummary}
            expandIcon={<MaterialSymbol icon="expand_more" size="medium" />}
          >
            <span className={styles.accordionIcon}>
              <MaterialSymbol icon="inventory_2" size="medium" />
            </span>

            <div>
              <h2 className={styles.accordionTitle}>Productos y servicios</h2>

              <p className={styles.accordionDescription}>
                Explora lo que este comercio tiene para ofrecer.
              </p>
            </div>
          </AccordionSummary>

          <AccordionDetails
            className={[styles.accordionDetails, styles.productsDetails].join(
              " ",
            )}
          >
            {loadingProducts ? (
              <div className={styles.loadingState}>
                <MaterialSymbol
                  icon="progress_activity"
                  size="medium"
                  className={styles.loadingIcon}
                />

                <span>Cargando productos...</span>
              </div>
            ) : productos.length === 0 ? (
              <div className={styles.emptyProducts}>
                <div className={styles.emptyProductsIcon}>
                  <MaterialSymbol icon="inventory_2" size="large" />
                </div>

                <p className={styles.emptyProductsTitle}>
                  No hay productos disponibles
                </p>

                <p className={styles.emptyProductsDescription}>
                  Este comercio todavía no ha publicado productos o servicios.
                </p>
              </div>
            ) : (
              <div className={styles.productsList}>
                {productos.map((producto) => (
                  <div key={producto.id} className={styles.productItem}>
                    <ProductoCard producto={producto} />
                  </div>
                ))}
              </div>
            )}
          </AccordionDetails>
        </Accordion>

        {hasLocation && (
          <section className={styles.mapSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>
                <MaterialSymbol icon="map" size="medium" />
              </span>

              <div>
                <h2 className={styles.sectionTitle}>Ubicación</h2>

                <p className={styles.sectionDescription}>
                  Consulta la ubicación exacta del comercio.
                </p>
              </div>
            </div>

            <div
              className={styles.mapContainer}
              role="link"
              tabIndex={0}
              aria-label={`Abrir ubicación de ${comercio.nombre} en Google Maps`}
              onClick={handleOpenMap}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleOpenMap();
                }
              }}
            >
              <Suspense
                fallback={
                  <div className={styles.mapLoading}>
                    <MaterialSymbol
                      icon="progress_activity"
                      size="medium"
                      className={styles.loadingIcon}
                    />

                    <span>Cargando ubicación...</span>
                  </div>
                }
              >
                {typeof window !== "undefined" && (
                  <MapaComercioLazy lat={latitude} lng={longitude} />
                )}
              </Suspense>

              <span className={styles.mapHint}>
                <MaterialSymbol icon="open_in_new" size="small" />

                <span>Abrir en Google Maps</span>
              </span>
            </div>
          </section>
        )}

        <Accordion className={styles.accordion} elevation={0} disableGutters>
          <AccordionSummary
            className={styles.accordionSummary}
            expandIcon={<MaterialSymbol icon="expand_more" size="medium" />}
          >
            <span
              className={[
                styles.accordionIcon,
                styles.ratingAccordionIcon,
              ].join(" ")}
            >
              <MaterialSymbol icon="star" size="medium" filled />
            </span>

            <div>
              <h2 className={styles.accordionTitle}>
                Calificaciones y comentarios
              </h2>

              <p className={styles.accordionDescription}>
                Consulta o comparte una experiencia con el comercio.
              </p>
            </div>
          </AccordionSummary>

          <AccordionDetails className={styles.accordionDetails}>
            <CalificacionesComentarios
              colorPrimario={colorPrimario}
              colorSecundario={colorSecundario}
              idComercio={Number(comercio.id)}
            />
          </AccordionDetails>
        </Accordion>

        {hasLocation && (
          <button
            type="button"
            className={styles.mapActionButton}
            onClick={handleOpenMap}
          >
            <MaterialSymbol icon="directions" size="medium" />

            <span>Ver ubicación en el mapa</span>

            <MaterialSymbol
              icon="open_in_new"
              size="small"
              className={styles.mapActionArrow}
            />
          </button>
        )}
      </div>
    </article>
  );
}
