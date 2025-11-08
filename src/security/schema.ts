/**
 * Valida dados usando schema Zod
 * @param data - Dados a serem validados
 * @param schema - Schema Zod
 * @returns Resultado da validação
 */
export function validateSchema<T>(
  data: unknown,
  schema: { parse: (data: unknown) => T; safeParse: (data: unknown) => { success: boolean; data?: T; error?: unknown } }
): { success: true; data: T } | { success: false; errors: unknown } {
  try {
    const result = schema.safeParse(data);

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, errors: result.error };
  } catch (error) {
    return { success: false, errors: error };
  }
}

