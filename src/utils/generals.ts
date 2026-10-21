import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { ComercioDto } from "../services/comercioPublicApi";
import * as turf from "@turf/turf";
import type {
  Feature,
  Polygon,
  MultiPolygon,
  FeatureCollection,
} from "geojson";
import { arcgisToGeoJSON } from "@esri/arcgis-to-geojson-utils";

dayjs.extend(customParseFormat);

export const DIAS_SEMANA_MAP: Record<number, string> = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

export const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const estaAbiertoAhora = (
  horarios: ComercioDto["horarios"] | undefined,
  zonaHoraria = "America/Mexico_City",
  ahora = new Date(),
) => {
  if (!horarios) return false;

  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: zonaHoraria,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(ahora);
  const parte = (tipo: string) =>
    partes.find((p) => p.type === tipo)?.value ?? "";
  const diaHoy = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    parte("weekday"),
  );
  const horaActual = `${parte("hour")}:${parte("minute")}`;

  const horarioHoy = horarios.find((h) => h.dia === diaHoy);

  if (!horarioHoy || !horarioHoy.abierto) return false;

  return (
    (horarioHoy.horaApertura?.slice(0, 5) ?? "99:99") <= horaActual &&
    horaActual < (horarioHoy.horaCierre?.slice(0, 5) ?? "00:00")
  );
};

export const slugifyConId = (id: number, nombre: string) => {
  return `${id}_${nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "_")}`;
};

export const formatHoraSimple = (hora?: string) => {
  if (!hora) return "--";

  // Limpiar espacios
  const cleanHora = hora.trim();

  // Intentar primero HH:mm:ss
  let parsed = dayjs(cleanHora, "HH:mm:ss", true);
  if (!parsed.isValid()) {
    // Intentar HH:mm
    parsed = dayjs(cleanHora, "HH:mm", true);
  }

  return parsed.isValid() ? parsed.format("HH:mm") : "--";
};

export function getMunicipioFromLatLng(
  lat: number,
  lng: number,
  municipios: GeoJSON.FeatureCollection,
): string | null {
  const pt = turf.point([lng, lat]);

  for (const feature of municipios.features) {
    if (
      feature.geometry.type === "Polygon" ||
      feature.geometry.type === "MultiPolygon"
    ) {
      if (
        turf.booleanPointInPolygon(
          pt,
          feature as Feature<Polygon | MultiPolygon>,
        )
      ) {
        return feature.properties?.NOM_MUN ?? null;
      }
    }
  }

  return null;
}

export interface EsriFeatureInput {
  attributes?: {
    NOMGEO?: string | null;
    CVE_ENT?: string | null;
    CVE_MUN?: string | null;
  };
  [key: string]: unknown;
}

export interface EsriDataInput {
  features?: EsriFeatureInput[];
  [key: string]: unknown;
}

export function esriToGeoJSON(
  esriData: EsriDataInput | null | undefined,
): FeatureCollection {
  if (!esriData || !Array.isArray(esriData.features)) {
    return {
      type: "FeatureCollection",
      features: [],
    };
  }

  return {
    type: "FeatureCollection",
    features: esriData.features.map((f: EsriFeatureInput) => {
      const geo = arcgisToGeoJSON(f);
      geo.properties = {
        NOMGEO: f.attributes?.NOMGEO ?? null,
        CVE_ENT: f.attributes?.CVE_ENT ?? null,
        CVE_MUN: f.attributes?.CVE_MUN ?? null,
      };
      return geo;
    }),
  };
}

export function obtenerUbicacion(): Promise<{
  lat: number;
  lng: number;
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no soportada"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
}

export async function getPublicIp(): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) return null;

    const data: { ip: string } = await res.json();
    return data.ip;
  } catch {
    return null;
  }
}
