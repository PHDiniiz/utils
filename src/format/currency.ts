/**
 * Formata número como moeda brasileira (R$)
 * @param value - Valor a ser formatado
 * @param options - Opções de formatação
 * @returns Valor formatado como "R$ X.XXX,XX"
 */
export function formatBRL(
  value: number | string,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
  }
): string {
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.,-]/g, '').replace(',', '.')) : value;

  if (isNaN(numValue)) return '';

  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSymbol = true,
  } = options || {};

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numValue);

  return showSymbol ? formatted : formatted.replace('R$', '').trim();
}

/**
 * Converte string de moeda brasileira para número
 * @param value - String formatada (ex: "R$ 1.234,56")
 * @returns Número ou NaN se inválido
 */
export function parseBRL(value: string): number {
  if (!value || typeof value !== 'string') return NaN;

  // Remove símbolos e espaços, substitui vírgula por ponto
  const cleaned = value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? NaN : parsed;
}

/**
 * Converte número para string de moeda brasileira sem símbolo
 * @param value - Valor numérico
 * @returns String formatada (ex: "1.234,56")
 */
export function numberToBRL(value: number | string): string {
  return formatBRL(value, { showSymbol: false });
}

/**
 * Converte string de moeda brasileira para número
 * @param value - String formatada
 * @returns Número ou NaN se inválido
 */
export function brlToNumber(value: string): number {
  return parseBRL(value);
}

