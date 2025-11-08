import { describe, it, expect } from 'vitest';
import { getBrazilTime, formatBrazilDateTime } from '../../src/date/timezone';

describe('Date Timezone', () => {
  describe('getBrazilTime', () => {
    it('deve retornar data atual', () => {
      const date = getBrazilTime();
      expect(date).toBeInstanceOf(Date);
    });
  });

  describe('formatBrazilDateTime', () => {
    it('deve formatar data/hora brasileira', () => {
      const date = new Date('2023-12-25T10:30:00');
      const formatted = formatBrazilDateTime(date);
      expect(formatted).toContain('25/12/2023');
      expect(formatted).toContain('10:30:00');
    });
  });
});

