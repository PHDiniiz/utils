import { describe, it, expect } from 'vitest';
import {
  normalizeString,
  normalizeText,
  normalizeCPF,
  normalizeCNPJ,
} from '../../src/security/normalize';

describe('Security Normalize', () => {
  describe('normalizeString', () => {
    it('deve normalizar unicode', () => {
      const result = normalizeString('José', { nf: 'NFKC' });
      expect(result).toBeDefined();
    });

    it('deve remover diacríticos quando solicitado', () => {
      const result = normalizeString('José', { removeDiacritics: true });
      expect(result).toBe('Jose');
    });

    it('deve remover caracteres de controle', () => {
      const result = normalizeString('test\u0000string', { removeControl: true });
      expect(result).not.toContain('\u0000');
    });

    it('deve fazer trim quando solicitado', () => {
      const result = normalizeString('  test  ', { trim: true });
      expect(result).toBe('test'); // trim remove espaços do início e fim
    });
  });

  describe('normalizeText', () => {
    it('deve normalizar texto completamente', () => {
      const result = normalizeText('  José  ');
      expect(result).toBe('jose');
    });
  });

  describe('normalizeCPF e normalizeCNPJ', () => {
    it('deve normalizar CPF', () => {
      expect(normalizeCPF('111.444.777-35')).toBe('11144477735');
    });

    it('deve normalizar CNPJ', () => {
      expect(normalizeCNPJ('11.222.333/0001-81')).toBe('11222333000181');
    });
  });
});

