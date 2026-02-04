import { Box, Button, CircularProgress, Stack } from "@mui/material";
import Slider from "react-slick";
import ComercioCard from "./ComercioCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { ComercioDtoListItem } from "../../services/comercioPublicApi";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const tabs = [
  { label: "Destacados", key: "destacados" },
  { label: "Populares", key: "populares" },
  { label: "Más recientes", key: "recientes" },
  { label: "Cercanos", key: "cercanos" },
];

export const coffee = {
  main: "#8a583e",
  dark: "#3A2419",
};

type TabKey = "destacados" | "populares" | "recientes" | "cercanos";

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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1.2, arrows: false } },
    ],
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          bgcolor: "#f7ede6",
          p: 1,
          borderRadius: 999,
          width: "fit-content",
          mx: "auto",
          mb: 3,
        }}
      >
        {tabs.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <Button
              key={t.key}
              onClick={() => handleTabClick(t.key as TabKey)}
              sx={{
                borderRadius: 999,
                px: 3,
                fontWeight: 600,
                textTransform: "none",
                color: isActive ? "#fff" : coffee.main,
                backgroundColor: isActive ? coffee.main : "transparent",
              }}
            >
              {t.label}
            </Button>
          );
        })}
      </Stack>

      {loading && comercios.length === 0 && (
        <Box textAlign="center" py={6}>
          <CircularProgress sx={{ color: coffee.main }} />
        </Box>
      )}

      {!loading && error && comercios.length === 0 && (
        <Box textAlign="center" color="error.main">
          Algo salió mal 😕
        </Box>
      )}

      {comercios.length > 0 && (
        <>
          {activeTab === "destacados" && !isMobile ? (
            <Slider {...carouselSettings}>
              {comercios.map((c) => (
                <Box key={c.id} px={1}>
                  <ComercioCard comercio={c} />
                </Box>
              ))}
            </Slider>
          ) : (
            <Box px={2}>
              <div className="container-fluid">
                <div className="row g-4">
                  {comercios.map((c) => (
                    <div
                      key={c.id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <ComercioCard comercio={c} />
                    </div>
                  ))}
                </div>
              </div>
            </Box>
          )}

          {hasMore && (
            <Box textAlign="center" mt={4}>
              <Button
                onClick={onLoadMore}
                disabled={loading}
                variant="contained"
                sx={{
                  bgcolor: coffee.main,
                  px: 4,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor: coffee.dark },
                }}
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
