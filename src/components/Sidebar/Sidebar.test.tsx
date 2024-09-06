import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { navItems } from '../../fixtures'

describe('Sidebar Component', () => {
  test('Should render all navigation items correctly with correct links', () => {
    const { getAllByTestId } = render(
      <Router>
        <Sidebar />
      </Router>
    )

    // Check if all navigation items are rendered
    navItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
      expect(screen.getByText(item.title).closest('a')).toHaveAttribute(
        'href',
        item.link
      )
    })
    fireEvent.click(getAllByTestId('navlink')[1])
  })

  test('Should navigate to the correct route when a nav link is clicked', () => {
    const { getAllByTestId } = render(
      <Router>
        <Sidebar />
      </Router>
    )
    // Check when we click on the collected consent button, if the button becomes active and the route is correct
    const collectedConsentsButton = getAllByTestId('navlink')[1]
    fireEvent.click(collectedConsentsButton)
    expect(window.location.pathname).toBe('/consents')
    expect(collectedConsentsButton).toHaveClass('bg-blue-300')

    // Check when we click on the give consent button, if the button becomes active and the route is correct
    const giveConsentsButton = getAllByTestId('navlink')[0]
    fireEvent.click(giveConsentsButton)
    expect(window.location.pathname).toBe('/give-consent')
    expect(giveConsentsButton).toHaveClass('bg-blue-300')
  })
})
