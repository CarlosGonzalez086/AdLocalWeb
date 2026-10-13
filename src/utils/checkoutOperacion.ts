import type { ConfirmarCheckoutDto } from "../types/checkout";

export const MENSAJE_CHECKOUT_INCIERTO =
  "Todavía no podemos comprobar si tu pedido se creó. Recupera el resultado con el botón de abajo antes de realizar otra compra.";

export interface CheckoutStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// La cuenta delimita la operación; no se almacena el JWT en el registro de checkout.
export function cuentaCheckout(): string {
  const token = window.localStorage.getItem("jwtCliente") ?? "";
  const segment = token.split(".")[1];
  if (!segment) throw new Error("Inicia sesión antes de confirmar el pedido.");
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(
    window.atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
  );
  const id = String(payload.id ?? "");
  if (!/^\d+$/.test(id) || Number(id) <= 0)
    throw new Error(
      "No se pudo identificar tu cuenta. Vuelve a iniciar sesión.",
    );
  return id;
}

export class CheckoutOperacion {
  private readonly key: string;
  private vuelo: Promise<unknown> | null = null;

  constructor(
    private storage: CheckoutStorage,
    cuenta: string,
    private crearClave: () => string = () => crypto.randomUUID(),
  ) {
    this.key = `adlocal.checkout.pendiente.v1.${cuenta}`;
  }

  pendiente(): ConfirmarCheckoutDto | null {
    const raw = this.storage.getItem(this.key);
    if (!raw) return null;
    const dto = JSON.parse(raw) as ConfirmarCheckoutDto;
    if (
      !dto.idempotencyKey ||
      !dto.carritoUuid ||
      !dto.carritoVersion ||
      !Array.isArray(dto.comercios)
    )
      throw new Error(
        "No se pudo leer la compra pendiente. Revisa tus pedidos antes de volver a comprar.",
      );
    return dto;
  }

  preparar(dto: ConfirmarCheckoutDto): ConfirmarCheckoutDto {
    const pendiente = this.pendiente();
    if (pendiente) return pendiente;
    const operation = { ...dto, idempotencyKey: this.crearClave() };
    // Si falla el almacenamiento, NO se envía una operación que no pueda recuperarse.
    this.storage.setItem(this.key, JSON.stringify(operation));
    return operation;
  }

  completar(): void {
    this.storage.removeItem(this.key);
  }

  ejecutar<T>(action: () => Promise<T>): Promise<T> {
    if (this.vuelo) return this.vuelo as Promise<T>;
    const promise = Promise.resolve()
      .then(action)
      .finally(() => {
        this.vuelo = null;
      });
    this.vuelo = promise;
    return promise;
  }
}
