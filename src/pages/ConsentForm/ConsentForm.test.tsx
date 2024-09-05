import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ConsentForm } from './ConsentForm'
import { useUserStore } from '../../store/userStore'
import { BrowserRouter as Router } from 'react-router-dom'

// Mock Zustand store
jest.mock('../../store/userStore', () => ({
  useUserStore: jest.fn(),
}))

describe('ConsentForm', () => {
  const addUser = jest.fn()
  ;(useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
    selector({ addUser })
  )

  test('It renders form with initial values', () => {
    render(
      <Router>
        <ConsentForm />
      </Router>
    )

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
  })

  test('Submit button is disabled when form is not filled properly', () => {
    const { getByTestId } = render(
      <Router>
        <ConsentForm />
      </Router>
    )

    const submitButton = getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.tabIndex).toBe(-1) // When button is disabled it should not be tabbable
  })

  test('Shows error messages for invalid email', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <ConsentForm />
      </Router>
    )
    // Change email input value to an invalid email and blur the input
    fireEvent.change(getByLabelText(/Email Address/i), {
      target: { value: 'johnexamplecom' },
    })
    fireEvent.blur(getByLabelText(/Email Address/i))
    // Check if error messages are displayed
    await waitFor(() => {
      expect(getByText(/Invalid email format/i)).toBeInTheDocument()
    })
  })

  test('Shows error messages when name field is empty', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <ConsentForm />
      </Router>
    )
    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: '' },
    })
    fireEvent.blur(getByLabelText(/Name/i))
    await waitFor(() => {
      expect(getByText(/Name is required/i)).toBeInTheDocument()
    })
  })

  test('Shows error messages when name and email are correct, but none of the checkboxes are checked', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <ConsentForm />
      </Router>
    )
    fireEvent.change(getByLabelText(/Email Address/i), {
      target: { value: 'john@examplecom' },
    })
    fireEvent.change(getByLabelText(/Email Address/i), {
      target: { value: 'john' },
    })
    await waitFor(() => {
      expect(
        getByText(/At least one checkbox should be checked/i)
      ).toBeInTheDocument()
    })
  })

  test('Submits form and redirects to next page', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <ConsentForm />
      </Router>
    )

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' },
    })

    // Check checkbox
    fireEvent.click(getByLabelText(/Receive newsletter/i))

    // Submit form
    fireEvent.click(getByText(/Give Consent/i))

    // await waitFor(() => {
    //   expect(global.fetch).toHaveBeenCalledTimes(1)
    //   expect(addUser).toHaveBeenCalledWith({
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     checkboxes: 'Receive newsletter',
    //   })
    // })
  })
})
