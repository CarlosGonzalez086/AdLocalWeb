import { useEffect, useState } from "react";
import axios from "axios";

interface Ubicacion {
  lat: number;
  lng: number;
}

interface MunicipioCache {
  municipio: string | null;
  lat: number | null;
  lng: number | null;
  timestamp: number;
}

const CACHE_TIME = 1000 * 60 * 10; // 10 minutos

const obtenerUbicacion = (): Promise<Ubicacion> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject("Geolocalización no soportada");

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  });

export const useMunicipio = () => {
  const [municipioActual, setMunicipioActual] = useState<string | null>(() => {
    const cache = localStorage.getItem("municipioActual");
    if (!cache) return null;
    try {
      const parsed: MunicipioCache = JSON.parse(cache);
      return parsed.municipio;
    } catch {
      return null;
    }
  });

  const [ubicacionActual, setUbicacionActual] = useState<Ubicacion | null>(() => {
    const cache = localStorage.getItem("municipioActual");
    if (!cache) return null;
    try {
      const parsed: MunicipioCache = JSON.parse(cache);
      return parsed.lat && parsed.lng ? { lat: parsed.lat, lng: parsed.lng } : null;
    } catch {
      return null;
    }
  });

  const [loadingMunicipios, setLoadingMunicipios] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingMunicipios(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let watchId: number;

    const detectarMunicipio = async () => {
      try {
        const { lat, lng } = await obtenerUbicacion();
        const API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!API_KEY) throw new Error("Falta la API Key de Google Maps");

        // Verificar cache
        const cacheRaw = localStorage.getItem("municipioActual");
        if (cacheRaw) {
          const cache: MunicipioCache = JSON.parse(cacheRaw);
          const ahora = Date.now();

          if (ahora - cache.timestamp < CACHE_TIME) {
            // Todavía dentro del tiempo de cache, usarlo
            setMunicipioActual(cache.municipio);
            setUbicacionActual({ lat: cache.lat!, lng: cache.lng! });
            return;
          }
        }

        // Si no hay cache o ya expiró, consultamos Google Maps
        const { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json",
          { params: { latlng: `${lat},${lng}`, key: API_KEY } },
        );

        const municipio =
          data.results
            ?.flatMap((r: any) => r.address_components)
            .find((comp: any) =>
              comp.types.includes("administrative_area_level_2"),
            )?.long_name ?? null;

        const nuevoCache: MunicipioCache = { municipio, lat, lng, timestamp: Date.now() };
        localStorage.setItem("municipioActual", JSON.stringify(nuevoCache));

        setMunicipioActual(municipio);
        setUbicacionActual({ lat, lng });

      } catch (e: any) {
        if (e.response)
          console.error("Error en respuesta de Google:", e.response.data);
        else if (e.request)
          console.error("No se recibió respuesta:", e.request);
        else console.error("Error configurando la solicitud:", e.message);
      }
    };

    // Detectar municipio al montar el componente
    detectarMunicipio();

    // Actualizar si la posición cambia
    watchId = navigator.geolocation.watchPosition(
      detectarMunicipio,
      (err) => console.error("Geolocation error:", err),
      { enableHighAccuracy: true, maximumAge: 15000, timeout: 10000 },
    );

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { municipioActual, ubicacionActual, loadingMunicipios };
};
