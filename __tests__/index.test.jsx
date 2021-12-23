import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../pages/test'

describe('Home', () => {
  it('renders page', () => {
    render(<App />)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})