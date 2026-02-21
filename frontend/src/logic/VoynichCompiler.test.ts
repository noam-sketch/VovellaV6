import { describe, it, expect } from 'vitest'
import { compileVoynich } from './VoynichCompiler'

describe('VoynichCompiler', () => {
  it('identifies Stator A modes (k, t, p, f)', () => {
    expect(compileVoynich('k').statorA).toBe('k')
    expect(compileVoynich('t').statorA).toBe('t')
    expect(compileVoynich('p').statorA).toBe('p')
    expect(compileVoynich('f').statorA).toBe('f')
  })

  it('identifies the qo prefix', () => {
    expect(compileVoynich('qo').statorA).toBe('qo')
  })

  it('handles the Scalar Cam (e, i)', () => {
    const result = compileVoynich('ke')
    expect(result.scalarCam).toBe(1)
    expect(compileVoynich('kee').scalarCam).toBe(2)
  })

  it('handles the aiin reset suffix', () => {
    const result = compileVoynich('kaiin')
    expect(result.statorC).toBe('RESET')
  })

  it('handles the hedy suffix (qo force)', () => {
    const result = compileVoynich('hedy')
    expect(result.statorC).toBe('HEDY')
  })

  it('identifies phonetic atoms for Rotor B', () => {
    expect(compileVoynich('oky').rotorB).toContain('o')
    expect(compileVoynich('oky').rotorB).toContain('k')
    expect(compileVoynich('oky').rotorB).toContain('y')
  })

  it('identifies multi-character atoms (ch, sh, ee)', () => {
    const result = compileVoynich('chee')
    expect(result.rotorB).toBe('ch,ee')
  })
})
