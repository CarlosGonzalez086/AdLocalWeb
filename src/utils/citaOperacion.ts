import type { CrearCitaDto } from "../services/citasApi";
import type { CheckoutStorage } from "./checkoutOperacion";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const FECHA_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00$/;

export interface ReservaCitaPendienteItem {
  key: string;
  dto: CrearCitaDto | null;
  corrupta: boolean;
}

function parsearReservaGuardada(raw: string): CrearCitaDto {
  const dto = JSON.parse(raw) as CrearCitaDto;
  if (
    !dto ||
    !UUID_RE.test(dto.idempotencyKey) ||
    !UUID_RE.test(dto.productoUuid) ||
    !FECHA_RE.test(dto.fechaInicio) ||
    typeof dto.nombrePersona !== "string" ||
    dto.nombrePersona.trim().length < 2 ||
    dto.nombrePersona.length > 100 ||
    typeof dto.zonaHoraria !== "string" ||
    !dto.zonaHoraria.includes("/") ||
    (dto.notas !== undefined &&
      (typeof dto.notas !== "string" || dto.notas.length > 500))
  ) {
    throw new Error(
      "La reserva guardada no es válida. Revisa tus citas antes de iniciar otra reserva.",
    );
  }
  return dto;
}

export class ReservaCitaOperacion {
  private readonly key: string;
  constructor(
    private storage: CheckoutStorage,
    cuenta: string,
    private clave: () => string = () => crypto.randomUUID(),
    productoUuid?: string,
  ) {
    this.key = productoUuid
      ? `adlocal.cita.pendiente.v1.${cuenta}.${productoUuid}`
      : `adlocal.cita.pendiente.v1.${cuenta}`;
  }
  static keysDeCuenta(
    storage: CheckoutStorage & Partial<Pick<Storage, "length" | "key">>,
    cuenta: string,
  ): string[] {
    const base = `adlocal.cita.pendiente.v1.${cuenta}`;
    if (
      typeof storage.length === "number" &&
      typeof storage.key === "function"
    ) {
      const keys: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (k && (k === base || k.startsWith(`${base}.`))) {
          keys.push(k);
        }
      }
      return keys;
    }
    return storage.getItem(base) !== null ? [base] : [];
  }
  static pendientes(
    storage: CheckoutStorage & Partial<Pick<Storage, "length" | "key">>,
    cuenta: string,
  ): ReservaCitaPendienteItem[] {
    return ReservaCitaOperacion.keysDeCuenta(storage, cuenta).map((key) => {
      const raw = storage.getItem(key);
      if (!raw) return { key, dto: null, corrupta: false };
      try {
        return { key, dto: parsearReservaGuardada(raw), corrupta: false };
      } catch {
        return { key, dto: null, corrupta: true };
      }
    });
  }
  static limpiarCuenta(
    storage: CheckoutStorage & Partial<Pick<Storage, "length" | "key">>,
    cuenta: string,
  ): void {
    for (const key of ReservaCitaOperacion.keysDeCuenta(storage, cuenta)) {
      storage.removeItem(key);
    }
  }
  pendiente(): CrearCitaDto | null {
    const raw = this.storage.getItem(this.key);
    if (!raw) return null;
    return parsearReservaGuardada(raw);
  }
  preparar(dto: Omit<CrearCitaDto, "idempotencyKey">): CrearCitaDto {
    const actual = this.pendiente();
    if (actual) return actual;
    const nueva = { ...dto, idempotencyKey: this.clave() };
    this.storage.setItem(this.key, JSON.stringify(nueva));
    return nueva;
  }
  completar(): void {
    this.storage.removeItem(this.key);
  }
}

export function diaCita(
  ahora = new Date(),
  zonaHoraria = "America/Mexico_City",
): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: zonaHoraria,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(ahora);
  const parte = (tipo: string) => partes.find((p) => p.type === tipo)?.value;
  return `${parte("year")}-${parte("month")}-${parte("day")}`;
}

// The API sends local wall time. Construct a display-only UTC value so a travelling
// browser cannot silently shift the appointment into its own timezone.
export function fechaCitaLocal(fecha: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: "UTC",
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(fecha.replace(/Z$/, "") + "Z"));
}
