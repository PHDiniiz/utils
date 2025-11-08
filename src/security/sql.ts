/**
 * Sanitiza entrada para uso em queries SQL manuais
 * ATENÇÃO: Esta função NÃO substitui prepared statements ou ORMs.
 * Use apenas como camada adicional de segurança.
 * @param input - String a ser sanitizada
 * @param options - Opções de sanitização
 * @returns String sanitizada
 */
export function sanitizeForSQL(
  input: string,
  options?: {
    escapeQuotes?: boolean;
    removeNullBytes?: boolean;
    maxLength?: number;
  }
): string {
  if (!input || typeof input !== 'string') return '';

  const {
    escapeQuotes = true,
    removeNullBytes = true,
    maxLength = 10000,
  } = options || {};

  let sanitized = input;

  // Remove null bytes
  if (removeNullBytes) {
    sanitized = sanitized.replace(/\0/g, '');
  }

  // Escapa aspas simples (mais comum em SQL)
  if (escapeQuotes) {
    sanitized = sanitized.replace(/'/g, "''");
  }

  // Remove caracteres de controle perigosos
  sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

  // Limita tamanho
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  // Remove palavras-chave SQL perigosas comuns (básico)
  // Nota: Esta é uma proteção básica. Prepared statements são essenciais.
  const dangerousKeywords = [
    /;\s*drop\s+table/gi,
    /;\s*delete\s+from/gi,
    /;\s*truncate\s+table/gi,
    /union\s+select/gi,
    /exec\s*\(/gi,
    /execute\s*\(/gi,
  ];

  for (const keyword of dangerousKeywords) {
    sanitized = sanitized.replace(keyword, '');
  }

  return sanitized;
}

