import { useEffect, useState } from "react";
import axios from "axios";

interface Ubicacion {
  lat: number;
  lng: number;
}

interface MunicipioCache {
  municipio: string | null;
  lat: number;
  lng: number;
  timestamp: number;
}

const CACHE_TIME = 1000 * 60 * 10; // 10 minutos

const obtenerUbicacion = (): Promise<Ubicacion> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error("Geolocalización no soportada"));

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => reject(err),
      {
        enableHighAccuracy: false, // 🔥 CLAVE
        timeout: 20000, // más tolerante
        maximumAge: 60000, // reutiliza cache del navegador
      },
    );
  });

const obtenerMunicipioDesdeGeocode = (results: any[]): string | null => {
  for (const r of results) {
    // ❌ Ignorar resultados solo plus_code
    if (r.types?.includes("plus_code")) continue;

    for (const comp of r.address_components) {
      if (comp.types.includes("administrative_area_level_2")) {
        return comp.long_name;
      }
    }
  }
  return null;
};

export const useMunicipio = () => {
  const [municipioActual, setMunicipioActual] = useState<string | null>(null);
  const [ubicacionActual, setUbicacionActual] = useState<Ubicacion | null>(
    null,
  );
  const [loadingMunicipios, setLoadingMunicipios] = useState(true);

  useEffect(() => {
    const detectarMunicipio = async () => {
      try {
        // 📦 Intentar cache primero
        const cacheRaw = localStorage.getItem("municipioActual");
        if (cacheRaw) {
          const cache: MunicipioCache = JSON.parse(cacheRaw);
          if (Date.now() - cache.timestamp < CACHE_TIME) {
            setMunicipioActual(cache.municipio);
            setUbicacionActual({ lat: cache.lat, lng: cache.lng });
            setLoadingMunicipios(false);
            return;
          }
        }

        // 📍 Obtener ubicación
        const coords = await obtenerUbicacion();
        console.log(coords);

        const API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
        if (!API_KEY) throw new Error("Falta API Key Google Maps");

        const { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json",
          {
            params: {
              latlng: `${coords.lat},${coords.lng}`,
              key: API_KEY,
              language: "es", // 🔥 importante
              result_type: "locality|administrative_area_level_2",
            },
          },
        );
        console.log(data);

        const municipio = obtenerMunicipioDesdeGeocode(data.results);
        console.log(municipio);

        const nuevoCache: MunicipioCache = {
          municipio,
          lat: coords.lat,
          lng: coords.lng,
          timestamp: Date.now(),
        };

        localStorage.setItem("municipioActual", JSON.stringify(nuevoCache));

        setMunicipioActual(municipio);
        setUbicacionActual(coords);
      } catch (err) {
        console.warn("No se pudo detectar ubicación, usando fallback");
        setMunicipioActual(null);
      } finally {
        setLoadingMunicipios(false);
      }
    };

    detectarMunicipio();
  }, []);

  return { municipioActual, ubicacionActual, loadingMunicipios };
};
