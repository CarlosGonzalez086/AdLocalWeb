import React, { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import Slider from "react-slick";
import ComercioCard from "./ComercioCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { ComercioDtoListItem } from "../../services/comercioPublicApi";

const tabs = [
  { label: "Destacados", key: "destacados" },
  { label: "Populares", key: "populares" },
  { label: "Más Recientes", key: "recientes" },
  { label: "Más Cercanos", key: "cercanos" },
];

export const coffee = {
  main: "#5B3A29",
  dark: "#3A2419",
  light: "#E8D8C8",
};

interface BusinessTabsProps {
  comercios: ComercioDtoListItem[]; 
  loading?: boolean; 
  error?: string | null;
  activeTab?: "destacados" | "populares" | "recientes" | "cercanos";
  setActiveTab?: Dispatch<SetStateAction<"destacados" | "populares" | "recientes" | "cercanos">> | undefined;
}

const BusinessTabs: React.FC<BusinessTabsProps> = ({
  comercios,
  loading = false,
  error = null,
  activeTab: activeTabProp = "destacados",
  setActiveTab: setActiveTabProp,
}) => {
  const [activeTab, setActiveTab] = useState(activeTabProp);

  useEffect(() => {
    setActiveTab(activeTabProp);
  }, [activeTabProp]);

  const handleTabClick = (tabKey: "destacados" | "populares" | "recientes" | "cercanos") => {
    setActiveTab(tabKey);
    if (setActiveTabProp) setActiveTabProp(tabKey);
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
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={1} justifyContent="center" mb={3}>
        {tabs.map((t) => (
          <Button
            key={t.key}
            onClick={() => handleTabClick(t.key as "destacados" | "populares" | "recientes" | "cercanos")}
            variant={activeTab === t.key ? "contained" : "outlined"}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              color: activeTab === t.key ? "#fff" : coffee.main,
              backgroundColor: activeTab === t.key ? coffee.main : coffee.light,
              borderColor: coffee.main,
              boxShadow: activeTab === t.key ? 3 : 0,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: activeTab === t.key ? coffee.dark : coffee.main,
                color: "#fff",
              },
            }}
          >
            {t.label}
          </Button>
        ))}
      </Stack>

      {loading && (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            p: 3,
          }}
        >
          <CircularProgress size={60} thickness={4.5} sx={{ color: "#6F4E37" }} />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "text.secondary",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          >
            Cargando comercios...
          </Typography>
          <style>{`
            @keyframes pulse {
              0% { opacity: 0.4; }
              50% { opacity: 1; }
              100% { opacity: 0.4; }
            }
          `}</style>
        </Box>
      )}

      {!loading && comercios.length > 0 && (
        <Box>
          {activeTab === "destacados" ? (
            <Slider {...carouselSettings} className="p-3">
              {comercios.map((c) => (
                <Box key={c.id} sx={{ px: 1 }}>
                  <ComercioCard comercio={c} />
                </Box>
              ))}
            </Slider>
          ) : (
            <div className="p-3 w-100">
              <div className="row gap-3">
                {comercios.map((c) => (
                  <div key={c.id} className="col-12 col-sm-6 col-md-4">
                    <ComercioCard comercio={c} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Box>
      )}

      {!loading && comercios.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          No hay comercios disponibles
        </Typography>
      )}
    </Box>
  );
};

export default BusinessTabs;
