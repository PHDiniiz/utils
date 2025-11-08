/**
 * Converte data para timestamp Unix (milissegundos)
 * @param date - Data a ser convertida
 * @returns Timestamp em milissegundos
 */
export function dateToTimestamp(date: Date | string | number): number {
  let dateObj: Date;

  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (typeof date === 'number') {
    dateObj = new Date(date);
  } else {
    return NaN;
  }

  return dateObj.getTime();
}

/**
 * Converte data para timestamp Unix (segundos)
 * @param date - Data a ser convertida
 * @returns Timestamp em segundos
 */
export function dateToTimestampSeconds(date: Date | string | number): number {
  const ms = dateToTimestamp(date);
  return isNaN(ms) ? NaN : Math.floor(ms / 1000);
}

/**
 * Converte data para string UTC ISO
 * @param date - Data a ser convertida
 * @returns String ISO em UTC
 */
export function dateToUTC(date: Date | string | number): string {
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

  return dateObj.toISOString();
}

/**
 * Converte timestamp para Date
 * @param timestamp - Timestamp em milissegundos ou segundos
 * @returns Objeto Date
 */
export function timestampToDate(timestamp: number): Date {
  // Se o timestamp for menor que um valor razoável, assume que está em segundos
  const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  return new Date(ms);
}

