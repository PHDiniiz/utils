import { describe, it, expect } from 'vitest';
import {
  dateToTimestamp,
  dateToTimestampSeconds,
  dateToUTC,
  timestampToDate,
} from '../../src/converter/date';

describe('Date Converter', () => {
  const testDate = new Date('2023-12-25T10:30:00Z');

  describe('dateToTimestamp', () => {
    it('deve converter data para timestamp em milissegundos', () => {
      const timestamp = dateToTimestamp(testDate);
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBeGreaterThan(0);
    });
  });

  describe('dateToTimestampSeconds', () => {
    it('deve converter data para timestamp em segundos', () => {
      const timestamp = dateToTimestampSeconds(testDate);
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBeLessThan(dateToTimestamp(testDate));
    });
  });

  describe('dateToUTC', () => {
    it('deve converter data para string UTC ISO', () => {
      const utc = dateToUTC(testDate);
      expect(utc).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('timestampToDate', () => {
    it('deve converter timestamp para Date', () => {
      const timestamp = testDate.getTime();
      const date = timestampToDate(timestamp);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(timestamp);
    });
  });
});

