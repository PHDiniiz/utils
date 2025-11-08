/**
 * Valida CNPJ (Cadastro Nacional de Pessoa Jurídica)
 * @param cnpj - CNPJ a ser validado (com ou sem formatação)
 * @returns true se o CNPJ for válido
 */
export function isCNPJ(cnpj: string | number): boolean {
  if (!cnpj) return false;

  const str = String(cnpj).replace(/\D/g, '');

  if (str.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(str)) return false;

  // Valida primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(str.charAt(i), 10) * weights1[i];
  }
  let digit = sum % 11;
  digit = digit < 2 ? 0 : 11 - digit;
  if (digit !== parseInt(str.charAt(12), 10)) return false;

  // Valida segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(str.charAt(i), 10) * weights2[i];
  }
  digit = sum % 11;
  digit = digit < 2 ? 0 : 11 - digit;
  if (digit !== parseInt(str.charAt(13), 10)) return false;

  return true;
}

/**
 * Formata CNPJ no padrão XX.XXX.XXX/XXXX-XX
 * @param cnpj - CNPJ a ser formatado
 * @returns CNPJ formatado ou string vazia se inválido
 */
export function formatCNPJ(cnpj: string | number): string {
  const normalized = normalizeCNPJ(cnpj);
  if (normalized.length !== 14) return '';

  return `${normalized.slice(0, 2)}.${normalized.slice(2, 5)}.${normalized.slice(5, 8)}/${normalized.slice(8, 12)}-${normalized.slice(12, 14)}`;
}

/**
 * Normaliza CNPJ removendo formatação e mantendo apenas dígitos
 * @param cnpj - CNPJ a ser normalizado
 * @returns CNPJ normalizado (apenas dígitos) ou string vazia
 */
export function normalizeCNPJ(cnpj: string | number): string {
  if (!cnpj) return '';

  const str = String(cnpj).replace(/\D/g, '');

  // Preenche com zeros à esquerda se necessário
  return str.padStart(14, '0');
}

