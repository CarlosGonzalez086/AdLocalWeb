import React, { useEffect, useState } from "react";
import { comercioPublicApi, type ComercioDtoListItem } from "../services/comercioPublicApi";
import BusinessTabs from "../components/business/BusinessTabs";

const BusinessTabsWrapper: React.FC = () => {
  const [comercios, setComercios] = useState<ComercioDtoListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"destacados" | "populares" | "recientes" | "cercanos">("destacados");

  const fetchComercios = async (tab: string) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      switch (tab) {
        case "destacados":
        case "populares":
          response = await comercioPublicApi.getPopulares();
          break;
        case "recientes":
          response = await comercioPublicApi.getRecientes();
          break;
        case "cercanos":
          if (navigator.geolocation) {
            response = await new Promise<any>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                async (pos) => {
                  const r = await comercioPublicApi.getCercanos(pos.coords.latitude, pos.coords.longitude);
                  resolve(r);
                },
                async () => {
                  const r = await comercioPublicApi.getPopulares();
                  resolve(r);
                }
              );
            });
          } else {
            response = await comercioPublicApi.getPopulares();
          }
          break;
      }

      setComercios(response.data.respuesta ?? []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los comercios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComercios(activeTab);
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
