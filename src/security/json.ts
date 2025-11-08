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
  const depthMap = new WeakMap<object, number>();

  function getDepth(obj: object): number {
    if (depthMap.has(obj)) {
      return depthMap.get(obj)!;
    }
    return 0;
  }

  function setDepth(obj: object, depth: number): void {
    depthMap.set(obj, depth);
  }

  function safeReplacer(key: string, val: unknown, parentDepth: number = 0): unknown {
    // Limita profundidade
    if (parentDepth >= maxDepth) {
      return '[Max Depth Reached]';
    }

    // Detecta referências circulares
    if (val !== null && typeof val === 'object') {
      if (seen.has(val)) {
        return '[Circular Reference]';
      }
      seen.add(val);
      setDepth(val, parentDepth + 1);
    }

    // Remove funções e undefined
    if (typeof val === 'function') {
      return '[Function]';
    }

    if (val === undefined) {
      return undefined;
    }

    // Aplica replacer customizado se fornecido
    if (replacer) {
      if (typeof replacer === 'function') {
        val = replacer.call(value, key, val);
      } else if (Array.isArray(replacer) && !replacer.includes(key)) {
        return undefined;
      }
    }

    return val;
  }

  try {
    // Usa uma abordagem recursiva manual para rastrear profundidade
    function stringifyRecursive(obj: unknown, depth: number): string {
      if (depth > maxDepth) {
        return '"Max Depth Reached"';
      }

      if (obj === null) {
        return 'null';
      }

      if (typeof obj === 'string') {
        return JSON.stringify(obj);
      }

      if (typeof obj === 'number' || typeof obj === 'boolean') {
        return String(obj);
      }

      if (typeof obj === 'function') {
        return '"Function"';
      }

      if (typeof obj === 'undefined') {
        return 'null';
      }

      if (typeof obj === 'object') {
        if (seen.has(obj)) {
          return '"Circular Reference"';
        }
        seen.add(obj);

        if (Array.isArray(obj)) {
          const items = obj.map((item) => stringifyRecursive(item, depth + 1));
          return `[${items.join(',')}]`;
        } else {
          const entries = Object.entries(obj).map(([k, v]) => {
            const keyStr = JSON.stringify(k);
            const valStr = stringifyRecursive(v, depth + 1);
            return `${keyStr}:${valStr}`;
          });
          return `{${entries.join(',')}}`;
        }
      }

      return 'null';
    }

    return stringifyRecursive(value, 0);
  } catch (error) {
    // Fallback: usa JSON.stringify padrão com proteção básica
    try {
      const jsonString = JSON.stringify(
        value,
        (key, val) => {
          if (val !== null && typeof val === 'object') {
            if (seen.has(val)) {
              return '[Circular Reference]';
            }
            seen.add(val);
          }
          if (typeof val === 'function') {
            return '[Function]';
          }
          return replacer ? (typeof replacer === 'function' ? replacer.call(value, key, val) : val) : val;
        },
        space
      );
      return jsonString;
    } catch {
      return '';
    }
  }
}

