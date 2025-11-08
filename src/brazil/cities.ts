/**
 * Interface para cidade brasileira
 */
export interface BrazilianCity {
  name: string;
  stateCode: string;
}

/**
 * Lista de cidades principais por estado
 * Nota: Lista completa de todas as cidades seria muito extensa.
 * Esta é uma lista de cidades principais por estado.
 * Para lista completa, recomenda-se usar API do IBGE ou banco de dados.
 */
const MAIN_CITIES_BY_STATE: Record<string, string[]> = {
  AC: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
  AL: ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
  AP: ['Macapá', 'Santana', 'Laranjal do Jari'],
  AM: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
  BA: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Juazeiro'],
  CE: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral'],
  DF: ['Brasília'],
  ES: ['Vitória', 'Vila Velha', 'Cariacica', 'Serra', 'Cachoeiro de Itapemirim'],
  GO: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia'],
  MA: ['São Luís', 'Imperatriz', 'Caxias', 'Timon', 'Codó'],
  MT: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
  MS: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
  MG: [
    'Belo Horizonte',
    'Uberlândia',
    'Contagem',
    'Juiz de Fora',
    'Betim',
    'Montes Claros',
    'Ribeirão das Neves',
    'Uberaba',
    'Governador Valadares',
    'Ipatinga',
  ],
  PA: ['Belém', 'Ananindeua', 'Marituba', 'Paragominas', 'Castanhal'],
  PB: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
  PR: [
    'Curitiba',
    'Londrina',
    'Maringá',
    'Ponta Grossa',
    'Cascavel',
    'São José dos Pinhais',
    'Foz do Iguaçu',
    'Colombo',
    'Guarapuava',
    'Paranaguá',
  ],
  PE: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina'],
  PI: ['Teresina', 'Parnaíba', 'Picos', 'Piripiri', 'Floriano'],
  RJ: [
    'Rio de Janeiro',
    'São Gonçalo',
    'Duque de Caxias',
    'Nova Iguaçu',
    'Niterói',
    'Campos dos Goytacazes',
    'Belford Roxo',
    'São João de Meriti',
    'Petrópolis',
    'Volta Redonda',
  ],
  RN: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba'],
  RS: [
    'Porto Alegre',
    'Caxias do Sul',
    'Pelotas',
    'Canoas',
    'Santa Maria',
    'Gravataí',
    'Viamão',
    'Novo Hamburgo',
    'São Leopoldo',
    'Rio Grande',
  ],
  RO: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'],
  RR: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Alto Alegre', 'Mucajaí'],
  SC: [
    'Florianópolis',
    'Joinville',
    'Blumenau',
    'São José',
    'Criciúma',
    'Chapecó',
    'Itajaí',
    'Lages',
    'Jaraguá do Sul',
    'Palhoça',
  ],
  SP: [
    'São Paulo',
    'Guarulhos',
    'Campinas',
    'São Bernardo do Campo',
    'Santo André',
    'Osasco',
    'Ribeirão Preto',
    'Sorocaba',
    'Santos',
    'Mauá',
  ],
  SE: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão'],
  TO: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins'],
};

/**
 * Obtém lista de cidades principais por estado
 * @param stateCode - Código do estado (ex: "SP")
 * @returns Array de nomes de cidades ou array vazio se estado inválido
 */
export function getCitiesByState(stateCode: string): string[] {
  if (!stateCode) return [];

  const upperCode = stateCode.toUpperCase();
  return MAIN_CITIES_BY_STATE[upperCode] || [];
}

/**
 * Verifica se uma cidade existe em um estado
 * @param cityName - Nome da cidade
 * @param stateCode - Código do estado
 * @returns true se a cidade existir no estado
 */
export function cityExistsInState(cityName: string, stateCode: string): boolean {
  if (!cityName || !stateCode) return false;

  const cities = getCitiesByState(stateCode);
  return cities.some((city) => city.toLowerCase() === cityName.toLowerCase());
}

/**
 * Obtém todas as cidades principais de todos os estados
 * @returns Array de objetos com nome da cidade e código do estado
 */
export function getAllMainCities(): BrazilianCity[] {
  const cities: BrazilianCity[] = [];

  for (const [stateCode, cityNames] of Object.entries(MAIN_CITIES_BY_STATE)) {
    for (const cityName of cityNames) {
      cities.push({ name: cityName, stateCode });
    }
  }

  return cities;
}

