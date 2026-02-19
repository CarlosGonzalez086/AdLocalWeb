import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import ComercioCard from "./ComercioCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { ComercioDtoListItem } from "../../services/comercioPublicApi";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const tabs = [
  { label: "⭐ Destacados", key: "destacados" },
  { label: "💡 Sugeridos",  key: "sugeridos"  },
  { label: "🔥 Populares",  key: "populares"  },
  { label: "🆕 Recientes",  key: "recientes"  },
  { label: "📍 Cercanos",   key: "cercanos"   },
];

export const coffee = {
  main: "#8a583e",
  dark: "#3A2419",
  light: "#f7ede6",
};

type TabKey = "destacados" | "populares" | "recientes" | "cercanos" | "sugeridos";

interface Props {
  comercios: ComercioDtoListItem[];
  loading?: boolean;
  error?: string | null;
  activeTab?: TabKey;
  setActiveTab?: Dispatch<SetStateAction<TabKey>>;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const BusinessTabs: React.FC<Props> = ({
  comercios,
  loading = false,
  error = null,
  activeTab: activeTabProp = "destacados",
  setActiveTab: setActiveTabProp,
  hasMore = false,
  onLoadMore,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(activeTabProp);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setActiveTab(activeTabProp);
  }, [activeTabProp]);

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);
    setActiveTabProp?.(tab);
  };

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992,  settings: { slidesToShow: 2 } },
      { breakpoint: 768,  settings: { slidesToShow: 1.2, arrows: false } },
    ],
  };

  return (
    <Box sx={{ width: "100%" }}>

      {/* Tabs pill */}
      <Box
        sx={{
          overflowX: "auto",
          mt: 1,
          mb: 3,
          /* oculta scrollbar pero permite scroll */
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        <Stack
          direction="row"
          spacing={0.8}
          sx={{
            bgcolor: coffee.light,
            p: 0.8,
            borderRadius: 999,
            width: "fit-content",
            mx: "auto",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          }}
        >
          {tabs.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <Button
                key={t.key}
                onClick={() => handleTabClick(t.key as TabKey)}
                sx={{
                  whiteSpace: "nowrap",
                  borderRadius: 999,
                  px: { xs: 2, sm: 2.5 },
                  py: 0.9,
                  fontWeight: 600,
                  fontSize: { xs: "0.78rem", sm: "0.85rem" },
                  textTransform: "none",
                  color: isActive ? "#fff" : coffee.main,
                  backgroundColor: isActive ? coffee.main : "transparent",
                  boxShadow: isActive ? `0 4px 14px ${coffee.main}55` : "none",
                  transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
                  "&:hover": {
                    backgroundColor: isActive ? coffee.main : `${coffee.main}14`,
                  },
                }}
              >
                {t.label}
              </Button>
            );
          })}
        </Stack>
      </Box>

      {/* Loading inicial */}
      {loading && comercios.length === 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1.5}
          py={8}
        >
          <CircularProgress size={20} thickness={4} sx={{ color: coffee.main }} />
          <Typography fontSize="0.875rem" fontWeight={500} color="text.secondary">
            Cargando comercios...
          </Typography>
        </Box>
      )}

      {/* Error */}
      {!loading && error && comercios.length === 0 && (
        <Box textAlign="center" py={6}>
          <Typography fontSize="2rem">😕</Typography>
          <Typography color="text.secondary" fontSize="0.875rem" mt={0.5}>
            Algo salió mal. Intenta de nuevo.
          </Typography>
        </Box>
      )}

      {/* Sin resultados */}
      {!loading && !error && comercios.length === 0 && (
        <Box textAlign="center" py={6}>
          <Typography fontSize="2rem">🏪</Typography>
          <Typography color="text.secondary" fontSize="0.875rem" mt={0.5}>
            No hay comercios en esta categoría.
          </Typography>
        </Box>
      )}

      {/* Comercios */}
      {comercios.length > 0 && (
        <>
          {activeTab === "destacados" && !isMobile ? (
            <Box
              sx={{
                "& .slick-track": { display: "flex", gap: 0 },
                "& .slick-prev, & .slick-next": {
                  zIndex: 2,
                  width: 36,
                  height: 36,
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  "&:before": { color: coffee.main, fontSize: 18 },
                  "&:hover": { bgcolor: coffee.light },
                },
                "& .slick-prev": { left: -18 },
                "& .slick-next": { right: -18 },
              }}
            >
              <Slider {...carouselSettings}>
                {comercios.map((c) => (
                  <Box key={c.id} px={1.5}>
                    <ComercioCard comercio={c} />
                  </Box>
                ))}
              </Slider>
            </Box>
          ) : (
            <Box px={{ xs: 0, sm: 1 }}>
              <div className="container-fluid">
                <div className="row g-3">
                  {comercios.map((c) => (
                    <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
                      <ComercioCard comercio={c} />
                    </div>
                  ))}
                </div>
              </div>
            </Box>
          )}

          {/* Cargar más */}
          {hasMore && (
            <Box textAlign="center" mt={5}>
              <Button
                onClick={onLoadMore}
                disabled={loading}
                sx={{
                  px: 5,
                  py: 1.4,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  background: loading
                    ? undefined
                    : `linear-gradient(135deg, ${coffee.main}, ${coffee.dark})`,
                  color: "#fff",
                  boxShadow: loading ? "none" : `0 6px 18px ${coffee.main}44`,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    boxShadow: `0 10px 24px ${coffee.main}55`,
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    color: "rgba(255,255,255,0.6)",
                  },
                }}
                startIcon={
                  loading
                    ? <CircularProgress size={16} thickness={4} sx={{ color: "#fff" }} />
                    : undefined
                }
              >
                {loading ? "Cargando..." : "Cargar más comercios"}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BusinessTabs;