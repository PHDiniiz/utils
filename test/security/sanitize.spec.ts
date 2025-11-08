import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../../src/security/sanitize';

describe('Security Sanitize', () => {
  describe('sanitizeInput', () => {
    it('deve sanitizar string', () => {
      const input = '<script>alert(1)</script>';
      const sanitized = sanitizeInput(input) as string;
      expect(sanitized).not.toContain('<script>');
    });

    it('deve sanitizar objeto', () => {
      const input = { $ne: 'value', name: 'test' };
      const sanitized = sanitizeInput(input) as Record<string, unknown>;
      expect(sanitized.$ne).toBeUndefined();
    });

    it('deve manter valores primitivos', () => {
      expect(sanitizeInput(123)).toBe(123);
      expect(sanitizeInput(true)).toBe(true);
    });
  });
});

