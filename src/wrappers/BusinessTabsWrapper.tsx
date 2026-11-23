import React, { useCallback, useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "../api/apiResponse";
import BusinessTabs from "../components/business/BusinessTabs";
import HomeHero from "../components/business/HomeHero";
import {
  comercioPublicApi,
  type ComercioDtoListItem,
  type ComercioListadoResponse,
} from "../services/comercioPublicApi";

const PAGE_SIZE = 8;

const obtenerCoordenadas = (): Promise<{ lat: number; lng: number }> => {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return Promise.reject(new Error("Geolocalización no disponible"));
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      reject,
      { timeout: 10000, maximumAge: 60000 },
    );
  });
};

interface BusinessTabsWrapperProps {
  initialComercios?: ComercioDtoListItem[];
}

const BusinessTabsWrapper: React.FC<BusinessTabsWrapperProps> = ({
  initialComercios = [],
}) => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>(initialComercios);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(() =>
    initialComercios.length > 0 ? initialComercios.length >= PAGE_SIZE : true,
  );
  const isFirstMountRef = React.useRef(true);
  const initialCountRef = React.useRef(initialComercios.length);

  const [activeTab, setActiveTab] = useState<
    "destacados" | "populares" | "recientes" | "cercanos" | "sugeridos"
  >("destacados");

  const fetchComercios = useCallback(
    async (pageToLoad: number, reset = false) => {
      try {
        setLoading(true);
        setError(null);

        let response:
          | AxiosResponse<ApiResponse<ComercioListadoResponse>>
          | undefined;

        if (activeTab === "cercanos") {
          const coords = await obtenerCoordenadas();
          response = await comercioPublicApi.getCercanos(
            coords.lat,
            coords.lng,
            pageToLoad,
            PAGE_SIZE,
          );
        } else if (activeTab === "sugeridos") {
          const coords = await obtenerCoordenadas();
          response = await comercioPublicApi.getSugeridos(
            coords.lat,
            coords.lng,
            pageToLoad,
            PAGE_SIZE,
          );
        } else {
          switch (activeTab) {
            case "destacados":
              response = await comercioPublicApi.getDestacados(
                pageToLoad,
                PAGE_SIZE,
              );
              break;
            case "populares":
              response = await comercioPublicApi.getPopulares(
                pageToLoad,
                PAGE_SIZE,
              );
              break;
            case "recientes":
              response = await comercioPublicApi.getRecientes(
                pageToLoad,
                PAGE_SIZE,
              );
              break;
          }
        }

        const nuevos: ComercioDtoListItem[] =
          response?.data?.respuesta?.items ?? [];

        setComercios((prev) => (reset ? nuevos : [...prev, ...nuevos]));
        setHasMore(nuevos.length === PAGE_SIZE);
        setPage(pageToLoad + 1);
      } catch {
        if (reset) {
          setComercios([]);
        }
        setError("No se pudieron cargar los comercios");
      } finally {
        setLoading(false);
      }
    },
    [activeTab],
  );

  useEffect(() => {
    if (initialCountRef.current > 0 && activeTab === "destacados" && isFirstMountRef.current) {
      isFirstMountRef.current = false;
      setPage(2);
      return;
    }
    isFirstMountRef.current = false;
    setPage(1);
    setHasMore(true);
    void fetchComercios(1, true);
  }, [activeTab, fetchComercios]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      void fetchComercios(page, false);
    }
  };

  return (
    <div className="w-100">
      <HomeHero />
      <BusinessTabs
        comercios={comercios}
        loading={loading}
        error={error}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default BusinessTabsWrapper;
