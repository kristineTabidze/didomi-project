export interface FormValues {
  name: string
  email: string
  checkboxes: string[]
}

export interface User {
  name: string
  email: string
  checkboxes: string
  [key: string]: string // TODO: But I don't like this
}
