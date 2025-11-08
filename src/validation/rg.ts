/**
 * Valida RG (Registro Geral) brasileiro
 * Aceita RG com ou sem dígito verificador
 * @param rg - RG a ser validado (com ou sem formatação)
 * @returns true se o RG for válido
 */
export function isRG(rg: string | number): boolean {
  if (!rg) return false;

  const str = String(rg).replace(/\D/g, '');

  // RG brasileiro geralmente tem entre 7 e 9 dígitos (sem contar o dígito verificador)
  // Com dígito verificador pode ter até 10 caracteres
  // Alguns estados têm formatos específicos, mas vamos aceitar o padrão mais comum
  if (str.length < 7 || str.length > 10) return false;

  // Verifica se não são todos zeros
  if (/^0+$/.test(str)) return false;

  // Validação básica: formato numérico válido
  // Nota: RG não tem validação nacional unificada como CPF/CNPJ
  // Cada estado tem suas próprias regras, então esta é uma validação básica
  return /^\d+$/.test(str);
}

/**
 * Verifica se o RG tem dígito verificador
 * @param rg - RG a ser verificado
 * @returns true se tiver dígito verificador (último caractere não numérico ou X)
 */
export function hasRGDVerifier(rg: string): boolean {
  if (!rg || typeof rg !== 'string') return false;

  const normalized = rg.toUpperCase().trim();
  const lastChar = normalized.slice(-1);

  // Dígito verificador pode ser um número ou X
  return /^[0-9X]$/.test(lastChar);
}

