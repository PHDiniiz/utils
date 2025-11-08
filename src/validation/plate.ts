/**
 * Valida placa de veículo brasileira (padrão antigo ou Mercosul)
 * @param plate - Placa a ser validada
 * @returns true se a placa for válida
 */
export function isPlate(plate: string): boolean {
  if (!plate || typeof plate !== 'string') return false;

  const normalized = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // Padrão antigo: ABC1234 (3 letras + 4 números)
  const oldPattern = /^[A-Z]{3}[0-9]{4}$/;
  if (oldPattern.test(normalized)) return true;

  // Padrão Mercosul: ABC1D23 (3 letras + 1 número + 1 letra + 2 números)
  const mercosulPattern = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  if (mercosulPattern.test(normalized)) return true;

  return false;
}

/**
 * Verifica se a placa está no padrão antigo
 * @param plate - Placa a ser verificada
 * @returns true se for padrão antigo
 */
export function isOldPlate(plate: string): boolean {
  if (!plate || typeof plate !== 'string') return false;

  const normalized = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return /^[A-Z]{3}[0-9]{4}$/.test(normalized);
}

/**
 * Verifica se a placa está no padrão Mercosul
 * @param plate - Placa a ser verificada
 * @returns true se for padrão Mercosul
 */
export function isMercosulPlate(plate: string): boolean {
  if (!plate || typeof plate !== 'string') return false;

  const normalized = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(normalized);
}

