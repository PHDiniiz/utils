import { describe, it, expect } from 'vitest';
import { formatBRL, parseBRL, numberToBRL, brlToNumber } from '../../src/format/currency';

describe('Currency Format', () => {
  describe('formatBRL', () => {
    it('deve formatar número como moeda brasileira', () => {
      expect(formatBRL(1234.56)).toContain('1.234,56');
      expect(formatBRL(1234.56)).toContain('R$');
    });

    it('deve formatar string como moeda', () => {
      expect(formatBRL('1234.56')).toContain('1.234,56');
    });

    it('deve formatar sem símbolo quando solicitado', () => {
      const formatted = formatBRL(1234.56, { showSymbol: false });
      expect(formatted).not.toContain('R$');
      expect(formatted).toContain('1.234,56');
    });

    it('deve retornar string vazia para valores inválidos', () => {
      expect(formatBRL('invalid')).toBe('');
    });
  });

  describe('parseBRL', () => {
    it('deve converter string formatada para número', () => {
      expect(parseBRL('R$ 1.234,56')).toBe(1234.56);
      expect(parseBRL('1.234,56')).toBe(1234.56);
    });

    it('deve retornar NaN para valores inválidos', () => {
      expect(parseBRL('invalid')).toBeNaN();
      expect(parseBRL('')).toBeNaN();
    });
  });

  describe('numberToBRL e brlToNumber', () => {
    it('deve converter número para BRL e vice-versa', () => {
      const formatted = numberToBRL(1234.56);
      expect(formatted).toContain('1.234,56');

      const parsed = brlToNumber('R$ 1.234,56');
      expect(parsed).toBe(1234.56);
    });
  });
});

