import { describe, it, expect } from 'vitest';
import { dateDiff } from '../../src/date/diff';

describe('Date Diff', () => {
  const date1 = new Date('2023-01-01');
  const date2 = new Date('2023-01-02');

  describe('dateDiff', () => {
    it('deve calcular diferença em dias', () => {
      expect(dateDiff(date1, date2, 'days')).toBe(1);
    });

    it('deve calcular diferença em horas', () => {
      expect(dateDiff(date1, date2, 'hours')).toBe(24);
    });

    it('deve calcular diferença em minutos', () => {
      expect(dateDiff(date1, date2, 'minutes')).toBe(1440);
    });

    it('deve retornar NaN para datas inválidas', () => {
      expect(dateDiff('invalid', date2, 'days')).toBeNaN();
    });
  });
});

