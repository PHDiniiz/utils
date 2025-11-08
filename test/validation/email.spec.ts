import { describe, it, expect } from 'vitest';
import { isEmail } from '../../src/validation/email';

describe('Email Validation', () => {
  describe('isEmail', () => {
    it('deve validar emails válidos', () => {
      expect(isEmail('teste@example.com')).toBe(true);
      expect(isEmail('usuario.nome@dominio.com.br')).toBe(true);
      expect(isEmail('user+tag@example.co.uk')).toBe(true);
    });

    it('deve rejeitar emails inválidos', () => {
      expect(isEmail('email-sem-arroba.com')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('user@')).toBe(false);
      expect(isEmail('user @example.com')).toBe(false);
    });

    it('deve rejeitar emails começando ou terminando com ponto', () => {
      expect(isEmail('.user@example.com')).toBe(false);
      expect(isEmail('user.@example.com')).toBe(false);
    });

    it('deve rejeitar emails com pontos consecutivos', () => {
      expect(isEmail('user..name@example.com')).toBe(false);
    });

    it('deve rejeitar valores vazios ou inválidos', () => {
      expect(isEmail('')).toBe(false);
      expect(isEmail(null as unknown as string)).toBe(false);
      expect(isEmail(undefined as unknown as string)).toBe(false);
    });

    it('deve rejeitar emails muito longos', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(isEmail(longEmail)).toBe(false);
    });
  });
});

