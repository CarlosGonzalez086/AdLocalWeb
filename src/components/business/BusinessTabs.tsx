import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import Slider from "react-slick";
import ComercioCard from "./ComercioCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { ComercioDtoListItem } from "../../services/comercioPublicApi";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

const tabs = [
  { label: "Destacados", key: "destacados" },
  { label: "Populares", key: "populares" },
  { label: "Más recientes", key: "recientes" },
  { label: "Cercanos", key: "cercanos" },
];

export const coffee = {
  main: "#5B3A29",
  dark: "#3A2419",
  light: "#E8D8C8",
};

type TabKey = "destacados" | "populares" | "recientes" | "cercanos";

interface BusinessTabsProps {
  comercios: ComercioDtoListItem[];
  loading?: boolean;
  error?: string | null;
  activeTab?: TabKey;
  setActiveTab?: Dispatch<SetStateAction<TabKey>>;
}

const BusinessTabs: React.FC<BusinessTabsProps> = ({
  comercios,
  loading = false,
  error = null,
  activeTab: activeTabProp = "destacados",
  setActiveTab: setActiveTabProp,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(activeTabProp);

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
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  if (error) {
    return (
      <Typography textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      {/* Tabs estilo iOS */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        mb={4}
        sx={{
          bgcolor: coffee.light,
          p: 1,
          borderRadius: 999,
          width: "fit-content",
          mx: "auto",
        }}
      >
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <Button
              key={t.key}
              onClick={() => handleTabClick(t.key as TabKey)}
              disableElevation
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 999,
                px: 3,
                color: isActive ? "#fff" : coffee.main,
                backgroundColor: isActive ? coffee.main : "transparent",
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: isActive ? coffee.dark : coffee.light,
                },
              }}
            >
              {t.label}
            </Button>
          );
        })}
      </Stack>

      {/* Loading */}
      {loading && (
        <Box
          minHeight="50vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <CircularProgress size={52} sx={{ color: coffee.main }} />
          <Typography fontWeight={600} color="text.secondary">
            Cargando comercios…
          </Typography>
        </Box>
      )}

      {/* Contenido */}
      {!loading && comercios.length > 0 && (
        <>
          {activeTab === "destacados" ? (
            <Slider {...carouselSettings}>
              {comercios.map((c) => (
                <Box key={c.id} px={1}>
                  <ComercioCard comercio={c} />
                </Box>
              ))}
            </Slider>
          ) : (
            <Box className="container-fluid">
              <div className="row g-3">
                {comercios.map((c) => (
                  <div key={c.id} className="col-12 col-sm-6 col-md-4">
                    <ComercioCard comercio={c} />
                  </div>
                ))}
              </div>
            </Box>
          )}
        </>
      )}

      {!loading && comercios.length === 0 && (
        <Typography textAlign="center" mt={4}>
          No hay comercios disponibles
        </Typography>
      )}
    </Box>
  );
};

export default BusinessTabs;
