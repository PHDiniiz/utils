/**
 * Valida CEP (Código de Endereçamento Postal)
 * @param cep - CEP a ser validado (com ou sem formatação)
 * @returns true se o CEP for válido
 */
export function isCEP(cep: string | number): boolean {
  if (!cep) return false;

  const str = String(cep).replace(/\D/g, '');

  // CEP deve ter exatamente 8 dígitos
  if (str.length !== 8) return false;

  // Verifica se não são todos zeros
  if (/^0+$/.test(str)) return false;

  return true;
}

/**
 * Normaliza CEP removendo formatação e mantendo apenas dígitos
 * @param cep - CEP a ser normalizado
 * @returns CEP normalizado (apenas dígitos) ou string vazia
 */
export function normalizeCEP(cep: string | number): string {
  if (!cep) return '';

  const str = String(cep).replace(/\D/g, '');

  // Preenche com zeros à esquerda se necessário
  return str.padStart(8, '0');
}

