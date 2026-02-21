import { describe, it, expect } from 'vitest'
import { generateStatorAGCode } from './GCodeGenerator'

describe('GCodeGenerator', () => {
  it('generates G-Code header and footer', () => {
    const gcode = generateStatorAGCode()
    expect(gcode).toContain('G21') // Metric
    expect(gcode).toContain('G90') // Absolute positioning
    expect(gcode).toContain('M30') // End of program
  })

  it('contains instructions for 4 windows', () => {
    const gcode = generateStatorAGCode()
    expect(gcode).toContain('Window 1')
    expect(gcode).toContain('Window 2')
    expect(gcode).toContain('Window 3')
    expect(gcode).toContain('Window 4')
  })
})
