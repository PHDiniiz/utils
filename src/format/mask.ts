import { normalizeCPF, normalizeCNPJ } from '../validation/cpf';
import { normalizeCEP } from '../validation/cep';

/**
 * Aplica máscara genérica baseada em padrão
 * @param value - Valor a ser mascarado
 * @param pattern - Padrão da máscara (ex: "###.###.###-##")
 * @returns Valor com máscara aplicada
 */
export function applyMask(value: string | number, pattern: string): string {
  if (!value && value !== 0) return '';

  const str = String(value).replace(/\D/g, '');
  let result = '';
  let valueIndex = 0;

  for (let i = 0; i < pattern.length && valueIndex < str.length; i++) {
    if (pattern[i] === '#') {
      result += str[valueIndex];
      valueIndex++;
    } else {
      result += pattern[i];
    }
  }

  return result;
}

/**
 * Formata CPF no padrão XXX.XXX.XXX-XX
 * @param cpf - CPF a ser formatado
 * @returns CPF formatado
 */
export function formatCPF(cpf: string | number): string {
  const normalized = normalizeCPF(cpf);
  if (normalized.length !== 11) return String(cpf);

  return applyMask(normalized, '###.###.###-##');
}

/**
 * Formata CNPJ no padrão XX.XXX.XXX/XXXX-XX
 * @param cnpj - CNPJ a ser formatado
 * @returns CNPJ formatado
 */
export function formatCNPJ(cnpj: string | number): string {
  const normalized = normalizeCNPJ(cnpj);
  if (normalized.length !== 14) return String(cnpj);

  return applyMask(normalized, '##.###.###/####-##');
}

/**
 * Formata CEP no padrão XXXXX-XXX
 * @param cep - CEP a ser formatado
 * @returns CEP formatado
 */
export function formatCEP(cep: string | number): string {
  const normalized = normalizeCEP(cep);
  if (normalized.length !== 8) return String(cep);

  return applyMask(normalized, '#####-###');
}

/**
 * Formata telefone brasileiro
 * @param phone - Telefone a ser formatado
 * @returns Telefone formatado
 */
export function formatPhone(phone: string | number): string {
  if (!phone && phone !== 0) return '';

  const str = String(phone).replace(/\D/g, '');

  if (str.length === 10) {
    // Telefone fixo: (XX) XXXX-XXXX
    return applyMask(str, '(##) ####-####');
  } else if (str.length === 11) {
    // Celular: (XX) 9XXXX-XXXX
    return applyMask(str, '(##) #####-####');
  }

  return String(phone);
}

/**
 * Remove pontuação de uma string
 * @param value - Valor a ser normalizado
 * @returns String sem pontuação
 */
export function removePunctuation(value: string | number): string {
  if (!value && value !== 0) return '';

  return String(value).replace(/[^\w\s]/g, '');
}

/**
 * Remove apenas caracteres não numéricos
 * @param value - Valor a ser normalizado
 * @returns String apenas com dígitos
 */
export function onlyDigits(value: string | number): string {
  if (!value && value !== 0) return '';

  return String(value).replace(/\D/g, '');
}

