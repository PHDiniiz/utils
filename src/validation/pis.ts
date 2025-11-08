/**
 * Valida PIS/PASEP (Programa de Integração Social / Programa de Formação do Patrimônio do Servidor Público)
 * @param pis - PIS/PASEP a ser validado (com ou sem formatação)
 * @returns true se o PIS/PASEP for válido
 */
export function isPIS(pis: string | number): boolean {
  if (!pis) return false;

  const str = String(pis).replace(/\D/g, '');

  // PIS/PASEP deve ter exatamente 11 dígitos
  if (str.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(str)) return false;

  // Valida dígito verificador
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(str.charAt(i), 10) * weights[i];
  }

  const remainder = sum % 11;
  const digit = remainder < 2 ? 0 : 11 - remainder;

  return digit === parseInt(str.charAt(10), 10);
}

