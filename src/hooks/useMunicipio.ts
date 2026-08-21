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

interface GoogleGeocodeAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleGeocodeResult {
  address_components: GoogleGeocodeAddressComponent[];
  types: string[];
}

interface GoogleGeocodeResponse {
  results: GoogleGeocodeResult[];
  status: string;
}

const CACHE_KEY = "municipioActual";
const CACHE_TIME = 1000 * 60 * 10;

const obtenerUbicacion = (): Promise<Ubicacion> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no soportada"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      reject,
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 60000,
      },
    );
  });

const obtenerMunicipioDesdeGeocode = (
  results: GoogleGeocodeResult[],
): string | null => {
  for (const result of results) {
    if (result.types.includes("plus_code")) {
      continue;
    }

    const municipio = result.address_components.find((component) =>
      component.types.includes("administrative_area_level_2"),
    );

    if (municipio) {
      return municipio.long_name;
    }
  }

  return null;
};

const obtenerCache = (): MunicipioCache | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);

    if (!raw) {
      return null;
    }

    const cache = JSON.parse(raw) as MunicipioCache;

    const cacheValido =
      typeof cache.timestamp === "number" &&
      typeof cache.lat === "number" &&
      typeof cache.lng === "number" &&
      Date.now() - cache.timestamp < CACHE_TIME;

    if (!cacheValido) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cache;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

const guardarCache = (municipio: string | null, ubicacion: Ubicacion): void => {
  const cache: MunicipioCache = {
    municipio,
    lat: ubicacion.lat,
    lng: ubicacion.lng,
    timestamp: Date.now(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

export const useMunicipio = () => {
  const [municipioActual, setMunicipioActual] = useState<string | null>(null);
  const [ubicacionActual, setUbicacionActual] = useState<Ubicacion | null>(
    null,
  );
  const [loadingMunicipios, setLoadingMunicipios] = useState(true);
  const [errorMunicipio, setErrorMunicipio] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    const detectarMunicipio = async () => {
      try {
        setLoadingMunicipios(true);
        setErrorMunicipio(null);

        const cache = obtenerCache();

        if (cache) {
          if (!activo) return;

          setMunicipioActual(cache.municipio);
          setUbicacionActual({
            lat: cache.lat,
            lng: cache.lng,
          });

          return;
        }

        const ubicacion = await obtenerUbicacion();

        if (!activo) return;

        setUbicacionActual(ubicacion);

        const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          throw new Error("Falta PUBLIC_GOOGLE_MAPS_API_KEY");
        }

        const { data } = await axios.get<GoogleGeocodeResponse>(
          "https://maps.googleapis.com/maps/api/geocode/json",
          {
            params: {
              latlng: `${ubicacion.lat},${ubicacion.lng}`,
              key: apiKey,
              language: "es",
              result_type: "locality|administrative_area_level_2",
            },
          },
        );

        if (!activo) return;

        if (data.status !== "OK") {
          throw new Error(
            `Google Geocoding respondió con estado: ${data.status}`,
          );
        }

        const municipio = obtenerMunicipioDesdeGeocode(data.results);

        guardarCache(municipio, ubicacion);

        setMunicipioActual(municipio);
      } catch (error) {
        if (!activo) return;

        console.warn("No se pudo detectar el municipio:", error);

        setMunicipioActual(null);

        setErrorMunicipio(
          error instanceof Error
            ? error.message
            : "No se pudo obtener la ubicación",
        );
      } finally {
        if (activo) {
          setLoadingMunicipios(false);
        }
      }
    };

    detectarMunicipio();

    return () => {
      activo = false;
    };
  }, []);

  return {
    municipioActual,
    ubicacionActual,
    loadingMunicipios,
    errorMunicipio,
  };
};
