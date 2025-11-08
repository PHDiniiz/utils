import { describe, it, expect } from 'vitest';
import { isPhoneBR } from '../../src/validation/phone';

describe('Phone Validation', () => {
  describe('isPhoneBR', () => {
    it('deve validar telefone fixo válido', () => {
      expect(isPhoneBR('1133334444')).toBe(true);
      expect(isPhoneBR('(11) 3333-4444')).toBe(true);
    });

    it('deve validar celular válido', () => {
      expect(isPhoneBR('11987654321')).toBe(true);
      expect(isPhoneBR('(11) 98765-4321')).toBe(true);
    });

    it('deve rejeitar telefone com DDD inválido', () => {
      expect(isPhoneBR('10987654321')).toBe(false);
      expect(isPhoneBR('10087654321')).toBe(false);
    });

    it('deve rejeitar celular sem 9', () => {
      expect(isPhoneBR('1187654321')).toBe(false);
    });

    it('deve rejeitar telefones com tamanho incorreto', () => {
      expect(isPhoneBR('123456789')).toBe(false);
      expect(isPhoneBR('123456789012')).toBe(false);
    });

    it('deve rejeitar valores vazios', () => {
      expect(isPhoneBR('')).toBe(false);
    });
  });
});

