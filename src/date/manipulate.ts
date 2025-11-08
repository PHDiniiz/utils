/**
 * Adiciona tempo a uma data
 * @param date - Data base
 * @param amount - Quantidade a adicionar
 * @param unit - Unidade ('days', 'hours', 'minutes', 'seconds', 'milliseconds')
 * @returns Nova data com tempo adicionado
 */
export function addTime(
  date: Date | string | number,
  amount: number,
  unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  const dateObj = date instanceof Date ? new Date(date) : new Date(date);

  if (isNaN(dateObj.getTime())) {
    throw new Error('Data inválida');
  }

  const newDate = new Date(dateObj);

  switch (unit) {
    case 'days':
      newDate.setDate(newDate.getDate() + amount);
      break;
    case 'hours':
      newDate.setHours(newDate.getHours() + amount);
      break;
    case 'minutes':
      newDate.setMinutes(newDate.getMinutes() + amount);
      break;
    case 'seconds':
      newDate.setSeconds(newDate.getSeconds() + amount);
      break;
    case 'milliseconds':
      newDate.setMilliseconds(newDate.getMilliseconds() + amount);
      break;
  }

  return newDate;
}

/**
 * Subtrai tempo de uma data
 * @param date - Data base
 * @param amount - Quantidade a subtrair
 * @param unit - Unidade ('days', 'hours', 'minutes', 'seconds', 'milliseconds')
 * @returns Nova data com tempo subtraído
 */
export function subtractTime(
  date: Date | string | number,
  amount: number,
  unit: 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
): Date {
  return addTime(date, -amount, unit);
}

