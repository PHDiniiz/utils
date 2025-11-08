import { describe, it, expect } from 'vitest';
import { isPlate, isOldPlate, isMercosulPlate } from '../../src/validation/plate';

describe('Plate Validation', () => {
  describe('isPlate', () => {
    it('deve validar placa antiga', () => {
      expect(isPlate('ABC1234')).toBe(true);
      expect(isPlate('abc1234')).toBe(true);
    });

    it('deve validar placa Mercosul', () => {
      expect(isPlate('ABC1D23')).toBe(true);
      expect(isPlate('abc1d23')).toBe(true);
    });

    it('deve rejeitar placas inválidas', () => {
      expect(isPlate('ABC123')).toBe(false);
      expect(isPlate('ABC12345')).toBe(false);
      expect(isPlate('1234ABC')).toBe(false);
    });

    it('deve rejeitar valores vazios', () => {
      expect(isPlate('')).toBe(false);
      expect(isPlate(null as unknown as string)).toBe(false);
    });
  });

  describe('isOldPlate', () => {
    it('deve identificar placa antiga', () => {
      expect(isOldPlate('ABC1234')).toBe(true);
    });

    it('deve rejeitar placa Mercosul', () => {
      expect(isOldPlate('ABC1D23')).toBe(false);
    });
  });

  describe('isMercosulPlate', () => {
    it('deve identificar placa Mercosul', () => {
      expect(isMercosulPlate('ABC1D23')).toBe(true);
    });

    it('deve rejeitar placa antiga', () => {
      expect(isMercosulPlate('ABC1234')).toBe(false);
    });
  });
});

