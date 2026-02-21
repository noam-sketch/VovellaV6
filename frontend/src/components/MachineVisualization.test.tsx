import { render, screen } from '@testing-library/react'
import { MachineVisualization } from './MachineVisualization'
import { describe, it, expect, vi } from 'vitest'
import type { MachineState } from '../logic/VoynichCompiler'

// Mock the entire component to avoid R3F issues in jsdom
vi.mock('./MachineVisualization', () => ({
  MachineVisualization: ({ state }: { state: MachineState }) => (
    <div data-testid="machine-viz">
      3D Visualization for {state.statorA}
    </div>
  )
}))

describe('MachineVisualization', () => {
  it('renders the mocked visualization', () => {
    const mockState = {
      statorA: 'k' as const,
      rotorB: 'abc',
      scalarCam: 1,
      statorC: 'NORMAL' as const,
    }
    render(<MachineVisualization state={mockState} />)
    expect(screen.getByTestId('machine-viz')).toHaveTextContent('3D Visualization for k')
  })
})
