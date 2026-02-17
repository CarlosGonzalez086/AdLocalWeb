import { useEffect, useState } from "react";
import BusinessTabs from "../components/business/BusinessTabs";
import {
  comercioPublicApi,
  type ComercioDtoListItem,
} from "../services/comercioPublicApi";

const PAGE_SIZE = 10;

const BusinessTabsWrapper: React.FC = () => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "destacados" | "populares" | "recientes" | "cercanos" | "sugeridos"
  >("destacados");

  const fetchComercios = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const currentPage = reset ? 1 : page;
      let response;

      if (
        activeTab === "cercanos" &&
        typeof window !== "undefined" &&
        navigator.geolocation
      ) {
        response = await new Promise<any>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
              const resp = await comercioPublicApi.getCercanos(
                pos.coords.latitude,
                pos.coords.longitude,
                currentPage,
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
              currentPage,
              PAGE_SIZE,
            );
            break;
          case "populares":
            response = await comercioPublicApi.getPopulares(
              currentPage,
              PAGE_SIZE,
            );
            break;
          case "recientes":
            response = await comercioPublicApi.getRecientes(
              currentPage,
              PAGE_SIZE,
            );
            break;
          case "sugeridos":
            response = await new Promise<any>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(async (pos) => {
                try {
                  const resp = await comercioPublicApi.getSugeridos(
                    pos.coords.latitude,
                    pos.coords.longitude,
                    currentPage,
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

      const nuevos: ComercioDtoListItem[] = response.data.respuesta.items ?? [];

      setComercios((prev) => (reset ? nuevos : [...prev, ...nuevos]));

      setHasMore(nuevos.length === PAGE_SIZE);
      setPage(currentPage + 1);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los comercios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchComercios(true);
  }, [activeTab]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchComercios();
    }
  };

  return (
    <BusinessTabs
      comercios={comercios}
      loading={loading}
      error={error}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
    />
  );
};

export default BusinessTabsWrapper;
