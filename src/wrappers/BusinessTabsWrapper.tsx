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

const BusinessTabsWrapper: React.FC = () => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

        if (
          activeTab === "cercanos" &&
          typeof window !== "undefined" &&
          navigator.geolocation
        ) {
          response = await new Promise<
            AxiosResponse<ApiResponse<ComercioListadoResponse>>
          >((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(async (pos) => {
              try {
                const resp = await comercioPublicApi.getCercanos(
                  pos.coords.latitude,
                  pos.coords.longitude,
                  pageToLoad,
                  PAGE_SIZE,
                );
                resolve(resp);
              } catch (e) {
                reject(e);
              }
            }, reject);
          });
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
            case "sugeridos":
              response = await new Promise<
                AxiosResponse<ApiResponse<ComercioListadoResponse>>
              >((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(async (pos) => {
                  try {
                    const resp = await comercioPublicApi.getSugeridos(
                      pos.coords.latitude,
                      pos.coords.longitude,
                      pageToLoad,
                      PAGE_SIZE,
                    );
                    resolve(resp);
                  } catch (e) {
                    reject(e);
                  }
                }, reject);
              });
              break;
          }
        }

        const nuevos: ComercioDtoListItem[] =
          response?.data?.respuesta?.items ?? [];

        setComercios((prev) => (reset ? nuevos : [...prev, ...nuevos]));
        setHasMore(nuevos.length === PAGE_SIZE);
        setPage(pageToLoad + 1);
      } catch {
        setError("No se pudieron cargar los comercios");
      } finally {
        setLoading(false);
      }
    },
    [activeTab],
  );

  useEffect(() => {
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
