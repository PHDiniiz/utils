import { describe, it, expect } from 'vitest';
import { numberToWords } from '../../src/converter/number';

describe('Number Converter', () => {
  describe('numberToWords', () => {
    it('deve converter zero', () => {
      expect(numberToWords(0)).toBe('zero');
    });

    it('deve converter números básicos', () => {
      expect(numberToWords(1)).toBe('um');
      expect(numberToWords(10)).toBe('dez');
      expect(numberToWords(15)).toBe('quinze');
    });

    it('deve converter números maiores', () => {
      expect(numberToWords(100)).toBe('cem');
      expect(numberToWords(123)).toBe('cento e vinte e três');
      expect(numberToWords(1000)).toBe('mil');
    });

    it('deve lançar erro para números fora do intervalo', () => {
      expect(() => numberToWords(-1)).toThrow();
      expect(() => numberToWords(1000000000000)).toThrow();
    });
  });
});

