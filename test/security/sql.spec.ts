import { describe, it, expect } from 'vitest';
import { sanitizeForSQL } from '../../src/security/sql';

describe('Security SQL', () => {
  describe('sanitizeForSQL', () => {
    it('deve escapar aspas simples', () => {
      const input = "O'Reilly";
      const sanitized = sanitizeForSQL(input);
      expect(sanitized).toBe("O''Reilly");
    });

    it('deve remover null bytes', () => {
      const input = 'test\0string';
      const sanitized = sanitizeForSQL(input);
      expect(sanitized).not.toContain('\0');
    });

    it('deve remover palavras-chave perigosas', () => {
      const input = "'; DROP TABLE users; --";
      const sanitized = sanitizeForSQL(input);
      expect(sanitized).not.toContain('DROP TABLE');
    });

    it('deve limitar tamanho', () => {
      const input = 'a'.repeat(20000);
      const sanitized = sanitizeForSQL(input, { maxLength: 100 });
      expect(sanitized.length).toBeLessThanOrEqual(100);
    });
  });
});

