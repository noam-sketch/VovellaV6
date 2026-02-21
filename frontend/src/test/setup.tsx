import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('../components/MachineVisualization', () => ({
  MachineVisualization: () => <div data-testid="machine-viz-mock">Machine Viz Mock</div>
}))
