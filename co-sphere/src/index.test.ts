import { describe, it, expect } from 'vitest';
import {
  calculateDiscreteChordLength,
  calculatePiLessCircumference,
  approximateBoundary,
  normalizeHyperposition,
  DEDEKIND_ETA_TAX,
  LION_CONSTANT,
} from './index.js';

describe('C-O Sphere Math Library', () => {
  describe('Astrolabio Constants (Lion Lock)', () => {
    it('verifies the 4% Dedekind Eta Tax', () => {
      expect(DEDEKIND_ETA_TAX).toBeCloseTo(0.040784, 6);
    });

    it('verifies the Lion Constant as the stabilized symmetry', () => {
      expect(LION_CONSTANT).toBe(1.0 - DEDEKIND_ETA_TAX);
    });
  });

  describe('calculateDiscreteChordLength', () => {
    it('calculates chord length correctly', () => {
      const r = 2;
      const sigma = 0.5;
      // L = 2 * sqrt(2 * 0.5) = 2 * 1 = 2
      expect(calculateDiscreteChordLength(r, sigma)).toBeCloseTo(2);
    });

    it('throws error if sigma > 1', () => {
      expect(() => calculateDiscreteChordLength(2, 1.5)).toThrowError();
    });
  });

  describe('calculatePiLessCircumference', () => {
    it('calculates the circumference using dimensions and chord length', () => {
      // C_CO = 14 * 2 = 28
      expect(calculatePiLessCircumference(14, 2)).toBeCloseTo(28);
    });
  });

  describe('approximateBoundary', () => {
    it('calculates the approximated boundary using scaling factor', () => {
      // 14 * 2 * 1.5 = 42
      expect(approximateBoundary(2, 1.5)).toBeCloseTo(42);
    });

    it('allows custom dimension', () => {
      // 10 * 2 * 1.5 = 30
      expect(approximateBoundary(2, 1.5, 10)).toBeCloseTo(30);
    });
  });

  describe('normalizeHyperposition', () => {
    it('normalizes a coefficient array correctly', () => {
      const coefficients = [1, 1, 1, 1]; // sum of squares = 4, mag = 2
      const result = normalizeHyperposition(coefficients);
      expect(result).toEqual([0.5, 0.5, 0.5, 0.5]);
    });

    it('throws error for empty array', () => {
      expect(() => normalizeHyperposition([])).toThrowError();
    });

    it('throws error for zero magnitude', () => {
      expect(() => normalizeHyperposition([0, 0, 0])).toThrowError();
    });
  });
});