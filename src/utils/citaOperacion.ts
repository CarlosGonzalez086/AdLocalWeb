import type { CrearCitaDto } from "../services/citasApi";
import type { CheckoutStorage } from "./checkoutOperacion";

export class ReservaCitaOperacion {
  private readonly key: string;
  constructor(
    private storage: CheckoutStorage,
    cuenta: string,
    private clave: () => string = () => crypto.randomUUID(),
  ) {
    this.key = `adlocal.cita.pendiente.v1.${cuenta}`;
  }
  pendiente(): CrearCitaDto | null {
    const raw = this.storage.getItem(this.key);
    if (!raw) return null;
    const dto = JSON.parse(raw) as CrearCitaDto;
    const uuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (
      !dto ||
      !uuid.test(dto.idempotencyKey) ||
      !uuid.test(dto.productoUuid) ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00$/.test(dto.fechaInicio) ||
      typeof dto.nombrePersona !== "string" ||
      dto.nombrePersona.trim().length < 2 ||
      dto.nombrePersona.length > 100 ||
      typeof dto.zonaHoraria !== "string" ||
      !dto.zonaHoraria.includes("/") ||
      (dto.notas !== undefined &&
        (typeof dto.notas !== "string" || dto.notas.length > 500))
    )
      throw new Error(
        "La reserva guardada no es válida. Revisa tus citas antes de iniciar otra reserva.",
      );
    return dto;
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
