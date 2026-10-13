import { beforeEach, describe, expect, it, vi } from "vitest";
import { CheckoutOperacion, type CheckoutStorage } from "../utils/checkoutOperacion";
import type { ConfirmarCheckoutDto } from "../types/checkout";

const post = vi.hoisted(() => vi.fn());
vi.mock("../api/httpUsuario", () => ({ httpUsuario: { post, get: vi.fn() } }));
import { checkoutApi } from "../services/checkoutApi";

class Storage implements CheckoutStorage {
  values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}
const dto: ConfirmarCheckoutDto = {
  carritoUuid: "550e8400-e29b-41d4-a716-446655440000", carritoVersion: "A".repeat(64),
  comercios: [{ comercioUuid: "550e8400-e29b-41d4-a716-446655440001", tipoEntrega: 1, metodoPago: 1 }],
};

describe("Operación durable de checkout y transporte real del payload", () => {
  beforeEach(() => vi.clearAllMocks());

  it("envía clave y versión a la ruta real y conserva el intento si se pierde la respuesta", async () => {
    const storage = new Storage(); const op = new CheckoutOperacion(storage, "5", () => "clave-estable");
    post.mockRejectedValueOnce(new Error("Respuesta perdida"));
    await expect(op.ejecutar(() => checkoutApi.confirmar(op.preparar(dto)))).rejects.toThrow();
    expect(post).toHaveBeenCalledWith("/Checkout/confirmar", { ...dto, idempotencyKey: "clave-estable" });
    expect(op.pendiente()?.idempotencyKey).toBe("clave-estable");
    const alReabrir = new CheckoutOperacion(storage, "5", () => "otra-clave");
    post.mockResolvedValueOnce({ data: { codigo: "200", respuesta: { totalPedidos: 1 } } });
    await alReabrir.ejecutar(() => checkoutApi.confirmar(alReabrir.pendiente()!));
    expect(post.mock.calls[0][1]).toEqual(post.mock.calls[1][1]);
  });

  it("no sustituye un intento incierto por formulario o carrito nuevos", () => {
    const op = new CheckoutOperacion(new Storage(), "5", () => "clave");
    const original = op.preparar(dto);
    expect(op.preparar({ ...dto, carritoUuid: "otro-carrito", comercios: [] })).toEqual(original);
  });

  it("consolida dos clics en una sola petición mientras está en vuelo", async () => {
    const op = new CheckoutOperacion(new Storage(), "5", () => "clave");
    let resolver!: (value: string) => void;
    const request = vi.fn(() => new Promise<string>((resolve) => { resolver = resolve; }));
    const a = op.ejecutar(request); const b = op.ejecutar(request);
    await Promise.resolve(); expect(request).toHaveBeenCalledTimes(1);
    resolver("confirmado"); expect(await a).toBe("confirmado"); expect(await b).toBe("confirmado");
  });

  it("habilita otro reintento después de una petición fallida", async () => {
    const op = new CheckoutOperacion(new Storage(), "5"); const send = vi.fn().mockRejectedValue(new Error("timeout"));
    await expect(op.ejecutar(send)).rejects.toThrow();
    await expect(op.ejecutar(send)).rejects.toThrow(); expect(send).toHaveBeenCalledTimes(2);
  });

  it("aísla cuentas y no expone el intento de otro cliente", () => {
    const storage = new Storage(); new CheckoutOperacion(storage, "5", () => "clave").preparar(dto);
    expect(new CheckoutOperacion(storage, "6").pendiente()).toBeNull();
  });

  it("no envía si el navegador no permite guardar el intento", async () => {
    const storage = new Storage(); vi.spyOn(storage, "setItem").mockImplementation(() => { throw new Error("Storage bloqueado"); });
    const op = new CheckoutOperacion(storage, "5", () => "clave");
    await expect(op.ejecutar(() => checkoutApi.confirmar(op.preparar(dto)))).rejects.toThrow("Storage bloqueado");
    expect(post).not.toHaveBeenCalled();
  });

  it("borra la operación resuelta y asigna otra clave a la siguiente compra", () => {
    const ids = vi.fn().mockReturnValueOnce("primera").mockReturnValueOnce("segunda");
    const op = new CheckoutOperacion(new Storage(), "5", ids); op.preparar(dto); op.completar();
    expect(op.pendiente()).toBeNull(); expect(op.preparar(dto).idempotencyKey).toBe("segunda");
  });

  it("un registro ilegible exige revisar pedidos y no se reemplaza silenciosamente", () => {
    const storage = new Storage(); storage.setItem("adlocal.checkout.pendiente.v1.5", "{}");
    const op = new CheckoutOperacion(storage, "5"); expect(() => op.preparar(dto)).toThrow("Revisa tus pedidos");
  });
});
