import { http, HttpResponse } from 'msw'
import { User } from '../types'
import { mockedUsers } from './mockDefaultUsers'

// Initially render the mockedUsers not to show empty table
const allUsers: User[] = mockedUsers

export const handlers = [
  http.get('/consents', () => {
    return HttpResponse.json(allUsers, { status: 200 })
  }),

  http.post('/consents', async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newUser = await request.json()
    // Push the new user to the allUsers array
    allUsers.push(newUser as User)
    return HttpResponse.json(newUser, { status: 201 })
  }),
]
