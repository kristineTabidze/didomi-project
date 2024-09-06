import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldArray,
} from 'formik'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  FormHelperText,
} from '@mui/material'
import { validationSchema } from './validations'
import { FormValues } from '../../types'
import { consentOptions, defaultFormValues } from '../../fixtures'
import { useUserStore } from '../../store/userStore'

export const ConsentForm: React.FC = () => {
  const navigate = useNavigate()
  const addUser = useUserStore((state) => state.addUser)
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        checkboxes: values.checkboxes.join(', '),
      }

      // Send form values to the mock server via POST request
      const response = await fetch('/consents', {
        // INFO: In the future we can use lodash debounce to prevent multiple requests
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const newUser = await response.json()
        addUser(newUser) // Add user to Zustand state
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false) // Set submitting to false once the submit action is completed
      navigate('/consents') // Redirect to consents table page
    }
  }

  return (
    <div className="py-8 px-4 max-w-full sm:max-w-xl lg:max-w-3xl xl:max-w-5xl mx-auto text-center">
      <Formik
        initialValues={defaultFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          handleBlur,
          touched,
          errors,
          isValid,
          dirty,
          isSubmitting,
        }) => (
          <Form>
            <div className="flex flex-col sm:flex-row justify-around gap-6">
              <FormGroup className="flex-1">
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.name && Boolean(errors.name)}
                  helperText={<ErrorMessage name="name" />}
                />
              </FormGroup>

              <FormGroup className="flex-1">
                <Field
                  as={TextField}
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.email && Boolean(errors.email)}
                  helperText={<ErrorMessage name="email" />}
                />
              </FormGroup>
            </div>

            <h2 className="mt-6 text-lg font-semibold">I agree to:</h2>

            <FieldArray
              name="checkboxes_wrapper"
              render={() => (
                <ul className="my-4 mx-auto text-left border border-gray-300 p-4 rounded">
                  {consentOptions.map((checkboxLabel) => {
                    const isChecked = values.checkboxes.includes(checkboxLabel)

                    return (
                      <li key={checkboxLabel} className="my-2">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={() =>
                                setFieldValue(
                                  'checkboxes',
                                  isChecked
                                    ? values.checkboxes.filter(
                                        // Remove checkbox label if it's already in the array
                                        (label) => label !== checkboxLabel
                                      )
                                    : [...values.checkboxes, checkboxLabel] // Otherwise add checkbox label
                                )
                              }
                              onBlur={handleBlur}
                              name={`checkboxes.${checkboxLabel}`}
                            />
                          }
                          label={checkboxLabel}
                        />
                      </li>
                    )
                  })}

                  {errors.checkboxes && (
                    <FormHelperText error>{errors.checkboxes}</FormHelperText>
                  )}
                </ul>
              )}
            />

            <Button
              disabled={!(isValid && dirty) || isSubmitting} // Disable button based on form state
              type="submit"
              variant="contained"
              color="primary"
              className="mt-6"
              data-testid="submit-button"
            >
              Give Consent
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
