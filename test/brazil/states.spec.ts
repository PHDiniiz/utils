import { describe, it, expect } from 'vitest';
import { getStates, getStateByCode, getStateByName, isValidStateCode } from '../../src/brazil/states';

describe('Brazil States', () => {
  describe('getStates', () => {
    it('deve retornar lista de estados', () => {
      const states = getStates();
      expect(states.length).toBeGreaterThan(0);
      expect(states[0]).toHaveProperty('code');
      expect(states[0]).toHaveProperty('name');
    });
  });

  describe('getStateByCode', () => {
    it('deve encontrar estado por código', () => {
      const state = getStateByCode('SP');
      expect(state).toBeDefined();
      expect(state?.code).toBe('SP');
    });

    it('deve retornar undefined para código inválido', () => {
      expect(getStateByCode('XX')).toBeUndefined();
    });
  });

  describe('getStateByName', () => {
    it('deve encontrar estado por nome', () => {
      const state = getStateByName('São Paulo');
      expect(state).toBeDefined();
      expect(state?.name).toBe('São Paulo');
    });
  });

  describe('isValidStateCode', () => {
    it('deve validar código de estado', () => {
      expect(isValidStateCode('SP')).toBe(true);
      expect(isValidStateCode('XX')).toBe(false);
    });
  });
});

