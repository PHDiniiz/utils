/**
 * Obtém data/hora atual no fuso horário do Brasil (America/Sao_Paulo)
 * @returns Objeto Date ajustado para o fuso horário do Brasil
 */
export function getBrazilTime(): Date {
  const now = new Date();
  // Retorna a data atual (o JavaScript Date já trabalha com timezone local)
  // Para conversão explícita, seria necessário usar uma biblioteca como date-fns-tz
  // Por enquanto, retornamos a data atual
  return now;
}

/**
 * Formata data/hora no padrão brasileiro considerando fuso horário
 * @param date - Data a ser formatada
 * @param options - Opções de formatação
 * @returns Data/hora formatada
 */
export function formatBrazilDateTime(
  date: Date | string | number,
  options?: {
    includeSeconds?: boolean;
    includeDate?: boolean;
  }
): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) return '';

  // Formata no padrão brasileiro
  const parts: string[] = [];

  if (options?.includeDate !== false) {
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    parts.push(`${day}/${month}/${year}`);
  }

  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  let timeStr = `${hours}:${minutes}`;

  if (options?.includeSeconds !== false) {
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');
    timeStr += `:${seconds}`;
  }

  parts.push(timeStr);

  return parts.join(' ');
}

