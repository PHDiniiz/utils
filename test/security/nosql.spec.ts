import { describe, it, expect } from 'vitest';
import { sanitizeForNoSQL, deepCleanMongoObject } from '../../src/security/nosql';

describe('Security NoSQL', () => {
  describe('sanitizeForNoSQL', () => {
    it('deve remover operadores $ perigosos', () => {
      const input = { $ne: 'value', name: 'test' };
      const sanitized = sanitizeForNoSQL(input) as Record<string, unknown>;
      expect(sanitized.$ne).toBeUndefined();
      expect(sanitized.name).toBe('test');
    });

    it('deve sanitizar arrays', () => {
      const input = [{ $where: 'evil' }, { name: 'test' }];
      const sanitized = sanitizeForNoSQL(input) as Array<Record<string, unknown>>;
      expect(sanitized[0].$where).toBeUndefined();
    });

    it('deve manter valores primitivos', () => {
      expect(sanitizeForNoSQL('string')).toBe('string');
      expect(sanitizeForNoSQL(123)).toBe(123);
      expect(sanitizeForNoSQL(true)).toBe(true);
    });
  });

  describe('deepCleanMongoObject', () => {
    it('deve limpar objeto MongoDB profundamente', () => {
      const input = { $where: 'evil', nested: { $ne: 'value' } };
      const cleaned = deepCleanMongoObject(input) as Record<string, unknown>;
      expect(cleaned.$where).toBeUndefined();
      expect((cleaned.nested as Record<string, unknown>).$ne).toBeUndefined();
    });
  });
});

