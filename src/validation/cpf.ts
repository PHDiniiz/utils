/**
 * Valida CPF (Cadastro de Pessoa Física)
 * @param cpf - CPF a ser validado (com ou sem formatação)
 * @returns true se o CPF for válido
 */
export function isCPF(cpf: string | number): boolean {
  if (!cpf) return false;

  const str = String(cpf).replace(/\D/g, '');

  if (str.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(str)) return false;

  // Valida primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(str.charAt(i), 10) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(str.charAt(9), 10)) return false;

  // Valida segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(str.charAt(i), 10) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(str.charAt(10), 10)) return false;

  return true;
}

/**
 * Formata CPF no padrão XXX.XXX.XXX-XX
 * @param cpf - CPF a ser formatado
 * @returns CPF formatado ou string vazia se inválido
 */
export function formatCPF(cpf: string | number): string {
  const normalized = normalizeCPF(cpf);
  if (normalized.length !== 11) return '';

  return `${normalized.slice(0, 3)}.${normalized.slice(3, 6)}.${normalized.slice(6, 9)}-${normalized.slice(9, 11)}`;
}

/**
 * Normaliza CPF removendo formatação e mantendo apenas dígitos
 * @param cpf - CPF a ser normalizado
 * @returns CPF normalizado (apenas dígitos) ou string vazia
 */
export function normalizeCPF(cpf: string | number): string {
  if (!cpf) return '';

  const str = String(cpf).replace(/\D/g, '');

  // Preenche com zeros à esquerda se necessário
  return str.padStart(11, '0');
}

