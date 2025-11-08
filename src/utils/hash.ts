/**
 * Gera hash SHA-256 de uma string
 * @param text - Texto a ser hasheado
 * @returns Promise com hash em hexadecimal
 */
export async function hashSHA256(text: string): Promise<string> {
  if (!text || typeof text !== 'string') {
    throw new Error('Texto inválido para hash');
  }

  // Usa Web Crypto API se disponível (navegador ou Node.js 15+)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback para Node.js sem crypto.subtle (versões antigas)
  if (typeof require !== 'undefined') {
    try {
      const crypto = require('crypto');
      return crypto.createHash('sha256').update(text).digest('hex');
    } catch {
      // Ignora erro
    }
  }

  throw new Error('SHA-256 não está disponível neste ambiente');
}

/**
 * Gera hash SHA-256 de uma string (síncrono, apenas Node.js)
 * @param text - Texto a ser hasheado
 * @returns Hash em hexadecimal ou null se não disponível
 */
export function hashSHA256Sync(text: string): string | null {
  if (!text || typeof text !== 'string') {
    return null;
  }

  // Apenas Node.js tem crypto síncrono
  if (typeof require !== 'undefined') {
    try {
      const crypto = require('crypto');
      return crypto.createHash('sha256').update(text).digest('hex');
    } catch {
      return null;
    }
  }

  return null;
}

