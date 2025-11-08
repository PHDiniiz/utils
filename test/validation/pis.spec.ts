import { describe, it, expect } from 'vitest';
import { isPIS } from '../../src/validation/pis';

describe('PIS Validation', () => {
  describe('isPIS', () => {
    it('deve validar PIS válido', () => {
      expect(isPIS('12056431647')).toBe(true);
    });

    it('deve validar PIS com formatação', () => {
      expect(isPIS('120.5643.164-7')).toBe(true);
    });

    it('deve rejeitar PIS inválido', () => {
      expect(isPIS('12056431648')).toBe(false);
    });

    it('deve rejeitar PIS com todos os dígitos iguais', () => {
      expect(isPIS('11111111111')).toBe(false);
    });

    it('deve rejeitar PIS com tamanho incorreto', () => {
      expect(isPIS('1234567890')).toBe(false);
      expect(isPIS('123456789012')).toBe(false);
    });

    it('deve rejeitar valores vazios', () => {
      expect(isPIS('')).toBe(false);
    });
  });
});

