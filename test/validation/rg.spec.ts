import { describe, it, expect } from 'vitest';
import { isRG, hasRGDVerifier } from '../../src/validation/rg';

describe('RG Validation', () => {
  describe('isRG', () => {
    it('deve validar RG válido', () => {
      expect(isRG('123456789')).toBe(true);
      expect(isRG('1234567')).toBe(true);
    });

    it('deve rejeitar RG com todos os zeros', () => {
      expect(isRG('000000000')).toBe(false);
    });

    it('deve rejeitar RG com tamanho incorreto', () => {
      expect(isRG('123456')).toBe(false);
      expect(isRG('12345678901')).toBe(false);
    });

    it('deve rejeitar valores vazios', () => {
      expect(isRG('')).toBe(false);
    });
  });

  describe('hasRGDVerifier', () => {
    it('deve identificar RG com dígito verificador', () => {
      expect(hasRGDVerifier('123456789X')).toBe(true);
      expect(hasRGDVerifier('1234567890')).toBe(true);
    });

    it('deve rejeitar RG sem dígito verificador', () => {
      expect(hasRGDVerifier('123456789')).toBe(false);
    });
  });
});

