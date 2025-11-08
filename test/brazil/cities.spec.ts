import { describe, it, expect } from 'vitest';
import { getCitiesByState, cityExistsInState, getAllMainCities } from '../../src/brazil/cities';

describe('Brazil Cities', () => {
  describe('getCitiesByState', () => {
    it('deve retornar cidades de um estado', () => {
      const cities = getCitiesByState('SP');
      expect(cities.length).toBeGreaterThan(0);
      expect(cities).toContain('São Paulo');
    });

    it('deve retornar array vazio para estado inválido', () => {
      expect(getCitiesByState('XX')).toEqual([]);
    });
  });

  describe('cityExistsInState', () => {
    it('deve verificar se cidade existe no estado', () => {
      expect(cityExistsInState('São Paulo', 'SP')).toBe(true);
      expect(cityExistsInState('Rio de Janeiro', 'RJ')).toBe(true);
    });
  });

  describe('getAllMainCities', () => {
    it('deve retornar todas as cidades principais', () => {
      const cities = getAllMainCities();
      expect(cities.length).toBeGreaterThan(0);
      expect(cities[0]).toHaveProperty('name');
      expect(cities[0]).toHaveProperty('stateCode');
    });
  });
});

