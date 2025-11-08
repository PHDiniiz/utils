/**
 * Valida telefone brasileiro (celular ou fixo)
 * @param phone - Telefone a ser validado (com ou sem formatação)
 * @returns true se o telefone for válido
 */
export function isPhoneBR(phone: string | number): boolean {
  if (!phone) return false;

  const str = String(phone).replace(/\D/g, '');

  // Telefone brasileiro pode ter 10 ou 11 dígitos
  // 10 dígitos: fixo (XX) XXXX-XXXX
  // 11 dígitos: celular (XX) 9XXXX-XXXX
  if (str.length < 10 || str.length > 11) return false;

  // Verifica DDD válido (11 a 99, exceto alguns códigos reservados)
  const ddd = parseInt(str.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return false;

  // DDDs inválidos
  const invalidDDDs = [20, 23, 25, 26, 29, 30, 36, 39, 40, 50, 52, 56, 57, 58, 59, 60, 70, 72, 76, 78, 80, 90];
  if (invalidDDDs.includes(ddd)) return false;

  // Se for celular (11 dígitos), o terceiro dígito deve ser 9
  if (str.length === 11) {
    const thirdDigit = parseInt(str.charAt(2), 10);
    if (thirdDigit !== 9) return false;
  }

  return true;
}

