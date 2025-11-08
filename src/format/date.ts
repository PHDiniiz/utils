/**
 * Formata data no padrão brasileiro (dd/mm/yyyy)
 * @param date - Data (Date, string ISO, ou timestamp)
 * @returns Data formatada ou string vazia se inválida
 */
export function formatDateBR(date: Date | string | number): string {
  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (typeof date === 'number') {
    dateObj = new Date(date);
  } else {
    return '';
  }

  if (isNaN(dateObj.getTime())) return '';

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Formata data e hora no padrão brasileiro (dd/mm/yyyy HH:mm:ss)
 * @param date - Data (Date, string ISO, ou timestamp)
 * @param options - Opções de formatação
 * @returns Data e hora formatadas ou string vazia se inválida
 */
export function formatDateTimeBR(
  date: Date | string | number,
  options?: {
    includeSeconds?: boolean;
    includeDate?: boolean;
  }
): string {
  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (typeof date === 'number') {
    dateObj = new Date(date);
  } else {
    return '';
  }

  if (isNaN(dateObj.getTime())) return '';

  const { includeSeconds = true, includeDate = true } = options || {};

  const parts: string[] = [];

  if (includeDate) {
    parts.push(formatDateBR(dateObj));
  }

  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  let timeStr = `${hours}:${minutes}`;

  if (includeSeconds) {
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');
    timeStr += `:${seconds}`;
  }

  parts.push(timeStr);

  return parts.join(' ');
}

/**
 * Formata data no padrão ISO (yyyy-mm-dd)
 * @param date - Data (Date, string ISO, ou timestamp)
 * @returns Data formatada em ISO ou string vazia se inválida
 */
export function formatISO(date: Date | string | number): string {
  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (typeof date === 'number') {
    dateObj = new Date(date);
  } else {
    return '';
  }

  if (isNaN(dateObj.getTime())) return '';

  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

