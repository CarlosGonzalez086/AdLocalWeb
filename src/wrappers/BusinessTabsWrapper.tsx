import { useEffect, useState } from "react";
import BusinessTabs from "../components/business/BusinessTabs";
import {
  comercioPublicApi,
  type ComercioDtoListItem,
} from "../services/comercioPublicApi";

const BusinessTabsWrapper: React.FC = () => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "destacados" | "populares" | "recientes" | "cercanos"
  >("destacados");
  const fetchComercios = async () => {
    try {
      setLoading(true);
      let response;

      if (
        activeTab === "cercanos" &&
        typeof window !== "undefined" &&
        navigator.geolocation
      ) {
        response = await new Promise<any>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              try {
                const resp = await comercioPublicApi.getCercanos(
                  pos.coords.latitude,
                  pos.coords.longitude,
                );
                resolve(resp);
              } catch (apiError) {
                reject(apiError);
              }
            },
            (geoError) => {
              reject(geoError);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
            },
          );
        });

        setComercios(response.data.respuesta ?? []);
      } else {
        switch (activeTab) {
          case "destacados":
            response = await comercioPublicApi.getDestacados();
            break;
          case "populares":
            response = await comercioPublicApi.getPopulares();
            break;
          case "recientes":
            response = await comercioPublicApi.getRecientes();
            break;
        }

        setComercios(response?.data.respuesta ?? []);
      }
    } catch (err) {
      console.error("Error fetchComercios:", err);
      setError(
        "No pudimos obtener los comercios cercanos. Revisa tu conexión o permisos de ubicación.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComercios();
  }, [activeTab]);

  return (
    <BusinessTabs
      comercios={comercios}
      loading={loading}
      error={error}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

export default BusinessTabsWrapper;
