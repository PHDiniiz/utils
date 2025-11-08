/**
 * Serializa JSON de forma segura com limite de profundidade
 * @param value - Valor a ser serializado
 * @param replacer - Função replacer opcional
 * @param space - Espaçamento opcional
 * @param maxDepth - Profundidade máxima (padrão: 10)
 * @returns String JSON ou string vazia em caso de erro
 */
export function safeJsonStringify(
  value: unknown,
  replacer?: ((this: unknown, key: string, value: unknown) => unknown) | Array<string | number> | null,
  space?: string | number,
  maxDepth: number = 10
): string {
  const seen = new WeakSet();

  function safeReplacer(key: string, val: unknown, depth: number): unknown {
    // Aplica replacer customizado se fornecido
    if (replacer) {
      if (typeof replacer === 'function') {
        val = replacer.call(value, key, val);
      } else if (Array.isArray(replacer) && !replacer.includes(key)) {
        return undefined;
      }
    }

    // Limita profundidade
    if (depth > maxDepth) {
      return '[Max Depth Reached]';
    }

    // Detecta referências circulares
    if (val !== null && typeof val === 'object') {
      if (seen.has(val)) {
        return '[Circular Reference]';
      }
      seen.add(val);
    }

    // Remove funções e undefined
    if (typeof val === 'function') {
      return '[Function]';
    }

    if (val === undefined) {
      return undefined;
    }

    return val;
  }

  try {
    const jsonString = JSON.stringify(
      value,
      (key, val) => safeReplacer(key, val, 0),
      space
    );

    return jsonString;
  } catch (error) {
    // Em caso de erro, retorna string vazia
    return '';
  }
}

