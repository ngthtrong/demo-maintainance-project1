import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the main app structure', () => {
    const { container } = render(<App />)
    // Kiểm tra xem có element với class "app" hay không
    const appElement = container.querySelector('.app')
    expect(appElement).toBeInTheDocument()
  })
  
  it('renders the navbar', () => {
    const { container } = render(<App />)
    // Kiểm tra xem có element với class "main-content" hay không  
    const mainContent = container.querySelector('.main-content')
    expect(mainContent).toBeInTheDocument()
  })
})
