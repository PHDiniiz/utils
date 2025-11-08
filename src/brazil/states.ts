/**
 * Interface para estado brasileiro
 */
export interface BrazilianState {
  code: string;
  name: string;
}

/**
 * Lista completa de estados brasileiros com siglas
 */
export const BRAZILIAN_STATES: BrazilianState[] = [
  { code: 'AC', name: 'Acre' },
  { code: 'AL', name: 'Alagoas' },
  { code: 'AP', name: 'Amapá' },
  { code: 'AM', name: 'Amazonas' },
  { code: 'BA', name: 'Bahia' },
  { code: 'CE', name: 'Ceará' },
  { code: 'DF', name: 'Distrito Federal' },
  { code: 'ES', name: 'Espírito Santo' },
  { code: 'GO', name: 'Goiás' },
  { code: 'MA', name: 'Maranhão' },
  { code: 'MT', name: 'Mato Grosso' },
  { code: 'MS', name: 'Mato Grosso do Sul' },
  { code: 'MG', name: 'Minas Gerais' },
  { code: 'PA', name: 'Pará' },
  { code: 'PB', name: 'Paraíba' },
  { code: 'PR', name: 'Paraná' },
  { code: 'PE', name: 'Pernambuco' },
  { code: 'PI', name: 'Piauí' },
  { code: 'RJ', name: 'Rio de Janeiro' },
  { code: 'RN', name: 'Rio Grande do Norte' },
  { code: 'RS', name: 'Rio Grande do Sul' },
  { code: 'RO', name: 'Rondônia' },
  { code: 'RR', name: 'Roraima' },
  { code: 'SC', name: 'Santa Catarina' },
  { code: 'SP', name: 'São Paulo' },
  { code: 'SE', name: 'Sergipe' },
  { code: 'TO', name: 'Tocantins' },
];

/**
 * Obtém lista de estados
 * @returns Array de estados brasileiros
 */
export function getStates(): BrazilianState[] {
  return [...BRAZILIAN_STATES];
}

/**
 * Obtém estado por código (sigla)
 * @param code - Código do estado (ex: "SP")
 * @returns Estado ou undefined se não encontrado
 */
export function getStateByCode(code: string): BrazilianState | undefined {
  if (!code) return undefined;

  return BRAZILIAN_STATES.find((state) => state.code.toUpperCase() === code.toUpperCase());
}

/**
 * Obtém estado por nome
 * @param name - Nome do estado
 * @returns Estado ou undefined se não encontrado
 */
export function getStateByName(name: string): BrazilianState | undefined {
  if (!name) return undefined;

  return BRAZILIAN_STATES.find(
    (state) => state.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Verifica se um código de estado é válido
 * @param code - Código do estado
 * @returns true se o código for válido
 */
export function isValidStateCode(code: string): boolean {
  return getStateByCode(code) !== undefined;
}

