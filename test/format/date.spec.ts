import { describe, it, expect } from 'vitest';
import { formatDateBR, formatDateTimeBR, formatISO } from '../../src/format/date';

describe('Date Format', () => {
  const testDate = new Date('2023-12-25T10:30:00');

  describe('formatDateBR', () => {
    it('deve formatar data no padrão brasileiro', () => {
      expect(formatDateBR(testDate)).toBe('25/12/2023');
    });

    it('deve formatar string ISO', () => {
      expect(formatDateBR('2023-12-25')).toBe('25/12/2023');
    });

    it('deve formatar timestamp', () => {
      expect(formatDateBR(testDate.getTime())).toBe('25/12/2023');
    });

    it('deve retornar string vazia para datas inválidas', () => {
      expect(formatDateBR('invalid')).toBe('');
    });
  });

  describe('formatDateTimeBR', () => {
    it('deve formatar data e hora', () => {
      const formatted = formatDateTimeBR(testDate);
      expect(formatted).toContain('25/12/2023');
      expect(formatted).toContain('10:30:00');
    });

    it('deve formatar sem segundos quando solicitado', () => {
      const formatted = formatDateTimeBR(testDate, { includeSeconds: false });
      expect(formatted).toContain('10:30');
      expect(formatted).not.toContain(':00');
    });
  });

  describe('formatISO', () => {
    it('deve formatar data no padrão ISO', () => {
      expect(formatISO(testDate)).toBe('2023-12-25');
    });
  });
});

