import { describe, it, expect } from 'vitest';
import { generateUUID, generateNanoId } from '../../src/utils/id';

describe('ID Utils', () => {
  describe('generateUUID', () => {
    it('deve gerar UUID válido', () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('deve gerar UUIDs únicos', () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe('generateNanoId', () => {
    it('deve gerar nanoid com tamanho padrão', () => {
      const id = generateNanoId();
      expect(id.length).toBe(21);
    });

    it('deve gerar nanoid com tamanho customizado', () => {
      const id = generateNanoId(10);
      expect(id.length).toBe(10);
    });

    it('deve gerar nanoids únicos', () => {
      const id1 = generateNanoId();
      const id2 = generateNanoId();
      expect(id1).not.toBe(id2);
    });
  });
});

