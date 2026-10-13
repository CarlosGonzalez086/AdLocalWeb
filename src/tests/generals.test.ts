import { describe, it, expect } from 'vitest';
import {
  slugifyConId,
  formatHoraSimple,
  DIAS_SEMANA_MAP,
  diasSemana,
  estaAbiertoAhora,
} from '../utils/generals';

describe('generals utility tests', () => {
  it('el estado abierto usa la zona del comercio, no la del visitante', () => {
    const horarios=[{dia:2,abierto:true,horaApertura:"09:00:00",horaCierre:"10:00:00"}]; const ahora=new Date("2026-10-13T16:30:00Z");
    expect(estaAbiertoAhora(horarios,"America/Tijuana",ahora)).toBe(true); expect(estaAbiertoAhora(horarios,"America/Cancun",ahora)).toBe(false);
  });
  it('respeta el día propio del comercio cerca de medianoche', () => {
    const horarios=[{dia:1,abierto:true,horaApertura:"23:00:00",horaCierre:"23:59:00"}]; const ahora=new Date("2026-10-13T06:30:00Z");
    expect(estaAbiertoAhora(horarios,"America/Tijuana",ahora)).toBe(true); expect(estaAbiertoAhora(horarios,"America/Cancun",ahora)).toBe(false);
  });
  it('al llegar al cierre ya no anuncia abierto', () => {
    expect(estaAbiertoAhora([{dia:2,abierto:true,horaApertura:"09:00:00",horaCierre:"10:00:00"}],"America/Tijuana",new Date("2026-10-13T17:00:00Z"))).toBe(false);
  });
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
