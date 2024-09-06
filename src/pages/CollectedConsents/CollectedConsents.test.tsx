import { render, waitFor, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import CollectedConsents from './CollectedConsents'
import { useUserStore } from '../../store/userStore'
import { server } from '../../mocks/server'
import { http, HttpResponse } from 'msw'
import { mockedUsers } from '../../mocks/mockDefaultUsers'

// spy on useUserStore.setUsers and use real store implementation
const setUsersSpy = vi.spyOn(useUserStore.getState(), 'setUsers')

const renderCollectedConsents = () => render(<CollectedConsents />)

describe('CollectedConsents Table', () => {
  beforeEach(() => {
    vi.clearAllMocks() // Clear previous mock calls
  })

  test('It should display the table with users when data is fetched', async () => {
    const { getByText } = renderCollectedConsents()

    // Mock get request to /consents
    server.use(
      http.get('/consents', async ({ request }) => {
        expect(await request.json()).toEqual(mockedUsers)
        return HttpResponse.json(mockedUsers, { status: 201 })
      })
    )

    await waitFor(() => {
      // Check if Zustand store is updated with fetched users
      expect(setUsersSpy).toHaveBeenCalledWith(mockedUsers)
    })

    // Check the table is filled with correct values
    expect(getByText('User 1')).toBeInTheDocument()
    expect(getByText('user@1example.com')).toBeInTheDocument()
  })
})

describe('CollectedConsents Table Pagination', () => {
  test('It should render users based on current page', async () => {
    const { getByText, getByTestId } = renderCollectedConsents()
    // User is on the first page and we click on next page
    const nextPageButton = getByTestId('KeyboardArrowRightIcon')
    fireEvent.click(nextPageButton)

    await waitFor(() => {
      expect(getByText('User 3')).toBeInTheDocument() // Check if the new page's content is rendered
      expect(nextPageButton.tabIndex).toBe(-1) // Next button should be disabled because we don't have any data
    })

    const previousPageButton = getByTestId('KeyboardArrowLeftIcon')
    fireEvent.click(previousPageButton)
    await waitFor(() => {
      expect(getByText('User 1')).toBeInTheDocument()
      expect(previousPageButton.tabIndex).toBe(-1) // Previous button should be disabled because we are in the first page
    })
  })
})
