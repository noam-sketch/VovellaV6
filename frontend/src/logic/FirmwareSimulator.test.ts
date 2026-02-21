import { describe, it, expect } from 'vitest'
import { FirmwareSimulator } from './FirmwareSimulator'

describe('FirmwareSimulator', () => {
  it('calculates steps correctly for a single movement', () => {
    const simulator = new FirmwareSimulator()
    const result = simulator.calculateSteps(16.3636) // One groove
    expect(result).toBe(1)
  })

  it('tracks angular state across movements', () => {
    const simulator = new FirmwareSimulator()
    simulator.moveTo(32.7272) // 2 grooves
    expect(simulator.getCurrentAngle()).toBeCloseTo(32.7272, 4)
  })

  it('calculates relative steps between states', () => {
    const simulator = new FirmwareSimulator()
    simulator.moveTo(16.3636)
    const stepsNeeded = simulator.calculateStepsTo(49.0908) // 3 grooves total, 2 more needed
    expect(stepsNeeded).toBe(2)
  })

  it('calculates tooth jumps (13/17)', () => {
    const simulator = new FirmwareSimulator()
    // 13 jumps of 16.3636 degrees (discrete approximation)
    expect(simulator.calculateToothJump(13)).toBeCloseTo(212.7268, 1)
    // 17 jumps
    expect(simulator.calculateToothJump(17)).toBeCloseTo(278.1812, 1)
  })
})
