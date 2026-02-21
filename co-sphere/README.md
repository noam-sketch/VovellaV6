# C-O Sphere Math Library

A high-precision TypeScript library for high-dimensional manifold calculations, specifically optimized for **14-Qudit Hyperposition** and **Pi-less Discrete Boundary Mapping**.

## Description

Traditional continuous geometry relies on the transcendental constant $\pi$ (e.g., $C = 2\pi r$). The **C-O Sphere Library** implements a paradigm shift to discrete quantum geometry. By treating the circle as an emergent property of 14-Qudit symmetry, boundary metrics are calculated through discrete vector summation:

$$L = R\sqrt{2(1 - \sigma)}$$
$$C_{CO} = d \cdot L$$

This library provides the mathematical foundation for calculating circular boundaries within 14-level quantum systems (Qudits) in $O(1)$ time relative to state-density.

## Features

- **Pi-less Circumference:** Calculate circumferences using discrete chord lengths ($L$) and Hilbert space radii ($R$).
- **Hyperpositional Math:** Normalize 14-dimensional density matrices where $\sum |c_n|^2 = 1$.
- **Geometric Scaling:** Approximate boundaries using the $14	ext{-Qudit}$ architecture's inherent scaling factor ($\Phi_{CO}$).
- **TypeScript First:** Fully typed with generated declarations for seamless integration.

## Installation

```bash
# Inside your project
npm install ./co-sphere
```

## Usage

```typescript
import { 
  calculateDiscreteChordLength, 
  calculatePiLessCircumference,
  normalizeHyperposition 
} from 'co-sphere';

// 1. Calculate the discrete chord length (L)
const radius = 1.0;
const sigma = 0.5; // C-O Symmetry Constant
const L = calculateDiscreteChordLength(radius, sigma);

// 2. Calculate the Pi-less Hyper-circumference
const dimension = 14;
const circumference = calculatePiLessCircumference(dimension, L);

// 3. Normalize a Hyperposition state
const rawCoefficients = [1, 1, 1, 1 /* ... up to 14 */];
const state = normalizeHyperposition(rawCoefficients);
```

## Contributing

This library is a research initiative of **Cohen-Okebe Quantum Architectures**. For contributions:
1. Ensure 100% test coverage using `npm test`.
2. Adhere to project linting standards with `npm run lint`.
3. Document any new geometric constants added to the `src/index.ts`.

## License

ISC License - Copyright (c) 2026 Cohen-Okebe Quantum Architectures
