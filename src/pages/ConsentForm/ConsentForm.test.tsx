import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ConsentForm } from './ConsentForm'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'
import { useUserStore } from '../../store/userStore'
import { server } from '../../mocks/server'
import { http, HttpResponse } from 'msw'

// spy on useUserStore.addUser and use real store implementation
const addUserSpy = vi.spyOn(useUserStore.getState(), 'addUser')

const renderConsentForm = () =>
  render(
    <Router>
      <ConsentForm />
    </Router>
  )

const utils = {
  fillEmail: (email: string) => {
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: email },
    })
  },
  fillName: (name: string) => {
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: name },
    })
  },
}

const mockedUser = {
  name: 'User',
  email: 'user@example.com',
  checkboxes: 'Receive newsletter',
}

describe('ConsentForm', () => {
  test('It renders form with initial values', () => {
    const { getByLabelText } = renderConsentForm()
    expect(getByLabelText(/Name/i)).toBeInTheDocument()
    expect(getByLabelText(/Email Address/i)).toBeInTheDocument()
  })

  test('Submit button is disabled when form is not filled properly', () => {
    const { getByTestId } = renderConsentForm()
    const submitButton = getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.tabIndex).toBe(-1) // When button is disabled it should not be tabbable
  })

  test('Shows error messages for invalid email', async () => {
    const { getByLabelText, getByText } = renderConsentForm()
    utils.fillEmail('user.com')
    fireEvent.blur(getByLabelText(/Email Address/i))
    // Check if error messages are displayed
    await waitFor(() => {
      expect(getByText(/Invalid email format/i)).toBeInTheDocument()
    })
  })

  test('Shows error messages when name field is empty', async () => {
    const { getByLabelText, getByText } = renderConsentForm()
    utils.fillName('')
    fireEvent.blur(getByLabelText(/Name/i))

    await waitFor(() => {
      expect(getByText(/Name is required/i)).toBeInTheDocument()
    })
  })

  test('Shows error messages when name and email are correct, but none of the checkboxes are checked', async () => {
    const { getByText } = renderConsentForm()
    utils.fillEmail(mockedUser.email)
    utils.fillName(mockedUser.name)

    await waitFor(() => {
      expect(
        getByText(/At least one checkbox should be checked/i)
      ).toBeInTheDocument()
    })
  })

  test('Submits form and redirects to next page', async () => {
    const { getByLabelText, getByText } = renderConsentForm()
    utils.fillEmail(mockedUser.email)
    utils.fillName(mockedUser.name)

    // Check checkbox
    fireEvent.click(getByLabelText(/receive newsletter/i))

    // Mock post request to /consents
    server.use(
      http.post('/consents', async ({ request }) => {
        expect(await request.json()).toEqual(mockedUser)
        return HttpResponse.json(mockedUser, { status: 201 })
      })
    )

    // Submit form
    fireEvent.click(getByText(/give consent/i))
    // Check if zustand addUser is called with the correct user
    await waitFor(() => {
      expect(addUserSpy).toHaveBeenCalledWith(mockedUser)
    })

    // Check if we are redirected to the correct page
    expect(window.location.pathname).toBe('/consents')
  })
})
