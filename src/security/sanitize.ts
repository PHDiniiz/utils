import { sanitizeHTML, escapeHTML } from './html';
import { sanitizeForSQL } from './sql';
import { sanitizeForNoSQL } from './nosql';
import { normalizeString } from './normalize';

/**
 * Sanitiza entrada removendo XSS, SQL injection e caracteres suspeitos
 * @param input - Entrada a ser sanitizada (string ou objeto)
 * @param options - Opções de sanitização
 * @returns Entrada sanitizada
 */
export function sanitizeInput(
  input: unknown,
  options?: {
    removeXSS?: boolean;
    removeSQLInjection?: boolean;
    removeNoSQLInjection?: boolean;
    normalize?: boolean;
    escapeHTML?: boolean;
  }
): unknown {
  if (input === null || input === undefined) {
    return input;
  }

  const {
    removeXSS = true,
    removeSQLInjection = true,
    removeNoSQLInjection = true,
    normalize = false,
    escapeHTML: shouldEscapeHTML = false,
  } = options || {};

  // Se for string
  if (typeof input === 'string') {
    let sanitized = input;

    // Remove XSS
    if (removeXSS) {
      sanitized = sanitizeHTML(sanitized);
    }

    // Remove SQL injection
    if (removeSQLInjection) {
      sanitized = sanitizeForSQL(sanitized);
    }

    // Escape HTML
    if (shouldEscapeHTML) {
      sanitized = escapeHTML(sanitized);
    }

    // Normaliza
    if (normalize) {
      sanitized = normalizeString(sanitized, {
        trim: true,
        removeControl: true,
      });
    }

    return sanitized;
  }

  // Se for objeto ou array, remove NoSQL injection
  if (typeof input === 'object') {
    if (removeNoSQLInjection) {
      return sanitizeForNoSQL(input);
    }
    return input;
  }

  // Outros tipos (number, boolean) retornam como estão
  return input;
}

