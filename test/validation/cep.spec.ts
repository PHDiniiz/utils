import { describe, it, expect } from 'vitest';
import { isCEP, normalizeCEP } from '../../src/validation/cep';

describe('CEP Validation', () => {
  describe('isCEP', () => {
    it('deve validar CEP válido sem formatação', () => {
      expect(isCEP('01310100')).toBe(true);
    });

    it('deve validar CEP válido com formatação', () => {
      expect(isCEP('01310-100')).toBe(true);
    });

    it('deve rejeitar CEP inválido', () => {
      expect(isCEP('00000000')).toBe(false);
      expect(isCEP('1234567')).toBe(false);
      expect(isCEP('123456789')).toBe(false);
    });

    it('deve rejeitar valores vazios', () => {
      expect(isCEP('')).toBe(false);
      expect(isCEP(null as unknown as string)).toBe(false);
    });
  });

  describe('normalizeCEP', () => {
    it('deve normalizar CEP removendo formatação', () => {
      expect(normalizeCEP('01310-100')).toBe('01310100');
    });

    it('deve preencher com zeros à esquerda', () => {
      expect(normalizeCEP('1234567')).toBe('01234567');
    });
  });
});

