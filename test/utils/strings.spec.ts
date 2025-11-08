import { describe, it, expect } from 'vitest';
import { slugify, removeEmojis, isValidJSON, capitalize, capitalizeWords } from '../../src/utils/strings';

describe('String Utils', () => {
  describe('slugify', () => {
    it('deve gerar slug amigável', () => {
      expect(slugify('Olá Mundo')).toBe('ola-mundo');
      expect(slugify('São Paulo')).toBe('sao-paulo');
    });

    it('deve remover caracteres especiais', () => {
      expect(slugify('Olá! Mundo?')).toBe('ola-mundo');
    });
  });

  describe('removeEmojis', () => {
    it('deve remover emojis', () => {
      expect(removeEmojis('Olá 😀 mundo')).toBe('Olá  mundo');
    });
  });

  describe('isValidJSON', () => {
    it('deve validar JSON válido', () => {
      expect(isValidJSON('{"key": "value"}')).toBe(true);
      expect(isValidJSON('[1, 2, 3]')).toBe(true);
    });

    it('deve rejeitar JSON inválido', () => {
      expect(isValidJSON('{key: value}')).toBe(false);
      expect(isValidJSON('invalid')).toBe(false);
    });
  });

  describe('capitalize', () => {
    it('deve capitalizar primeira letra', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('HELLO')).toBe('Hello');
    });
  });

  describe('capitalizeWords', () => {
    it('deve capitalizar cada palavra', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });
  });
});

