import dayjs from "dayjs";
import type { ComercioDto } from "../services/comercioPublicApi";
import * as turf from "@turf/turf";
import type { Feature, Polygon, MultiPolygon, FeatureCollection } from "geojson";
import { arcgisToGeoJSON } from "@esri/arcgis-to-geojson-utils";

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
  horarios: ComercioDto["horarios"] | undefined
) => {
  if (!horarios) return false;

  const ahora = new Date();
  const diaHoy = ahora.getDay();
  const horaActual = ahora.toTimeString().slice(0, 5); // HH:mm

  const horarioHoy = horarios.find((h) => h.dia === diaHoy);

  if (!horarioHoy || !horarioHoy.abierto) return false;

  return (
    horarioHoy.horaApertura! <= horaActual &&
    horaActual <= horarioHoy.horaCierre!
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
}

export function getMunicipioFromLatLng(
  lat: number,
  lng: number,
  municipios: GeoJSON.FeatureCollection
): string | null {

  const pt = turf.point([lng, lat]);

  for (const feature of municipios.features) {

    if (
      feature.geometry.type === "Polygon" ||
      feature.geometry.type === "MultiPolygon"
    ) {
      if (turf.booleanPointInPolygon(pt, feature as Feature<Polygon | MultiPolygon>)) {
        return feature.properties?.NOM_MUN ?? null;
      }
    }
  }

  return null;
}

export function esriToGeoJSON(esriData: any): FeatureCollection {
  if (!esriData || !Array.isArray(esriData.features)) {
    console.warn("ESRI inválido:", esriData);
    return {
      type: "FeatureCollection",
      features: [],
    };
  }

  return {
    type: "FeatureCollection",
    features: esriData.features.map((f: any) => {
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
      }
    );
  });
}


export async function getPublicIp(): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) return null;

    const data: { ip: string } = await res.json();
    return data.ip;
  } catch (error) {
    console.error("Error obteniendo IP:", error);
    return null;
  }
}
