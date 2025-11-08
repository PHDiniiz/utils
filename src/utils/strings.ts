/**
 * Gera slug amigável a partir de uma string
 * @param text - Texto a ser convertido
 * @returns Slug amigável (ex: "ola-mundo")
 */
export function slugify(text: string): string {
  if (!text || typeof text !== 'string') return '';

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

/**
 * Remove emojis de uma string
 * @param text - Texto a ser processado
 * @returns String sem emojis
 */
export function removeEmojis(text: string): string {
  if (!text || typeof text !== 'string') return '';

  // Regex para remover emojis (incluindo variações de cor de pele e flags)
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FAFF}]/gu;

  return text.replace(emojiRegex, '');
}

/**
 * Valida se uma string é um JSON válido
 * @param json - String a ser validada
 * @returns true se for JSON válido
 */
export function isValidJSON(json: string): boolean {
  if (!json || typeof json !== 'string') return false;

  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}

/**
 * Capitaliza primeira letra de uma string
 * @param str - String a ser capitalizada
 * @returns String com primeira letra maiúscula
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== 'string') return '';

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Capitaliza primeira letra de cada palavra
 * @param str - String a ser capitalizada
 * @returns String com primeira letra de cada palavra maiúscula
 */
export function capitalizeWords(str: string): string {
  if (!str || typeof str !== 'string') return '';

  return str
    .split(/\s+/)
    .map((word) => capitalize(word))
    .join(' ');
}

