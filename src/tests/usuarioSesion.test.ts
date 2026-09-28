import { describe, it, expect } from 'vitest';
import { getInicialesUsuario } from '../utils/usuarioSesion';

describe('usuarioSesion utility tests', () => {
  describe('getInicialesUsuario', () => {
    it('debe retornar "U" cuando el nombre está vacío o sólo contiene espacios', () => {
      expect(getInicialesUsuario('')).toBe('U');
      expect(getInicialesUsuario('   ')).toBe('U');
    });

    it('debe retornar las dos primeras letras en mayúscula para un solo nombre', () => {
      expect(getInicialesUsuario('Carlos')).toBe('CA');
      expect(getInicialesUsuario('ana')).toBe('AN');
      expect(getInicialesUsuario('J')).toBe('J');
    });

    it('debe retornar la primera letra de cada uno de los dos primeros nombres', () => {
      expect(getInicialesUsuario('Carlos Gonzalez')).toBe('CG');
      expect(getInicialesUsuario('Juan Perez Lopez')).toBe('JP');
      expect(getInicialesUsuario('  maria   del   carmen  ')).toBe('MD');
    });
  });
});
