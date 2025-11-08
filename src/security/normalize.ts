// Re-exporta funções de validation para manter compatibilidade
export { normalizeCPF, normalizeCNPJ } from '../validation';

/**
 * Opções para normalização de string
 */
export interface NormalizeStringOptions {
  nf?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD';
  trim?: boolean;
  lowercase?: boolean;
  removeControl?: boolean;
  removeDiacritics?: boolean;
}

/**
 * Normaliza string com várias opções
 * @param input - String a ser normalizada
 * @param options - Opções de normalização
 * @returns String normalizada
 */
export function normalizeString(input: string, options?: NormalizeStringOptions): string {
  if (!input || typeof input !== 'string') return '';

  const {
    nf = 'NFKC',
    trim = false,
    lowercase = false,
    removeControl = false,
    removeDiacritics = false,
  } = options || {};

  let normalized = input;

  // Normalização Unicode
  normalized = normalized.normalize(nf);

  // Remove diacríticos (acentos)
  if (removeDiacritics) {
    normalized = normalized
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .normalize('NFC');
  }

  // Remove caracteres de controle
  if (removeControl) {
    normalized = normalized.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  }

  // Remove zero-width spaces e caracteres invisíveis
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // Trim
  if (trim) {
    normalized = normalized.trim();
  }

  // Lowercase
  if (lowercase) {
    normalized = normalized.toLowerCase();
  }

  return normalized;
}

/**
 * Normaliza texto removendo acentos, espaços extras e caracteres especiais
 * @param text - Texto a ser normalizado
 * @returns Texto normalizado
 */
export function normalizeText(text: string): string {
  return normalizeString(text, {
    trim: true,
    lowercase: true,
    removeControl: true,
    removeDiacritics: true,
  });
}


