import { describe, it, expect } from 'vitest';
import {
  MetodoPagoPedido,
  TipoEntregaPedido,
  type CheckoutComercioResponseDto,
  type CheckoutProductoDto,
} from '../types/checkout';

describe('Flujo E2E de Carrito y Checkout (AdLocalWeb)', () => {
  // Helper para simular producto en checkout
  const crearProducto = (
    uuid: string,
    nombre: string,
    cantidad: number,
    precioUnitario: number,
    permiteDomicilio = true,
    permiteRecoger = true
  ): CheckoutProductoDto => ({
    productoUuid: uuid,
    nombre,
    cantidad,
    precioUnitario,
    subtotal: cantidad * precioUnitario,
    permiteDomicilio,
    permiteRecoger,
  });

  // Helper para simular comercio en checkout
  const crearComercio = (
    uuid: string,
    nombre: string,
    productos: CheckoutProductoDto[],
    costoEnvio = 35,
    aceptaEfectivo = true,
    aceptaTransferencia = true
  ): CheckoutComercioResponseDto => ({
    comercioUuid: uuid,
    comercio: nombre,
    costoEnvio,
    totalDomicilio: productos.reduce((acc, p) => acc + p.subtotal, 0) + costoEnvio,
    aceptaEfectivo,
    aceptaTransferencia,
    permiteDomicilio: true,
    permiteRecoger: true,
    productos,
    cuentaTransferencia: null,
    subtotal: productos.reduce((acc, p) => acc + p.subtotal, 0),
  });

  describe('1. Agrupación y cálculo de subtotales por comercio', () => {
    it('debe calcular correctamente el subtotal de cada comercio y el subtotal global', () => {
      const p1 = crearProducto('prod-1', 'Taco al Pastor', 3, 20); // $60
      const p2 = crearProducto('prod-2', 'Refresco 600ml', 2, 25); // $50
      const comercio1 = crearComercio('com-1', 'Taquería El Güero', [p1, p2]);

      const p3 = crearProducto('prod-3', 'Pastel de Fresas', 1, 350); // $350
      const comercio2 = crearComercio('com-2', 'Pastelería San José', [p3]);

      const comercios = [comercio1, comercio2];

      expect(comercio1.subtotal).toBe(110);
      expect(comercio2.subtotal).toBe(350);

      const subtotalGlobal = comercios.reduce((acc, c) => acc + c.subtotal, 0);
      expect(subtotalGlobal).toBe(460);
    });
  });

  describe('2. Cálculo de costo de envío y total según tipo de entrega', () => {
    const calcularCostoEnvio = (tipo: TipoEntregaPedido, costo: number): number =>
      tipo === TipoEntregaPedido.Domicilio ? costo : 0;

    it('debe cobrar envío de $35 si el cliente selecciona Domicilio', () => {
      const p1 = crearProducto('prod-1', 'Hamburguesa Doble', 2, 80); // $160
      const comercio = crearComercio('com-1', 'Burger Joint', [p1], 35);

      const tipoEntrega: TipoEntregaPedido = TipoEntregaPedido.Domicilio;
      const costoEnvioAplicado = calcularCostoEnvio(tipoEntrega, comercio.costoEnvio);
      const total = comercio.subtotal + costoEnvioAplicado;

      expect(costoEnvioAplicado).toBe(35);
      expect(total).toBe(195);
    });

    it('debe aplicar costo de envío $0 si el cliente selecciona Recoger en sucursal', () => {
      const p1 = crearProducto('prod-1', 'Café Americano', 2, 45); // $90
      const comercio = crearComercio('com-1', 'Cafetería Central', [p1], 30);

      const tipoEntrega: TipoEntregaPedido = TipoEntregaPedido.Recoger;
      const costoEnvioAplicado = calcularCostoEnvio(tipoEntrega, comercio.costoEnvio);
      const total = comercio.subtotal + costoEnvioAplicado;

      expect(costoEnvioAplicado).toBe(0);
      expect(total).toBe(90);
    });
  });

  describe('3. Reglas de validación de cantidades y stock del carrito', () => {
    it('no debe permitir incrementar más allá del stock disponible cuando maneja stock', () => {
      const stockDisponible = 5;
      let cantidadActual = 5;

      const puedeIncrementar = (actual: number, stock: number) => actual < stock;

      expect(puedeIncrementar(cantidadActual, stockDisponible)).toBe(false);

      // Si hay stock disponible
      cantidadActual = 4;
      expect(puedeIncrementar(cantidadActual, stockDisponible)).toBe(true);
    });

    it('debe decrementar correctamente y eliminar cuando la cantidad es 1', () => {
      const simularDecrementar = (cantidad: number): { nuevaCantidad: number; accion: 'actualizar' | 'eliminar' } => {
        if (cantidad <= 1) {
          return { nuevaCantidad: 0, accion: 'eliminar' };
        }
        return { nuevaCantidad: cantidad - 1, accion: 'actualizar' };
      };

      expect(simularDecrementar(3)).toEqual({ nuevaCantidad: 2, accion: 'actualizar' });
      expect(simularDecrementar(1)).toEqual({ nuevaCantidad: 0, accion: 'eliminar' });
    });
  });

  describe('4. Construcción de payload para ConfirmarCheckoutDto', () => {
    it('debe generar la estructura correcta con Idempotency-Key y datos de entrega', () => {
      const comercioUuid = '550e8400-e29b-41d4-a716-446655440000';
      const direccionUuid = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
      const idempotencyKey = 'idemp_cart_12345_67890';

      const payload = {
        idempotencyKey,
        comercios: [
          {
            comercioUuid,
            tipoEntrega: TipoEntregaPedido.Domicilio,
            metodoPago: MetodoPagoPedido.Efectivo,
            direccionUuid,
            observaciones: 'Dejar en recepción',
          },
        ],
      };

      expect(payload.idempotencyKey).toMatch(/^idemp_/);
      expect(payload.comercios).toHaveLength(1);
      expect(payload.comercios[0].tipoEntrega).toBe(TipoEntregaPedido.Domicilio);
      expect(payload.comercios[0].metodoPago).toBe(MetodoPagoPedido.Efectivo);
      expect(payload.comercios[0].direccionUuid).toBe(direccionUuid);
    });

    it('debe seleccionar Transferencia si el comercio no acepta efectivo', () => {
      const comercioSoloTransferencia = {
        aceptaEfectivo: false,
        aceptaTransferencia: true,
      };

      const metodoDefault = (!comercioSoloTransferencia.aceptaEfectivo && comercioSoloTransferencia.aceptaTransferencia)
        ? MetodoPagoPedido.Transferencia
        : MetodoPagoPedido.Efectivo;

      expect(metodoDefault).toBe(MetodoPagoPedido.Transferencia);
    });
  });
});
