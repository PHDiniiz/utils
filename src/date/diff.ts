/**
 * Calcula diferença entre duas datas
 * @param date1 - Primeira data
 * @param date2 - Segunda data
 * @param unit - Unidade de medida ('days', 'hours', 'minutes', 'seconds', 'milliseconds')
 * @returns Diferença na unidade especificada
 */
export function dateDiff(
  date1: Date | string | number,
  date2: Date | string | number,
  unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' = 'milliseconds'
): number {
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return NaN;
  }

  const diffMs = Math.abs(d2.getTime() - d1.getTime());

  switch (unit) {
    case 'days':
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    case 'hours':
      return Math.floor(diffMs / (1000 * 60 * 60));
    case 'minutes':
      return Math.floor(diffMs / (1000 * 60));
    case 'seconds':
      return Math.floor(diffMs / 1000);
    case 'milliseconds':
    default:
      return diffMs;
  }
}

