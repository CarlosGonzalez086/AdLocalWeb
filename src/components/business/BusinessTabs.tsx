import {
  CircularProgress,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Slider, { type Settings } from "react-slick";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import ComercioCard from "./ComercioCard";
import MaterialSymbol from "../UI/MaterialSymbol/MaterialSymbol";

import type { ComercioDtoListItem } from "../../services/comercioPublicApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type TabKey =
  | "destacados"
  | "sugeridos"
  | "populares"
  | "recientes"
  | "cercanos";

interface TabItem {
  label: string;
  key: TabKey;
  icon: string;
}

const tabs: TabItem[] = [
  {
    label: "Destacados",
    key: "destacados",
    icon: "star",
  },
  {
    label: "Sugeridos",
    key: "sugeridos",
    icon: "lightbulb",
  },
  {
    label: "Populares",
    key: "populares",
    icon: "local_fire_department",
  },
  {
    label: "Recientes",
    key: "recientes",
    icon: "schedule",
  },
  {
    label: "Cercanos",
    key: "cercanos",
    icon: "near_me",
  },
];

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

  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setActiveTab(activeTabProp);
  }, [activeTabProp]);

  const handleTabClick = (tab: TabKey) => {
    setActiveTab(tab);

    setActiveTabProp?.(tab);
  };

  const carouselSettings: Settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    adaptiveHeight: false,

    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const showCarousel = activeTab === "destacados" && !isMobileOrTablet;

  const showInitialLoading = loading && comercios.length === 0;

  const showError = !loading && Boolean(error) && comercios.length === 0;

  const showEmpty = !loading && !error && comercios.length === 0;

  return (
    <div className="businessTabs" aria-busy={loading}>
      <nav
        className="businessTabsViewport"
        aria-label="Categorías de comercios"
      >
        <div className="businessTabsList" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`businessTabButton fz-h4 fw-semibold ${
                  isActive ? "businessTabButtonActive" : ""
                }`}
                onClick={() => handleTabClick(tab.key)}
              >
                <MaterialSymbol
                  icon={tab.icon}
                  size="small"
                  filled={isActive}
                />

                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {showInitialLoading && (
        <div className="businessSkeletonGrid" aria-label="Cargando comercios">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div key={index} className="businessSkeletonCard">
              <Skeleton
                variant="rounded"
                animation="wave"
                className="businessSkeletonImage"
              />

              <div className="businessSkeletonContent">
                <Skeleton
                  variant="text"
                  animation="wave"
                  className="businessSkeletonTitle"
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  className="businessSkeletonText"
                />

                <Skeleton
                  variant="text"
                  animation="wave"
                  className="businessSkeletonTextShort"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {showError && (
        <div className="businessStateContainer" role="alert">
          <div className="businessStateIcon businessStateIconError">
            <MaterialSymbol icon="cloud_off" size="large" />
          </div>

          <h3 className="fz-h3 fw-semibold mb-0">
            No pudimos cargar los comercios
          </h3>

          <p className="businessStateDescription fz-h4 fw-regular">
            Verifica tu conexión e intenta nuevamente.
          </p>
        </div>
      )}

      {showEmpty && (
        <div className="businessStateContainer" aria-live="polite">
          <div className="businessStateIcon">
            <MaterialSymbol icon="storefront" size="large" />
          </div>

          <h3 className="fz-h3 fw-semibold mb-0">
            No hay comercios disponibles
          </h3>

          <p className="businessStateDescription fz-h4 fw-regular">
            Por el momento no encontramos comercios en esta categoría.
          </p>
        </div>
      )}

      {comercios.length > 0 && (
        <>
          {showCarousel ? (
            <div className="businessCarousel">
              <Slider {...carouselSettings}>
                {comercios.map((comercio) => (
                  <div key={comercio.id} className="businessCarouselItem">
                    <ComercioCard comercio={comercio} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="businessCardsGrid">
              {comercios.map((comercio) => (
                <div key={comercio.id} className="businessCardItem">
                  <ComercioCard comercio={comercio} />
                </div>
              ))}
            </div>
          )}

          {hasMore && (
            <div className="businessLoadMore">
              <button
                type="button"
                className="btn-adlocal fz-h4 fw-semibold"
                onClick={onLoadMore}
                disabled={loading || !onLoadMore}
              >
                <div className="d-flex align-items-center justify-content-center gap-2">
                  {loading ? (
                    <CircularProgress
                      size={17}
                      thickness={4}
                      className="businessLoadMoreSpinner"
                    />
                  ) : (
                    <MaterialSymbol icon="expand_more" size="small" />
                  )}

                  <span>
                    {loading ? "Cargando comercios" : "Ver más comercios"}
                  </span>
                </div>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BusinessTabs;
