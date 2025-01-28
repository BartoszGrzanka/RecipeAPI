import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DataContext } from '@/contexts/APIContext'

const RecipeAddForm = () => {
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
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters long'),
    ingredients: Yup.array()
      .of(Yup.number().positive('Ingredient ID must be a positive number'))
      .min(1, 'Ingredients are required')
      .required('Ingredients must be a non-empty array'),
    instructions: Yup.array()
      .of(Yup.string().min(5, 'Each instruction must have at least 5 characters'))
      .min(1, 'Instructions are required')
      .required('Instructions cannot be empty'),
    cookingTime: Yup.string()
      .required('Cooking time is required')
      .matches(/^\d+ minutes$/, 'Cooking time must be in the format "X minutes"'),
    category: Yup.string()
      .oneOf(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'], 'Invalid category')
      .required('Category is required')
  })

  const handleSubmit = async (values) => {
    const updatedIngredients = values.ingredients
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id) && id > 0)
  
    try {
      const response = await fetch(`http://localhost:8989/api/recipes/${recipe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, ingredients: updatedIngredients }),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.error) {
          alert('An error occurred: ' + errorData.error)
        } else {
          alert('Unknown error occurred.')
        }
      } else {
        alert('Recipe updated successfully')
        refresh()
        onBack()
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while updating the recipe.')
    }
  }
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Add New Recipe</h2>
      <Formik
        initialValues={{
          id: '',
          name: '',
          description: '',
          ingredients: [],
          instructions: [''],
          cookingTime: '',
          category: ''
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

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-lg font-semibold mb-2">
                Description
              </label>
              <Field
                id="description"
                name="description"
                as="textarea"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Ingredients */}
            <div className="mb-4">
              <label htmlFor="ingredients" className="block text-lg font-semibold mb-2">
                Ingredients (IDs)
              </label>
              <Field
                id="ingredients"
                name="ingredients"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter ingredient IDs separated by commas"
                onChange={(e) => {
                  const value = e.target.value.split(',').map(item => item.trim())
                  setFieldValue('ingredients', value)
                }}
              />
              <ErrorMessage name="ingredients" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Instructions */}
            <div className="mb-4">
              <label htmlFor="instructions" className="block text-lg font-semibold mb-2">
                Instructions
              </label>
              <Field
                id="instructions"
                name="instructions"
                as="textarea"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter instructions, each in a new line"
                onChange={(e) => {
                  const value = e.target.value.split('\n')
                  setFieldValue('instructions', value)
                }}
                value={values.instructions.join('\n')}
              />
              <ErrorMessage name="instructions" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Cooking Time */}
            <div className="mb-4">
              <label htmlFor="cookingTime" className="block text-lg font-semibold mb-2">
                Cooking Time
              </label>
              <Field
                id="cookingTime"
                name="cookingTime"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 45 minutes"
              />
              <ErrorMessage name="cookingTime" component="div" className="text-red-500 mt-1" />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-lg font-semibold mb-2">
                Category
              </label>
              <Field
                id="category"
                name="category"
                as="select"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 mt-1" />
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

export default RecipeAddForm
