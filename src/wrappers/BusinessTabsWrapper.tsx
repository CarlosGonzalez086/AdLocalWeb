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

  useEffect(() => {
    const fetchComercios = async () => {
      try {
        setLoading(true);
        let response;
        if (
          activeTab === "cercanos" &&
          typeof window !== "undefined" &&
          navigator.geolocation
        ) {
          await new Promise<void>((resolve) => {
            navigator.geolocation.getCurrentPosition(
              async (pos) => {
                response = await comercioPublicApi.getCercanos(
                  pos.coords.latitude,
                  pos.coords.longitude
                );
                setComercios(response.data.respuesta ?? []);
                resolve();
              },
              async () => {
                response = await comercioPublicApi.getPopulares();
                setComercios(response.data.respuesta ?? []);
                resolve();
              }
            );
          });
        } else {
          switch (activeTab) {
            case "destacados":
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
        console.error(err);
        setError("Error al cargar los comercios");
      } finally {
        setLoading(false);
      }
    };

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
