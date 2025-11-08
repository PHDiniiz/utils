import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { lookupCEP } from '../../src/brazil/cep';

// Mock global fetch
global.fetch = vi.fn();

describe('CEP Lookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve buscar CEP válido', async () => {
    const mockResponse = {
      cep: '01310100',
      logradouro: 'Avenida Paulista',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
    };

    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await lookupCEP('01310-100');
    expect(result).toBeDefined();
    expect(result?.cep).toBe('01310100');
    expect(result?.localidade).toBe('São Paulo');
  });

  it('deve retornar null para CEP inválido', async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ erro: true }),
    });

    const result = await lookupCEP('00000000');
    expect(result).toBeNull();
  });

  it('deve retornar null para CEP com formato incorreto', async () => {
    const result = await lookupCEP('123');
    expect(result).toBeNull();
  });
});

