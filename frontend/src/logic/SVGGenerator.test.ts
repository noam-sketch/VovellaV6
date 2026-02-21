import { describe, it, expect } from 'vitest'
import { generateStatorASVG } from './SVGGenerator'

describe('SVGGenerator', () => {
  it('generates a valid SVG string', () => {
    const svg = generateStatorASVG()
    expect(svg).toContain('<svg')
    expect(svg).toContain('viewBox="0 0 100 100"')
    expect(svg).toContain('</svg>')
  })

  it('contains 4 window paths', () => {
    const svg = generateStatorASVG()
    // Check for the presence of paths for the windows
    const paths = svg.match(/<path/g)
    expect(paths?.length).toBe(4)
  })
})
