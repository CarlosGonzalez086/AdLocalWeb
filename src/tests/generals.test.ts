import { describe, it, expect } from 'vitest';
import {
  slugifyConId,
  formatHoraSimple,
  DIAS_SEMANA_MAP,
  diasSemana,
} from '../utils/generals';

describe('generals utility tests', () => {
  describe('slugifyConId', () => {
    it('debe generar slug combinando id y nombre normalizado sin acentos ni caracteres especiales', () => {
      expect(slugifyConId(15, 'Café La Flor!')).toBe('15_Cafe_La_Flor');
      expect(slugifyConId(1, 'Tacos & Tortas El Güero')).toBe('1_Tacos_Tortas_El_Guero');
      expect(slugifyConId(102, 'Panadería San José')).toBe('102_Panaderia_San_Jose');
    });

    it('debe manejar espacios múltiples y bordes', () => {
      expect(slugifyConId(7, '   Restaurante    Central   ')).toBe('7_Restaurante_Central');
    });
  });

  describe('formatHoraSimple', () => {
    it('debe formatear correctamente horas en formato HH:mm:ss o HH:mm', () => {
      expect(formatHoraSimple('14:30:00')).toBe('14:30');
      expect(formatHoraSimple('09:15')).toBe('09:15');
    });

    it('debe retornar "--" para valores no definidos o vacíos', () => {
      expect(formatHoraSimple(undefined)).toBe('--');
      expect(formatHoraSimple('')).toBe('--');
      expect(formatHoraSimple('hora-invalida')).toBe('--');
    });
  });

  describe('Días de la semana', () => {
    it('debe mapear correctamente los índices de días', () => {
      expect(DIAS_SEMANA_MAP[0]).toBe('Domingo');
      expect(DIAS_SEMANA_MAP[1]).toBe('Lunes');
      expect(DIAS_SEMANA_MAP[6]).toBe('Sábado');
      expect(diasSemana.length).toBe(7);
      expect(diasSemana[0]).toBe('Domingo');
    });
  });
});
