import {
  Box,
  Typography,
  Avatar,
  Stack,
  Button,
  Divider,
  Link,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import type {
  ComercioDto,
  ProductoServicioDto,
} from "../../services/comercioPublicApi";

import ProductoCard from "./ProductoCard";
import { DIAS_SEMANA_MAP, estaAbiertoAhora } from "../../utils/generals";
import React, { lazy, Suspense } from "react";

const MapaComercioLazy = React.lazy(() => import("./MapaComercio.client"));

interface Props {
  comercio: ComercioDto | null;
  productos: ProductoServicioDto[];
  loadingProducts?: boolean;
}

export default function ComercioDetalle({
  comercio,
  productos,
  loadingProducts = false,
}: Props) {
  const abiertoAhora = comercio?.horarios
    ? estaAbiertoAhora(comercio.horarios)
    : false;

  const colorPrimario = comercio?.colorPrimario ?? "#6f4e37";
  const colorSecundario = comercio?.colorSecundario ?? "#3e2723";
  const horarios = comercio?.horarios || [];

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: { xs: "100%", sm: 600, md: 900 },
        width: "100%",
        mx: "auto",
        borderRadius: { xs: 2, sm: 3, md: 4 },
        boxShadow: {
          xs: "0 4px 12px rgba(0,0,0,0.1)",
          sm: "0 6px 20px rgba(0,0,0,0.15)",
        },
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() =>
          typeof window !== "undefined" && window.location.assign("/")
        }
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "#333",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#fff",
          },
        }}
      >
        Volver
      </Button>

      <Box
        sx={{
          background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
          width: "100%",
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 4, sm: 5, md: 6 },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={comercio?.logoBase64}
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            mb: 2,
            border: "3px solid #fff",
          }}
        />

        <Typography variant="h4" fontWeight="bold" color="#fff">
          {comercio?.nombre}
        </Typography>

        {comercio?.descripcion && (
          <Typography color="#eee" mt={1}>
            {comercio.descripcion}
          </Typography>
        )}

        {comercio?.horarios && (
          <Chip
            icon={<AccessTimeIcon />}
            label={abiertoAhora ? "Abierto ahora" : "Cerrado ahora"}
            sx={{
              mt: 2,
              backgroundColor: abiertoAhora ? "#4caf50" : "#f44336",
              color: "#fff",
            }}
          />
        )}
      </Box>

      <Stack spacing={2} px={4} py={4}>
        <Stack direction="row" spacing={1}>
          <LocationOnIcon />
          <Typography>{comercio?.direccion}</Typography>
        </Stack>

        {comercio?.telefono && (
          <Stack direction="row" spacing={1}>
            <WhatsAppIcon sx={{ color: "#25D366" }} />
            <Link
              href={`https://wa.me/${comercio.telefono}`}
              target="_blank"
              underline="none"
            >
              {comercio.telefono}
            </Link>
          </Stack>
        )}

        {comercio?.email && (
          <Stack direction="row" spacing={1}>
            <EmailIcon />
            <Link href={`mailto:${comercio.email}`} underline="none">
              {comercio.email}
            </Link>
          </Stack>
        )}

        <Divider />

        {comercio?.imagenes && comercio.imagenes.length > 0 && (
          <>
            <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
              Imágenes del negocio
            </Typography>
            <Box
              sx={{
                mt: 6,
                mx: 3,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <div
                id="carouselComercio"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {comercio.imagenes.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      data-bs-target="#carouselComercio"
                      data-bs-slide-to={idx}
                      className={idx === 0 ? "active" : ""}
                      aria-current={idx === 0 ? "true" : undefined}
                      aria-label={`Slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>

                <div className="carousel-inner">
                  {comercio.imagenes.map((img, idx) => (
                    <div
                      key={idx}
                      className={`carousel-item ${idx === 0 ? "active" : ""}`}
                      style={{ height: 250 }}
                    >
                      <img
                        src={img}
                        className="d-block w-100"
                        alt={`Imagen ${idx + 1}`}
                        style={{ objectFit: "cover", height: "100%" }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselComercio"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselComercio"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </Box>
            <Divider />
          </>
        )}

        {horarios?.length > 0 && (
          <Accordion
            sx={{
              borderRadius: 3,
              mb: 3,
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              "&:before": { display: "none" },
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                px: 3,
                py: 1.5,
                minHeight: 56,
                "& .MuiAccordionSummary-content": {
                  alignItems: "center",
                  gap: 1,
                },
              }}
            >
              <Typography fontWeight={600} fontSize="1.1rem">
                Horarios de atención
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 3, pb: 2 }}>
              <Stack spacing={1}>
                {horarios
                  .sort((a, b) => a.dia - b.dia)
                  .map((h) => (
                    <Box
                      key={h.dia}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: h.abierto ? "#fef7f0" : "#fafafa",
                      }}
                    >
                      <Typography fontWeight={500}>
                        {DIAS_SEMANA_MAP[h.dia]}
                      </Typography>
                      {h.abierto ? (
                        <Typography variant="body2">
                          {h.horaAperturaFormateada} – {h.horaCierreFormateada}
                        </Typography>
                      ) : (
                        <Chip
                          label="Cerrado"
                          size="small"
                          color="default"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      )}
                    </Box>
                  ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}

        <Accordion
          sx={{
            borderRadius: 3,
            mb: 2,
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            "&:before": { display: "none" },
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: 3,
              py: 1.5,
              minHeight: 56,
              "& .MuiAccordionSummary-content": {
                alignItems: "center",
                gap: 1,
              },
            }}
          >
            <Typography fontWeight={600} fontSize="1rem">
              Productos
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ px: 3, pb: 2 }}>
            {loadingProducts ? (
              <Typography>Cargando…</Typography>
            ) : productos.length === 0 ? (
              <Typography>No hay productos.</Typography>
            ) : (
              <Stack spacing={2}>
                {productos.map((p) => (
                  <ProductoCard key={p.id} producto={p} />
                ))}
              </Stack>
            )}
          </AccordionDetails>
        </Accordion>

        {comercio?.lat && comercio?.lng && (
          <Box
            sx={{
              mt: 3,
              p: 1,
              borderRadius: 3,
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <Suspense fallback={<div>Cargando mapa…</div>}>
              {typeof window !== "undefined" && (
                <MapaComercioLazy lat={comercio.lat} lng={comercio.lng} />
              )}
            </Suspense>
          </Box>
        )}

        <Button
          fullWidth
          sx={{
            mt: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${colorPrimario}, ${colorSecundario})`,
            color: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
          onClick={() =>
            window.open(
              `https://www.google.com/maps?q=${comercio?.lat},${comercio?.lng}`,
              "_blank"
            )
          }
        >
          Ver ubicación
        </Button>
      </Stack>
    </Box>
  );
}
