import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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

const MapaComercioLazy = React.lazy(() => import("./MapaComercio.client"));

import type { CarritoDetalleDto } from "../../services/carritoApi";

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
      className: "comercioDetalleBadgePremium",
    },

    recomendado: {
      label: "Recomendado",
      icon: "recommend",
      className: "comercioDetalleBadgeRecommended",
    },

    esencial: {
      label: "Esencial",
      icon: "verified",
      className: "comercioDetalleBadgeEssential",
    },
  };

  return configurations[badgeType];
};

interface Props {
  comercio: ComercioDto | null;

  productos: ProductoServicioDto[];

  loadingProducts?: boolean;

  productosCarrito?: CarritoDetalleDto[];

  loadingCarrito?: boolean;

  onAgregarCarrito?: (producto: ProductoServicioDto) => Promise<void>;

  onIncrementarCantidad?: (detalleUuid: string) => Promise<boolean>;

  onDisminuirCantidad?: (detalleUuid: string) => Promise<boolean>;

  onEliminarProducto?: (detalleUuid: string) => Promise<boolean>;

  onReservar?: (producto: ProductoServicioDto) => void;

  onCotizar?: (producto: ProductoServicioDto) => void;
}

export default function ComercioDetalle({
  comercio,
  productos,
  loadingProducts = false,

  productosCarrito = [],
  loadingCarrito = false,

  onAgregarCarrito,
  onIncrementarCantidad,
  onDisminuirCantidad,
  onEliminarProducto,

  onReservar,
  onCotizar,
}: Props) {
  if (!comercio) {
    return (
      <div className="comercioDetalleNotFound">
        <div className="comercioDetalleNotFoundIcon">
          <MaterialSymbol icon="storefront" size="large" />
        </div>

        <h1 className="fz-h2 fw-bold mb-0">Comercio no disponible</h1>

        <p className="comercioDetalleNotFoundDescription fz-h4 fw-regular">
          No fue posible encontrar la información del comercio solicitado.
        </p>

        <a
          href="/"
          className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
          style={{ textDecoration: "none" }}
        >
          <div className="d-flex align-items-center gap-2">
            <MaterialSymbol icon="arrow_back" size="small" />

            <span>Regresar al inicio</span>
          </div>
        </a>
      </div>
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
  const getProductoCarrito = (productoUuid: string) => {
    const detalle = productosCarrito.find(
      (item) => item.productoUuid === productoUuid,
    );

    if (!detalle) {
      return null;
    }

    return {
      detalleUuid: detalle.uuid,
      cantidad: detalle.cantidad,
    };
  };
  return (
    <div className="comercioDetalle" style={detailStyles}>
      <div className="comercioDetalleHero">
        <div>
          <button
            type="button"
            className="btn-adlocal btn-adlocal--ghost btn-adlocal--sm fz-h4 fw-medium comercioDetalleBackButton"
            onClick={() => window.location.assign("/")}
          >
            <div className="d-flex align-items-center gap-2">
              <MaterialSymbol icon="arrow_back" size="small" />

              <span>Volver</span>
            </div>
          </button>
        </div>
        {badgeConfig && (
          <div className={`comercioDetalleBadge ${badgeConfig.className}`}>
            <MaterialSymbol icon={badgeConfig.icon} size="small" filled />

            <span className="fz-h6 fw-semibold">{badgeConfig.label}</span>
          </div>
        )}

        <div className="comercioDetalleHeroContent">
          <div className="comercioDetalleLogoContainer">
            {comercio.logoBase64 ? (
              <img
                src={comercio.logoBase64}
                alt={`Logotipo de ${comercio.nombre}`}
                className="comercioDetalleLogo"
              />
            ) : (
              <span className="comercioDetalleLogoInitial fz-h1 fw-bold">
                {initial}
              </span>
            )}
          </div>

          <h1 className="comercioDetalleBusinessName fz-h1 fw-bold mb-0">
            {comercio.nombre}
          </h1>

          <div className="comercioDetalleRatingContainer">
            <span className="fz-h4 fw-semibold">{calificacion.toFixed(1)}</span>

            <Rating
              value={calificacion}
              precision={0.5}
              readOnly
              size="small"
              icon={<MaterialSymbol icon="star" size="small" filled />}
              emptyIcon={<MaterialSymbol icon="star" size="small" filled />}
              className="comercioDetalleRating"
              aria-label={`Calificación ${calificacion.toFixed(1)} de 5`}
            />
          </div>

          {comercio.descripcion && (
            <p className="comercioDetalleDescription fz-h4 fw-regular">
              {comercio.descripcion}
            </p>
          )}

          {horarios.length > 0 && (
            <span
              className={`comercioDetalleOpenStatus fz-h5 fw-semibold ${
                abiertoAhora
                  ? "comercioDetalleOpenStatusActive"
                  : "comercioDetalleOpenStatusClosed"
              }`}
            >
              <MaterialSymbol icon="schedule" size="small" />

              <span>{abiertoAhora ? "Abierto ahora" : "Cerrado ahora"}</span>
            </span>
          )}
        </div>
      </div>

      <div className="comercioDetalleBody">
        <div
          className="comercioDetalleContactCard"
          aria-label="Información de contacto"
        >
          <div className="comercioDetalleContactItem">
            <span className="comercioDetalleContactIcon">
              <MaterialSymbol icon="location_on" size="medium" filled />
            </span>

            <div className="comercioDetalleContactContent">
              <span className="fz-h6 fw-semibold">Dirección</span>

              <p className="comercioDetalleContactText fz-h4 fw-regular mb-0">
                {address ? `${address}.` : "Dirección no disponible."}
              </p>
            </div>
          </div>

          {comercio.telefono && (
            <div className="comercioDetalleContactItem">
              <span className="comercioDetalleContactIcon comercioDetalleWhatsappIcon">
                <MaterialSymbol icon="chat" size="medium" filled />
              </span>

              <div className="comercioDetalleContactContent">
                <span className="fz-h6 fw-semibold">WhatsApp</span>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comercioDetalleContactLink fz-h4 fw-medium"
                >
                  {comercio.telefono}
                </a>
              </div>
            </div>
          )}

          {comercio.email && (
            <div className="comercioDetalleContactItem">
              <span className="comercioDetalleContactIcon">
                <MaterialSymbol icon="mail" size="medium" />
              </span>

              <div className="comercioDetalleContactContent">
                <span className="fz-h6 fw-semibold">Correo electrónico</span>

                <a
                  href={`mailto:${comercio.email}`}
                  className="comercioDetalleContactLink fz-h4 fw-medium"
                >
                  {comercio.email}
                </a>
              </div>
            </div>
          )}

          {comercio.tipoComercio && (
            <div className="comercioDetalleContactItem">
              <span className="comercioDetalleContactIcon">
                <MaterialSymbol icon="category" size="medium" />
              </span>

              <div className="comercioDetalleContactContent">
                <span className="fz-h6 fw-semibold">Categoría</span>

                <p className="comercioDetalleContactText fz-h4 fw-regular mb-0">
                  {comercio.tipoComercio}
                </p>
              </div>
            </div>
          )}
        </div>

        {comercio.imagenes && comercio.imagenes.length > 0 && (
          <div className="comercioDetalleSection">
            <div className="comercioDetalleSectionHeader">
              <span className="comercioDetalleSectionIcon">
                <MaterialSymbol icon="photo_library" size="medium" />
              </span>

              <div>
                <h2 className="fz-h2 fw-bold mb-1">Imágenes del negocio</h2>

                <p className="comercioDetalleSectionDescription fz-h4 fw-regular mb-0">
                  Conoce las instalaciones y servicios del comercio.
                </p>
              </div>
            </div>

            <div className="comercioDetalleGallery">
              <div
                id={carouselId}
                className="comercioDetalleCarousel carousel slide"
                data-bs-ride="carousel"
              >
                {comercio.imagenes.length > 1 && (
                  <div className="comercioDetalleCarouselIndicators carousel-indicators">
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
                      className={`comercioDetalleCarouselItem carousel-item ${
                        index === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Imagen ${index + 1} de ${comercio.nombre}`}
                        className="comercioDetalleCarouselImage"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))}
                </div>

                {comercio.imagenes.length > 1 && (
                  <>
                    <button
                      className="comercioDetalleCarouselControl carousel-control-prev"
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
                      className="comercioDetalleCarouselControl carousel-control-next"
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
          </div>
        )}

        {horarios.length > 0 && (
          <Accordion
            className="comercioDetalleAccordion"
            elevation={0}
            disableGutters
          >
            <AccordionSummary
              className="comercioDetalleAccordionSummary"
              expandIcon={<MaterialSymbol icon="expand_more" size="medium" />}
            >
              <span className="comercioDetalleAccordionIcon">
                <MaterialSymbol icon="schedule" size="medium" />
              </span>

              <div>
                <h2 className="fz-h3 fw-bold mb-1">Horarios de atención</h2>

                <p className="comercioDetalleAccordionDescription fz-h5 fw-regular mb-0">
                  Consulta los días y horarios disponibles.
                </p>
              </div>
            </AccordionSummary>

            <AccordionDetails className="comercioDetalleAccordionDetails">
              <div className="comercioDetalleScheduleList">
                {horarios.map((horario) => (
                  <div
                    key={horario.dia}
                    className={`comercioDetalleScheduleRow ${
                      horario.abierto
                        ? "comercioDetalleScheduleRowOpen"
                        : "comercioDetalleScheduleRowClosed"
                    }`}
                  >
                    <span className="fz-h4 fw-semibold">
                      {DIAS_SEMANA_MAP[horario.dia]}
                    </span>

                    {horario.abierto ? (
                      <span className="comercioDetalleScheduleTime fz-h4 fw-medium">
                        {horario.horaAperturaFormateada}

                        <span className="comercioDetalleScheduleSeparator">
                          –
                        </span>

                        {horario.horaCierreFormateada}
                      </span>
                    ) : (
                      <span className="comercioDetalleClosedBadge fz-h5 fw-semibold">
                        Cerrado
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

        <Accordion
          className="comercioDetalleAccordion"
          elevation={0}
          disableGutters
        >
          <AccordionSummary
            className="comercioDetalleAccordionSummary"
            expandIcon={<MaterialSymbol icon="expand_more" size="medium" />}
          >
            <span className="comercioDetalleAccordionIcon">
              <MaterialSymbol icon="inventory_2" size="medium" />
            </span>

            <div>
              <h2 className="fz-h3 fw-bold mb-1">Productos y servicios</h2>

              <p className="comercioDetalleAccordionDescription fz-h5 fw-regular mb-0">
                Explora lo que este comercio tiene para ofrecer.
              </p>
            </div>
          </AccordionSummary>

          <AccordionDetails className="comercioDetalleAccordionDetails comercioDetalleProductsDetails">
            {loadingProducts ? (
              <div className="comercioDetalleLoadingState">
                <MaterialSymbol
                  icon="progress_activity"
                  size="medium"
                  className="comercioDetalleLoadingIcon"
                />

                <span className="fz-h4 fw-medium">Cargando productos...</span>
              </div>
            ) : productos.length === 0 ? (
              <div className="comercioDetalleEmptyProducts">
                <div className="comercioDetalleEmptyProductsIcon">
                  <MaterialSymbol icon="inventory_2" size="large" />
                </div>

                <p className="fz-h3 fw-semibold mb-1">
                  No hay productos disponibles
                </p>

                <p className="comercioDetalleEmptyProductsDescription fz-h4 fw-regular mb-0">
                  Este comercio todavía no ha publicado productos o servicios.
                </p>
              </div>
            ) : (
              <div className="comercioDetalleProductsList">
                {productos.map((producto) => {
                  const carritoInfo = getProductoCarrito(producto.uuid);

                  return (
                    <div
                      key={producto.uuid}
                      className="comercioDetalleProductItem"
                    >
                      <ProductoCard
                        producto={producto}
                        carritoInfo={carritoInfo}
                        loading={loadingCarrito}
                        onAgregarCarrito={onAgregarCarrito}
                        onIncrementar={onIncrementarCantidad}
                        onDisminuir={onDisminuirCantidad}
                        onEliminar={onEliminarProducto}
                        onReservar={onReservar}
                        onCotizar={onCotizar}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </AccordionDetails>
        </Accordion>

        {hasLocation && (
          <div className="comercioDetalleSection comercioDetalleMapSection">
            <div className="comercioDetalleSectionHeader">
              <span className="comercioDetalleSectionIcon">
                <MaterialSymbol icon="map" size="medium" />
              </span>

              <div>
                <h2 className="fz-h2 fw-bold mb-1">Ubicación</h2>

                <p className="comercioDetalleSectionDescription fz-h4 fw-regular mb-0">
                  Consulta la ubicación exacta del comercio.
                </p>
              </div>
            </div>

            <div
              className="comercioDetalleMapContainer"
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
                  <div className="comercioDetalleMapLoading">
                    <MaterialSymbol
                      icon="progress_activity"
                      size="medium"
                      className="comercioDetalleLoadingIcon"
                    />

                    <span className="fz-h4 fw-medium">
                      Cargando ubicación...
                    </span>
                  </div>
                }
              >
                {typeof window !== "undefined" && (
                  <MapaComercioLazy lat={latitude} lng={longitude} />
                )}
              </Suspense>

              <span className="comercioDetalleMapHint fz-h5 fw-semibold">
                <MaterialSymbol icon="open_in_new" size="small" />

                <span>Abrir en Google Maps</span>
              </span>
            </div>
          </div>
        )}

        <Accordion
          className="comercioDetalleAccordion"
          elevation={0}
          disableGutters
        >
          <AccordionSummary
            className="comercioDetalleAccordionSummary"
            expandIcon={<MaterialSymbol icon="expand_more" size="medium" />}
          >
            <span className="comercioDetalleAccordionIcon comercioDetalleRatingAccordionIcon">
              <MaterialSymbol icon="star" size="medium" filled />
            </span>

            <div>
              <h2 className="fz-h3 fw-bold mb-1">
                Calificaciones y comentarios
              </h2>

              <p className="comercioDetalleAccordionDescription fz-h5 fw-regular mb-0">
                Consulta o comparte una experiencia con el comercio.
              </p>
            </div>
          </AccordionSummary>

          <AccordionDetails className="comercioDetalleAccordionDetails">
            <CalificacionesComentarios
              colorPrimario={colorPrimario}
              colorSecundario={colorSecundario}
              idComercio={Number(comercio.id)}
            />
          </AccordionDetails>
        </Accordion>

        {hasLocation && (
          <div className="comercioDetalleMapAction">
            <Button
              type="button"
              className="btn-adlocal btn-adlocal--solid fz-h4 fw-semibold"
              onClick={handleOpenMap}
            >
              <div className="d-flex align-items-center justify-content-center gap-2">
                <MaterialSymbol icon="directions" size="medium" />

                <span>Ver ubicación en el mapa</span>

                <MaterialSymbol icon="open_in_new" size="small" />
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
