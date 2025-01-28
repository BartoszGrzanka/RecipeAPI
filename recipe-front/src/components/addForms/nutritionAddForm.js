import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DataContext } from '@/contexts/APIContext'

const NutritionAddForm = () => {
  const { refresh } = useContext(DataContext)
  const validationSchema = Yup.object({
    id: Yup.number()
      .required('ID is required')
      .positive('ID must be a positive number')
      .min(1, 'ID must be a positive number'),
    calories: Yup.string()
      .required('Calories value is required')
      .matches(/^\d+\s?kcal$/, 'Calories must be a number followed by "kcal"'),
    protein: Yup.string()
      .required('Protein value is required')
      .matches(/^\d+(\.\d+)?\s?g$/, 'Protein must be a number followed by "g"'),
    fat: Yup.string()
      .required('Fat value is required')
      .matches(/^\d+(\.\d+)?\s?g$/, 'Fat must be a number followed by "g"'),
    carbohydrates: Yup.string()
      .required('Carbohydrates value is required')
      .matches(/^\d+(\.\d+)?\s?g$/, 'Carbohydrates must be a number followed by "g"'),
  })


  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:8989/api/nutritions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
  
      if (response.ok) {
        const text = await response.text()
        const data = JSON.parse(text)
        alert('Recipe added successfully!')
        console.log(data)
  
        refresh()
      } else {
        const text = await response.text()
        const errorData = JSON.parse(text)
  
        if (errorData.error) {
          alert('An error occurred: ' + errorData.error)
        } else {
          alert('Unknown error occurred.')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while adding the recipe.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Add New Nutrition</h2>
      <Formik
        initialValues={{
          id: '',
          calories: '',
          protein: '',
          fat: '',
          carbohydrates: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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

            {/* Calories */}
            <div className="mb-4">
              <label htmlFor="calories" className="block text-lg font-semibold mb-2">
                Calories (e.g., 250 kcal)
              </label>
              <Field
                id="calories"
                name="calories"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="calories" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Protein */}
            <div className="mb-4">
              <label htmlFor="protein" className="block text-lg font-semibold mb-2">
                Protein (e.g., 15 g)
              </label>
              <Field
                id="protein"
                name="protein"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="protein" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Fat */}
            <div className="mb-4">
              <label htmlFor="fat" className="block text-lg font-semibold mb-2">
                Fat (e.g., 5 g)
              </label>
              <Field
                id="fat"
                name="fat"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="fat" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Carbohydrates */}
            <div className="mb-4">
              <label htmlFor="carbohydrates" className="block text-lg font-semibold mb-2">
                Carbohydrates (e.g., 20 g)
              </label>
              <Field
                id="carbohydrates"
                name="carbohydrates"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="carbohydrates" component="div" className="text-red-500 mt-1" />
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

export default NutritionAddForm
