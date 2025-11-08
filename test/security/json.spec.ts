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
      // Cria objeto aninhado profundamente
      const createNested = (depth: number): Record<string, unknown> => {
        if (depth === 0) return { value: 'end' };
        return { nested: createNested(depth - 1) };
      };
      const obj = createNested(15);
      const result = safeJsonStringify(obj, undefined, undefined, 10);
      // Deve conter "Max Depth Reached" quando excede profundidade
      expect(result).toContain('Max Depth Reached');
    });

    it('deve remover funções', () => {
      const obj = { func: () => {} };
      const result = safeJsonStringify(obj);
      expect(result).toContain('Function');
    });
  });
});

