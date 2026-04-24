import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('should render spinner variant by default', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveAttribute('aria-label', 'Loading...')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('w-5', 'h-5')

    rerender(<LoadingSpinner size="lg" />)
    spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('w-8', 'h-8')
  })

  it('should apply custom className', () => {
    render(<LoadingSpinner className="custom-class" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('custom-class')
  })

  it('should apply custom color', () => {
    render(<LoadingSpinner color="text-blue-600" />)
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('text-blue-600')
  })

  it('should have screen reader text', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading...')).toHaveClass('sr-only')
  })
})
