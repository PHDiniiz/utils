/**
 * Valida data no formato brasileiro (dd/mm/yyyy)
 * @param date - Data a ser validada
 * @returns true se a data for válida
 */
export function isDateBR(date: string): boolean {
  if (!date || typeof date !== 'string') return false;

  const trimmed = date.trim();

  // Verifica formato básico dd/mm/yyyy
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = trimmed.match(dateRegex);

  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  // Valida mês
  if (month < 1 || month > 12) return false;

  // Valida ano (aceita anos de 1900 a 2100)
  if (year < 1900 || year > 2100) return false;

  // Valida dia
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return false;

  return true;
}

