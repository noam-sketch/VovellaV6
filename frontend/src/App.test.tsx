import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders the Syntaxis Volvella V6 heading', () => {
    render(<App />)
    expect(screen.getByText('Syntaxis Volvella V6')).toBeInTheDocument()
  })
})
