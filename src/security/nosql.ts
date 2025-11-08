/**
 * Sanitiza objeto para prevenir NoSQL injection (MongoDB)
 * Remove operadores especiais que podem causar query injection
 * @param input - Objeto ou valor a ser sanitizado
 * @returns Objeto sanitizado
 */
export function sanitizeForNoSQL(input: unknown): unknown {
  if (input === null || input === undefined) {
    return input;
  }

  // Se for string, retorna como está (não há operadores perigosos em strings simples)
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    return input;
  }

  // Se for array, sanitiza cada elemento
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeForNoSQL(item));
  }

  // Se for objeto, remove chaves perigosas e sanitiza valores
  if (typeof input === 'object') {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(input)) {
      // Remove chaves que começam com $ (operadores MongoDB)
      if (key.startsWith('$')) {
        continue;
      }

      // Remove chaves que contêm . em posições perigosas (notação de ponto do MongoDB)
      // Mas permite chaves normais que contenham ponto
      if (key.includes('.$') || key.startsWith('$.')) {
        continue;
      }

      // Sanitiza o valor recursivamente
      sanitized[key] = sanitizeForNoSQL(value);
    }

    return sanitized;
  }

  return input;
}

/**
 * Limpa profundamente um objeto MongoDB removendo todos os operadores perigosos
 * @param obj - Objeto a ser limpo
 * @returns Cópia limpa do objeto
 */
export function deepCleanMongoObject(obj: unknown): unknown {
  return sanitizeForNoSQL(obj);
}

