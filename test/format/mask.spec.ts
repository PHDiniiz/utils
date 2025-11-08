import { describe, it, expect } from 'vitest';
import {
  applyMask,
  formatCPF,
  formatCNPJ,
  formatCEP,
  formatPhone,
  removePunctuation,
  onlyDigits,
} from '../../src/format/mask';

describe('Mask Format', () => {
  describe('applyMask', () => {
    it('deve aplicar máscara genérica', () => {
      expect(applyMask('12345678901', '###.###.###-##')).toBe('123.456.789-01');
    });
  });

  describe('formatCPF', () => {
    it('deve formatar CPF', () => {
      expect(formatCPF('11144477735')).toBe('111.444.777-35');
    });
  });

  describe('formatCNPJ', () => {
    it('deve formatar CNPJ', () => {
      expect(formatCNPJ('11222333000181')).toBe('11.222.333/0001-81');
    });
  });

  describe('formatCEP', () => {
    it('deve formatar CEP', () => {
      expect(formatCEP('01310100')).toBe('01310-100');
    });
  });

  describe('formatPhone', () => {
    it('deve formatar telefone fixo', () => {
      expect(formatPhone('1133334444')).toBe('(11) 3333-4444');
    });

    it('deve formatar celular', () => {
      expect(formatPhone('11987654321')).toBe('(11) 98765-4321');
    });
  });

  describe('removePunctuation', () => {
    it('deve remover pontuação', () => {
      expect(removePunctuation('Olá, mundo!')).toBe('Olá mundo');
    });
  });

  describe('onlyDigits', () => {
    it('deve retornar apenas dígitos', () => {
      expect(onlyDigits('abc123def456')).toBe('123456');
    });
  });
});

