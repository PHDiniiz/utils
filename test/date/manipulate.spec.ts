import { describe, it, expect } from 'vitest';
import { addTime, subtractTime } from '../../src/date/manipulate';

describe('Date Manipulate', () => {
  const baseDate = new Date('2023-01-01T00:00:00');

  describe('addTime', () => {
    it('deve adicionar dias', () => {
      const result = addTime(baseDate, 1, 'days');
      expect(result.getDate()).toBe(2);
    });

    it('deve adicionar horas', () => {
      const result = addTime(baseDate, 1, 'hours');
      expect(result.getHours()).toBe(1);
    });

    it('deve lançar erro para data inválida', () => {
      expect(() => addTime('invalid', 1, 'days')).toThrow();
    });
  });

  describe('subtractTime', () => {
    it('deve subtrair dias', () => {
      const result = subtractTime(baseDate, 1, 'days');
      expect(result.getDate()).toBe(31);
    });
  });
});

