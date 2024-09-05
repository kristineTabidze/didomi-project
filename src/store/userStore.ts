import { create } from 'zustand'
import { User } from '../types'

// Define the state and actions for the store
type UserState = {
  users: User[] // State to store the list of user consents
  addUser: (user: User) => void // Action to add a new user consents to the list
  setUsers: (users: User[]) => void // Action to set multiple users
}

// Create the store using Zustand
export const useUserStore = create<UserState>((set) => ({
  users: [],

  // Action to add a user
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  // Action to set users
  setUsers: (users) => set({ users }),
}))
