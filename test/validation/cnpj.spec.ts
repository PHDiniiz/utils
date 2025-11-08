import { describe, it, expect } from 'vitest';
import { isCNPJ, formatCNPJ, normalizeCNPJ } from '../../src/validation/cnpj';

describe('CNPJ Validation', () => {
  describe('isCNPJ', () => {
    it('deve validar CNPJ válido sem formatação', () => {
      expect(isCNPJ('11222333000181')).toBe(true);
    });

    it('deve validar CNPJ válido com formatação', () => {
      expect(isCNPJ('11.222.333/0001-81')).toBe(true);
    });

    it('deve validar CNPJ válido como número', () => {
      expect(isCNPJ(11222333000181)).toBe(true);
    });

    it('deve rejeitar CNPJ inválido', () => {
      expect(isCNPJ('11222333000182')).toBe(false);
      expect(isCNPJ('12345678000190')).toBe(false);
    });

    it('deve rejeitar CNPJ com todos os dígitos iguais', () => {
      expect(isCNPJ('11111111111111')).toBe(false);
      expect(isCNPJ('00000000000000')).toBe(false);
    });

    it('deve rejeitar CNPJ com tamanho incorreto', () => {
      expect(isCNPJ('1234567890123')).toBe(false);
      expect(isCNPJ('123456789012345')).toBe(false);
    });

    it('deve rejeitar valores vazios ou inválidos', () => {
      expect(isCNPJ('')).toBe(false);
      expect(isCNPJ(null as unknown as string)).toBe(false);
    });
  });

  describe('formatCNPJ', () => {
    it('deve formatar CNPJ válido', () => {
      expect(formatCNPJ('11222333000181')).toBe('11.222.333/0001-81');
    });

    it('deve formatar CNPJ já formatado', () => {
      expect(formatCNPJ('11.222.333/0001-81')).toBe('11.222.333/0001-81');
    });

    it('deve retornar string vazia para CNPJ inválido', () => {
      expect(formatCNPJ('1234567890123')).toBe('');
    });
  });

  describe('normalizeCNPJ', () => {
    it('deve normalizar CNPJ removendo formatação', () => {
      expect(normalizeCNPJ('11.222.333/0001-81')).toBe('11222333000181');
    });

    it('deve preencher com zeros à esquerda', () => {
      expect(normalizeCNPJ('123456780001')).toBe('00012345678001');
    });

    it('deve retornar string vazia para valores vazios', () => {
      expect(normalizeCNPJ('')).toBe('');
    });
  });
});

