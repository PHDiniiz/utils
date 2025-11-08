import { formatBRL, parseBRL } from '../format/currency';

/**
 * Converte número para string de moeda brasileira
 * @param value - Valor numérico
 * @returns String formatada (ex: "R$ 1.234,56")
 */
export function numberToBRL(value: number | string): string {
  return formatBRL(value);
}

/**
 * Converte string de moeda brasileira para número
 * @param value - String formatada (ex: "R$ 1.234,56")
 * @returns Número ou NaN se inválido
 */
export function brlToNumber(value: string): number {
  return parseBRL(value);
}

