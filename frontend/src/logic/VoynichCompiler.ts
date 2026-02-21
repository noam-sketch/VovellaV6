export type StatorAMode = 'k' | 't' | 'p' | 'f' | 'qo' | 'NULL'

export interface MachineState {
  statorA: StatorAMode
  rotorB: string // Simplified for now
  scalarCam: number
  statorC: 'NORMAL' | 'RESET' | 'HEDY'
}

export function compileVoynich(input: string): MachineState {
  const state: MachineState = {
    statorA: 'NULL',
    rotorB: '',
    scalarCam: 0,
    statorC: 'NORMAL',
  }

  if (input.startsWith('qo')) {
    state.statorA = 'qo'
  } else if (input.startsWith('k')) {
    state.statorA = 'k'
  } else if (input.startsWith('t')) {
    state.statorA = 't'
  } else if (input.startsWith('p')) {
    state.statorA = 'p'
  } else if (input.startsWith('f')) {
    state.statorA = 'f'
  }

  // Count e and i for scalar cam
  const scalarChars = input.match(/[ei]/g)
  if (scalarChars) {
    state.scalarCam = scalarChars.length
  }

  if (input.endsWith('aiin')) {
    state.statorC = 'RESET'
  } else if (input.includes('hedy')) {
    state.statorC = 'HEDY'
  }

  // Phonetic atoms from Master Document
  const atoms = [
    'ch', 'sh', 'th', 'ee', 'ii', 'ai', 'oi', 'or', 'ar',
    'o', 'k', 'y', 'l', 'r', 's', 't', 'p', 'f', 'a', 'e', 'i', 'd', 'm', 'n'
  ]

  let remaining = input.replace(/qo|aiin|hedy/g, '')
  const foundAtoms: string[] = []

  while (remaining.length > 0) {
    let match = false
    for (const atom of atoms) {
      if (remaining.startsWith(atom)) {
        foundAtoms.push(atom)
        remaining = remaining.slice(atom.length)
        match = true
        break
      }
    }
    if (!match) {
      // If no atom matches, skip one character
      remaining = remaining.slice(1)
    }
  }

  state.rotorB = foundAtoms.join(',')

  return state
}
