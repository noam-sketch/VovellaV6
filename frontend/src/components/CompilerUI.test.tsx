import { render, screen, fireEvent } from '@testing-library/react'
import { CompilerUI } from './CompilerUI'
import { describe, it, expect } from 'vitest'

describe('CompilerUI', () => {
  it('updates machine state display when input changes', () => {
    render(<CompilerUI />)
    const input = screen.getByPlaceholderText('Enter Voynich text...')
    
    fireEvent.change(input, { target: { value: 'kaiin' } })
    
    expect(screen.getByTestId('stator-a')).toHaveTextContent('k')
    expect(screen.getByTestId('stator-c')).toHaveTextContent('RESET')
  })
})
