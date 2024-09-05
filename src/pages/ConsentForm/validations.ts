import * as Yup from 'yup'

// Validation schema: name and email are required with correct format, and at least one checkbox must be selected
export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  checkboxes: Yup.array()
    .min(1, 'At least one checkbox should be checked')
    .of(Yup.string().required())
    .required(),
})
