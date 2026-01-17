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
  light: "#E8D8C8",
};

type TabKey = "destacados" | "populares" | "recientes" | "cercanos";

interface Props {
  comercios: ComercioDtoListItem[];
  loading?: boolean;
  error?: string | null;
  activeTab?: TabKey;
  setActiveTab?: Dispatch<SetStateAction<TabKey>>;
}

const BusinessTabs: React.FC<Props> = ({
  comercios,
  loading = false,
  error = null,
  activeTab: activeTabProp = "destacados",
  setActiveTab: setActiveTabProp,
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
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  if (error) {
    return <Typography textAlign="center">{error}</Typography>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ overflowX: "auto", mt: 1, mb: 3 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            bgcolor: "#f7ede6",
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
                sx={{
                  whiteSpace: "nowrap",
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
      </Box>

      {/* Loading */}
      {loading && (
        <Box
          minHeight="50vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress sx={{ color: coffee.main }} />
        </Box>
      )}

      {/* Content */}
      {!loading && comercios.length > 0 && (
        <>
          {activeTab == "destacados" ? (
            <Box sx={{ width: "100%", px: { xs: 1, sm: 2 } }}>
              {isMobile ? (
                <Box
                  sx={{
                    px: { xs: 1, sm: 3 },
                    maxHeight: {
                      xs: "calc(3 * 320px)",
                      sm: "calc(3 * 320px)",
                      md: "calc(4 * 320px)",
                    },

                    overflowY: "auto",
                    WebkitOverflowScrolling: "touch",
                    "&::-webkit-scrollbar": {
                      width: 6,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0,0,0,0.2)",
                      borderRadius: 8,
                    },
                  }}
                >
                  <div className="container-fluid">
                    <div className="row g-3">
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
              ) : (
                <Slider {...carouselSettings}>
                  {comercios.map((c) => (
                    <Box key={c.id} px={1}>
                      <ComercioCard comercio={c} />
                    </Box>
                  ))}
                </Slider>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                px: { xs: 1, sm: 3 },
                maxHeight: {
                  xs: "calc(3 * 320px)",
                  sm: "calc(3 * 320px)",
                  md: "calc(4 * 320px)",
                },

                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": {
                  width: 6,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: 8,
                },
              }}
            >
              <div className="container-fluid">
                <div className="row g-3">
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
        </>
      )}
    </Box>
  );
};

export default BusinessTabs;
