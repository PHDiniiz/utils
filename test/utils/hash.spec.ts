import { describe, it, expect } from 'vitest';
import { hashSHA256, hashSHA256Sync } from '../../src/utils/hash';

describe('Hash Utils', () => {
  describe('hashSHA256', () => {
    it('deve gerar hash SHA-256', async () => {
      const hash = await hashSHA256('test');
      expect(hash).toBeDefined();
      expect(hash.length).toBe(64); // SHA-256 produz 64 caracteres hex
    });

    it('deve gerar hash consistente', async () => {
      const hash1 = await hashSHA256('test');
      const hash2 = await hashSHA256('test');
      expect(hash1).toBe(hash2);
    });

    it('deve lançar erro para entrada inválida', async () => {
      await expect(hashSHA256(null as unknown as string)).rejects.toThrow();
    });
  });

  describe('hashSHA256Sync', () => {
    it('deve gerar hash síncrono quando disponível', () => {
      const hash = hashSHA256Sync('test');
      // Pode ser null em ambientes sem crypto síncrono
      if (hash !== null) {
        expect(hash.length).toBe(64);
      }
    });
  });
});

