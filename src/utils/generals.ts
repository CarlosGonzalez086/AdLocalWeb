import dayjs from "dayjs";
import type { ComercioDto } from "../services/comercioPublicApi";

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