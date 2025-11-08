import { describe, it, expect } from 'vitest';
import { isCPF, formatCPF, normalizeCPF } from '../../src/validation/cpf';

describe('CPF Validation', () => {
  describe('isCPF', () => {
    it('deve validar CPF válido sem formatação', () => {
      expect(isCPF('11144477735')).toBe(true);
    });

    it('deve validar CPF válido com formatação', () => {
      expect(isCPF('111.444.777-35')).toBe(true);
    });

    it('deve validar CPF válido como número', () => {
      expect(isCPF(11144477735)).toBe(true);
    });

    it('deve rejeitar CPF inválido', () => {
      expect(isCPF('11144477736')).toBe(false);
      expect(isCPF('12345678901')).toBe(false);
    });

    it('deve rejeitar CPF com todos os dígitos iguais', () => {
      expect(isCPF('11111111111')).toBe(false);
      expect(isCPF('00000000000')).toBe(false);
    });

    it('deve rejeitar CPF com tamanho incorreto', () => {
      expect(isCPF('123456789')).toBe(false);
      expect(isCPF('123456789012')).toBe(false);
    });

    it('deve rejeitar valores vazios ou inválidos', () => {
      expect(isCPF('')).toBe(false);
      expect(isCPF(null as unknown as string)).toBe(false);
      expect(isCPF(undefined as unknown as string)).toBe(false);
    });

    it('deve validar CPFs conhecidos válidos', () => {
      expect(isCPF('12345678909')).toBe(true);
      expect(isCPF('98765432100')).toBe(true);
    });
  });

  describe('formatCPF', () => {
    it('deve formatar CPF válido', () => {
      expect(formatCPF('11144477735')).toBe('111.444.777-35');
    });

    it('deve formatar CPF já formatado', () => {
      expect(formatCPF('111.444.777-35')).toBe('111.444.777-35');
    });

    it('deve retornar string vazia para CPF inválido', () => {
      expect(formatCPF('123456789')).toBe('');
    });

    it('deve formatar CPF como número', () => {
      expect(formatCPF(11144477735)).toBe('111.444.777-35');
    });
  });

  describe('normalizeCPF', () => {
    it('deve normalizar CPF removendo formatação', () => {
      expect(normalizeCPF('111.444.777-35')).toBe('11144477735');
    });

    it('deve normalizar CPF já normalizado', () => {
      expect(normalizeCPF('11144477735')).toBe('11144477735');
    });

    it('deve preencher com zeros à esquerda', () => {
      expect(normalizeCPF('123456789')).toBe('00123456789');
    });

    it('deve retornar string vazia para valores vazios', () => {
      expect(normalizeCPF('')).toBe('');
      expect(normalizeCPF(null as unknown as string)).toBe('');
    });
  });
});

