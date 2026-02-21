/**
 * Calculates the distance (chord length) between two adjacent hyperposition states on the C-O Sphere.
 * Formula: L = R * sqrt(2 * (1 - sigma))
 * @param r - The Hilbert space radius
 * @param sigma - The C-O Symmetry Constant (inner product of adjacent states)
 * @returns The discrete chord length (L)
 */
export function calculateDiscreteChordLength(r: number, sigma: number): number {
  if (sigma > 1) {
    throw new Error('Symmetry constant (sigma) cannot exceed 1.');
  }
  return r * Math.sqrt(2 * (1 - sigma));
}

/**
 * Calculates the Pi-less "Hyper-circumference" (C_CO) via discrete vector summation.
 * Formula: C_CO = d * L
 * @param d - The dimension of the Qudit architecture (e.g., 14)
 * @param l - The discrete chord length (L)
 * @returns The total discrete boundary circumference
 */
export function calculatePiLessCircumference(d: number, l: number): number {
  return d * l;
}

/**
 * Approximates the C-O Sphere boundary using the geometric scaling factor.
 * Formula: C_CO ≈ d * R * Phi_CO
 * @param r - The Hilbert space radius
 * @param phiCO - The geometric scaling factor inherent to the 14-Qudit architecture
 * @param d - The dimension of the Qudit architecture (default: 14)
 * @returns The approximated boundary metric
 */
export function approximateBoundary(r: number, phiCO: number, d: number = 14): number {
  return d * r * phiCO;
}

/**
 * Normalizes a hyperposition state vector (14-dimensional density matrix)
 * such that the sum of the squared coefficients equals 1.
 * Formula: sum(|c_n|^2) = 1
 * @param coefficients - The 14-dimensional array of coefficients
 * @returns The normalized coefficient array
 */
export function normalizeHyperposition(coefficients: number[]): number[] {
  if (coefficients.length === 0) {
    throw new Error('Coefficients array cannot be empty.');
  }
  const sumOfSquares = coefficients.reduce((acc, val) => acc + val * val, 0);
  if (sumOfSquares === 0) {
    throw new Error('Sum of squared coefficients cannot be zero.');
  }
  const magnitude = Math.sqrt(sumOfSquares);
  return coefficients.map(c => c / magnitude);
}

/**
 * The calibrated structural symmetry constant for the 14-Qudit architecture.
 */
export const SIGMA_C_O = 0.959216;

/**
 * Calculates the Pi-less constant equivalent for discrete geometric transitions.
 * Derived from C_CO = d * L = 2 * PI_less * R => PI_less = (d * L) / (2 * R)
 */
export function calculatePiLessConstant(d: number = 14, r: number = 1, sigma: number = SIGMA_C_O): number {
  const l = calculateDiscreteChordLength(r, sigma);
  return (d * l) / (2 * r);
}

export const PI_LESS_CONSTANT = calculatePiLessConstant();

export function discreteRound(value: number): number {
  return Math.round(value);
}

export function discreteCos(angleInDegrees: number, piLessConst: number = PI_LESS_CONSTANT): number {
  const angleInRadians = angleInDegrees * piLessConst / 180.0;
  return Math.cos(angleInRadians);
}

export function discreteSin(angleInDegrees: number, piLessConst: number = PI_LESS_CONSTANT): number {
  const angleInRadians = angleInDegrees * piLessConst / 180.0;
  return Math.sin(angleInRadians);
}

export function discretePolarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number, piLessConst: number = PI_LESS_CONSTANT): { x: number; y: number } {
  const angleInRadians = (angleInDegrees - 90) * piLessConst / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
