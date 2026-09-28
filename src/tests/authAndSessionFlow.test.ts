import { describe, it, expect, beforeEach } from 'vitest';

describe('Flujo de Autenticación y Manejo de Sesión (AdLocalWeb)', () => {
  // Simulación de Storage en memoria para pruebas
  let storage: Record<string, string> = {};

  const mockLocalStorage = {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    },
  };

  beforeEach(() => {
    storage = {};
  });

  // Generador simple de payload JWT en Base64Url para pruebas
  const createMockToken = (claims: Record<string, unknown>): string => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify(claims)).toString('base64url');
    const signature = 'mockSignature123';
    return `${header}.${payload}.${signature}`;
  };

  const decodeMockToken = (token: string): Record<string, unknown> | null => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const json = Buffer.from(parts[1], 'base64url').toString('utf-8');
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const isExpiringSoon = (token: string, thresholdSeconds = 300): boolean => {
    const decoded = decodeMockToken(token);
    if (!decoded || typeof decoded.exp !== 'number') return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp - now <= thresholdSeconds;
  };

  describe('1. Persistencia de tokens en Storage', () => {
    it('debe almacenar y recuperar correctamente el JWT y Refresh Token del cliente', () => {
      const jwt = 'jwt.test.token123';
      const refreshToken = 'rt.test.token456';

      mockLocalStorage.setItem('jwtCliente', jwt);
      mockLocalStorage.setItem('refreshTokenCliente', refreshToken);

      expect(mockLocalStorage.getItem('jwtCliente')).toBe(jwt);
      expect(mockLocalStorage.getItem('refreshTokenCliente')).toBe(refreshToken);
    });

    it('debe limpiar ambos tokens al cerrar sesión', () => {
      mockLocalStorage.setItem('jwtCliente', 'jwt.valido');
      mockLocalStorage.setItem('refreshTokenCliente', 'rt.valido');

      mockLocalStorage.removeItem('jwtCliente');
      mockLocalStorage.removeItem('refreshTokenCliente');

      expect(mockLocalStorage.getItem('jwtCliente')).toBeNull();
      expect(mockLocalStorage.getItem('refreshTokenCliente')).toBeNull();
    });
  });

  describe('2. Decodificación de claims y rol de usuario', () => {
    it('debe extraer el rol Cliente, email y ID del token decodificado', () => {
      const token = createMockToken({
        id: '42',
        email: 'cliente@adlocal.com',
        nombre: 'María García',
        rol: 'Cliente',
        exp: Math.floor(Date.now() / 1000) + 3600, // expira en 1 hora
      });

      const decoded = decodeMockToken(token);

      expect(decoded).not.toBeNull();
      expect(decoded?.rol).toBe('Cliente');
      expect(decoded?.email).toBe('cliente@adlocal.com');
      expect(decoded?.id).toBe('42');
    });
  });

  describe('3. Detección de ventana de expiración del token', () => {
    it('debe indicar expirando pronto si el token vence en menos del umbral de 5 minutos', () => {
      const tokenPorVencer = createMockToken({
        id: '1',
        exp: Math.floor(Date.now() / 1000) + 120, // expira en 2 minutos (120s <= 300s)
      });

      expect(isExpiringSoon(tokenPorVencer, 300)).toBe(true);
    });

    it('no debe marcar como expirando pronto si el token tiene más de 30 minutos de vigencia', () => {
      const tokenVigente = createMockToken({
        id: '1',
        exp: Math.floor(Date.now() / 1000) + 1800, // expira en 30 minutos (1800s > 300s)
      });

      expect(isExpiringSoon(tokenVigente, 300)).toBe(false);
    });

    it('debe marcar como expirado un token con fecha pasada', () => {
      const tokenVencido = createMockToken({
        id: '1',
        exp: Math.floor(Date.now() / 1000) - 60, // expiró hace 1 minuto
      });

      expect(isExpiringSoon(tokenVencido, 300)).toBe(true);
    });
  });
});
