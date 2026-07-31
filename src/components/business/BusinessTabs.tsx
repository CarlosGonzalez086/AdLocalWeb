import {
  CircularProgress,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Slider, { type Settings } from "react-slick";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import ComercioCard from "./ComercioCard";
import styles from "../../styles/BusinessTabs.module.css";

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

type IconSize = "small" | "medium" | "large";

interface MaterialSymbolProps {
  icon: string;
  size?: IconSize;
  filled?: boolean;
}

const MaterialSymbol = ({
  icon,
  size = "medium",
  filled = false,
}: MaterialSymbolProps) => {
  const sizeClass = {
    small: styles.materialSymbolSmall,
    medium: styles.materialSymbolMedium,
    large: styles.materialSymbolLarge,
  }[size];

  return (
    <span
      aria-hidden="true"
      className={[
        styles.materialSymbol,
        sizeClass,
        filled ? styles.materialSymbolFilled : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon}
    </span>
  );
};

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
    <section className={styles.businessTabs} aria-busy={loading}>
      <nav className={styles.tabsViewport} aria-label="Categorías de comercios">
        <div className={styles.tabsList} role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={[
                  styles.tabButton,
                  isActive ? styles.tabButtonActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
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
        <div className={styles.skeletonGrid} aria-label="Cargando comercios">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.skeletonCard}>
              <Skeleton
                variant="rounded"
                animation="wave"
                className={styles.skeletonImage}
              />

              <Skeleton
                variant="text"
                animation="wave"
                className={styles.skeletonTitle}
              />

              <Skeleton
                variant="text"
                animation="wave"
                className={styles.skeletonText}
              />

              <Skeleton
                variant="text"
                animation="wave"
                className={styles.skeletonTextShort}
              />
            </div>
          ))}
        </div>
      )}

      {showError && (
        <div className={styles.stateContainer} role="alert">
          <div className={styles.stateIcon}>
            <MaterialSymbol icon="cloud_off" size="large" />
          </div>

          <h3 className={styles.stateTitle}>No pudimos cargar los comercios</h3>

          <p className={styles.stateDescription}>
            Verifica tu conexión e intenta nuevamente.
          </p>
        </div>
      )}

      {showEmpty && (
        <div className={styles.stateContainer} aria-live="polite">
          <div className={styles.stateIcon}>
            <MaterialSymbol icon="storefront" size="large" />
          </div>

          <h3 className={styles.stateTitle}>No hay comercios disponibles</h3>

          <p className={styles.stateDescription}>
            Por el momento no encontramos comercios en esta categoría.
          </p>
        </div>
      )}

      {comercios.length > 0 && (
        <>
          {showCarousel ? (
            <div className={styles.carousel}>
              <Slider {...carouselSettings}>
                {comercios.map((comercio) => (
                  <div key={comercio.id} className={styles.carouselItem}>
                    <ComercioCard comercio={comercio} />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {comercios.map((comercio) => (
                <div key={comercio.id} className={styles.cardItem}>
                  <ComercioCard comercio={comercio} />
                </div>
              ))}
            </div>
          )}

          {hasMore && (
            <div className={styles.loadMoreContainer}>
              <button
                type="button"
                className={styles.loadMoreButton}
                onClick={onLoadMore}
                disabled={loading || !onLoadMore}
              >
                {loading ? (
                  <CircularProgress
                    size={18}
                    thickness={4}
                    className={styles.loadMoreSpinner}
                  />
                ) : (
                  <MaterialSymbol icon="expand_more" size="medium" />
                )}

                <span>
                  {loading ? "Cargando comercios" : "Ver más comercios"}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BusinessTabs;
