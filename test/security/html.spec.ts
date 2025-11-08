import { describe, it, expect } from 'vitest';
import { sanitizeHTML, escapeHTML, isXssSafeInput } from '../../src/security/html';

describe('Security HTML', () => {
  describe('sanitizeHTML', () => {
    it('deve remover tags script', () => {
      const html = '<script>alert("xss")</script><p>Safe</p>';
      const sanitized = sanitizeHTML(html);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Safe');
    });

    it('deve remover atributos de eventos', () => {
      const html = '<div onclick="alert(1)">Click</div>';
      const sanitized = sanitizeHTML(html);
      expect(sanitized).not.toContain('onclick');
    });

    it('deve remover tags perigosas', () => {
      const html = '<iframe src="evil.com"></iframe><p>Safe</p>';
      const sanitized = sanitizeHTML(html);
      expect(sanitized).not.toContain('<iframe>');
    });
  });

  describe('escapeHTML', () => {
    it('deve escapar caracteres HTML', () => {
      expect(escapeHTML('<script>')).toBe('&lt;script&gt;');
      expect(escapeHTML('"quotes"')).toBe('&quot;quotes&quot;');
      expect(escapeHTML("'apostrophe'")).toBe('&#39;apostrophe&#39;');
    });
  });

  describe('isXssSafeInput', () => {
    it('deve detectar input seguro', () => {
      expect(isXssSafeInput('Hello world')).toBe(true);
    });

    it('deve detectar input suspeito', () => {
      expect(isXssSafeInput('<script>alert(1)</script>')).toBe(false);
      expect(isXssSafeInput('javascript:evil()')).toBe(false);
    });
  });
});

