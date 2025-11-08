import { describe, it, expect } from 'vitest';
import { cspHeader, rateLimitKey } from '../../src/security/headers';

describe('Security Headers', () => {
  describe('cspHeader', () => {
    it('deve gerar header CSP com defaults', () => {
      const header = cspHeader();
      expect(header).toContain("default-src 'self'");
      expect(header).toContain("script-src 'self'");
    });

    it('deve gerar header CSP customizado', () => {
      const header = cspHeader({
        scriptSrc: ["'self'", 'https://cdn.example.com'],
      });
      expect(header).toContain("script-src 'self' https://cdn.example.com");
    });
  });

  describe('rateLimitKey', () => {
    it('deve gerar chave de rate limiting', () => {
      const key = rateLimitKey('192.168.1.1');
      expect(key).toContain('ratelimit');
      expect(key).toContain('192_168_1_1');
    });

    it('deve incluir rota quando fornecida', () => {
      const key = rateLimitKey('192.168.1.1', '/api/users');
      expect(key).toContain('api');
      expect(key).toContain('users');
    });

    it('deve lançar erro para IP inválido', () => {
      expect(() => rateLimitKey('')).toThrow();
    });
  });
});

