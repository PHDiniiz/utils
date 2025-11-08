import { describe, it, expect } from 'vitest';
import { safeJsonStringify } from '../../src/security/json';

describe('Security JSON', () => {
  describe('safeJsonStringify', () => {
    it('deve serializar objeto simples', () => {
      const obj = { key: 'value' };
      const result = safeJsonStringify(obj);
      expect(result).toBe('{"key":"value"}');
    });

    it('deve detectar referências circulares', () => {
      const obj: Record<string, unknown> = { key: 'value' };
      obj.self = obj;
      const result = safeJsonStringify(obj);
      expect(result).toContain('Circular Reference');
    });

    it('deve limitar profundidade', () => {
      let obj: Record<string, unknown> = {};
      let current = obj;
      for (let i = 0; i < 15; i++) {
        current.nested = {};
        current = current.nested as Record<string, unknown>;
      }
      const result = safeJsonStringify(obj, undefined, undefined, 10);
      expect(result).toContain('Max Depth Reached');
    });

    it('deve remover funções', () => {
      const obj = { func: () => {} };
      const result = safeJsonStringify(obj);
      expect(result).toContain('Function');
    });
  });
});

