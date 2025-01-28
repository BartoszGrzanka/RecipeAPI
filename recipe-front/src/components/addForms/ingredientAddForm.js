import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DataContext } from '@/contexts/APIContext'

const IngredientAddForm = () => {
  const { refresh } = useContext(DataContext)

  const validationSchema = Yup.object({
    id: Yup.number()
      .required('ID is required')
      .positive('ID must be a positive number')
      .min(1, 'ID must be a positive number'),
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters long')
      .max(100, 'Name must be less than 100 characters long'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be greater than or equal to 1')
      .max(10000, 'Quantity cannot be more than 10000'),
    unit: Yup.string()
      .required('Unit is required')
      .oneOf(['grams', 'ml', 'pieces', 'cups'], 'Invalid unit. Valid units are: grams, ml, pieces, cups'),
    nutrition: Yup.number()
      .required('Nutrition value is required (id from nutrients)')
      .positive('Nutrition value must be positive'),
  })

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:8989/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
  
      const text = await response.text()
      console.log(text)
  
      if (response.ok) {
        const data = JSON.parse(text)
        alert('Ingredient added successfully!')
        console.log(data)
        refresh()
      } else {
        const errorData = JSON.parse(text)
  
        if (errorData.error) {
            alert('An error occurred: ' + errorData.error)
        } else {
          alert('Unknown error occurred.')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while adding the ingredient.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Add New Ingredient</h2>
      <Formik
        initialValues={{
          id: '',
          name: '',
          quantity: '',
          unit: '',
          nutrition: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            {/* ID */}
            <div className="mb-4">
              <label htmlFor="id" className="block text-lg font-semibold mb-2">
                ID
              </label>
              <Field
                id="id"
                name="id"
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="id" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold mb-2">
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-lg font-semibold mb-2">
                Quantity
              </label>
              <Field
                id="quantity"
                name="quantity"
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Unit */}
            <div className="mb-4">
              <label htmlFor="unit" className="block text-lg font-semibold mb-2">
                Unit
              </label>
              <Field
                id="unit"
                name="unit"
                as="select"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select unit</option>
                <option value="grams">grams</option>
                <option value="ml">ml</option>
                <option value="pieces">pieces</option>
                <option value="cups">cups</option>
              </Field>
              <ErrorMessage name="unit" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Nutrition */}
            <div className="mb-4">
              <label htmlFor="nutrition" className="block text-lg font-semibold mb-2">
                Nutrition Value
              </label>
              <Field
                id="nutrition"
                name="nutrition"
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="nutrition" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default IngredientAddForm
