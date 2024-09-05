import { FormValues } from '../types'

export const defaultFormValues: FormValues = {
  name: '',
  email: '',
  checkboxes: [],
}

export const consentOptions = [
  'Receive newsletter',
  'Be shown targeted ads',
  'Contribute to anonymous visit statistics',
]

export const navItems = [
  {
    title: 'Give consent',
    link: '/give-consent',
  },
  {
    title: 'Collected consents',
    link: '/consents',
  },
]
