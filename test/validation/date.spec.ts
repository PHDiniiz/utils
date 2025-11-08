import { describe, it, expect } from 'vitest';
import { isDateBR } from '../../src/validation/date';

describe('Date Validation', () => {
  describe('isDateBR', () => {
    it('deve validar datas válidas', () => {
      expect(isDateBR('01/01/2000')).toBe(true);
      expect(isDateBR('31/12/2023')).toBe(true);
      expect(isDateBR('29/02/2024')).toBe(true); // Ano bissexto
    });

    it('deve rejeitar datas inválidas', () => {
      expect(isDateBR('32/01/2000')).toBe(false);
      expect(isDateBR('01/13/2000')).toBe(false);
      expect(isDateBR('29/02/2023')).toBe(false); // Não é bissexto
    });

    it('deve rejeitar formato incorreto', () => {
      expect(isDateBR('2000-01-01')).toBe(false);
      expect(isDateBR('01-01-2000')).toBe(false);
    });

    it('deve rejeitar valores vazios', () => {
      expect(isDateBR('')).toBe(false);
      expect(isDateBR(null as unknown as string)).toBe(false);
    });
  });
});

