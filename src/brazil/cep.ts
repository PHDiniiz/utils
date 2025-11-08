import { normalizeCEP } from '../validation/cep';

/**
 * Interface para resposta da busca de CEP
 */
export interface CEPResponse {
  cep: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

/**
 * Busca informações de CEP usando ViaCEP
 * @param cep - CEP a ser buscado (com ou sem formatação)
 * @returns Dados do CEP ou null se não encontrado
 */
export async function lookupCEP(cep: string | number): Promise<CEPResponse | null> {
  const normalized = normalizeCEP(cep);

  if (normalized.length !== 8) {
    return null;
  }

  try {
    // Tenta ViaCEP primeiro
    const viaCepUrl = `https://viacep.com.br/ws/${normalized}/json/`;
    const response = await fetch(viaCepUrl);

    if (!response.ok) {
      // Fallback: tenta API alternativa (BrasilAPI)
      return await lookupCEPFallback(normalized);
    }

    const data = (await response.json()) as CEPResponse;

    if (data.erro) {
      // Se ViaCEP retornar erro, tenta fallback
      return await lookupCEPFallback(normalized);
    }

    return data;
  } catch (error) {
    // Em caso de erro, tenta fallback
    return await lookupCEPFallback(normalized);
  }
}

/**
 * Fallback para busca de CEP usando BrasilAPI
 * @param cep - CEP normalizado (8 dígitos)
 * @returns Dados do CEP ou null se não encontrado
 */
async function lookupCEPFallback(cep: string): Promise<CEPResponse | null> {
  try {
    const brasilApiUrl = `https://brasilapi.com.br/api/cep/v1/${cep}`;
    const response = await fetch(brasilApiUrl);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      cep: string;
      state: string;
      city: string;
      neighborhood?: string;
      street?: string;
    };

    // Converte formato BrasilAPI para formato ViaCEP
    return {
      cep: data.cep.replace(/\D/g, ''),
      logradouro: data.street,
      bairro: data.neighborhood,
      localidade: data.city,
      uf: data.state,
    };
  } catch {
    return null;
  }
}

