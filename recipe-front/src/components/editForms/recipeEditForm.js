import React, { useContext, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DataContext } from '@/contexts/APIContext'

const recipeSchema = Yup.object().shape({
  id: Yup.number()
    .required('ID is required')
    .positive('ID must be a positive number')
    .integer('ID must be an integer')
    .min(1, 'ID must be greater than or equal to 1'),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  ingredients: Yup.string()
    .required('Ingredients are required')
    .test('valid-ingredients', 'Ingredients must be a comma separated list of IDs', (value) => {
      return value.split(',').every((id) => !isNaN(id.trim()) && parseInt(id.trim(), 10) > 0)
    }),
  instructions: Yup.array()
    .of(Yup.string().min(5, 'Instruction must be at least 5 characters'))
    .required('Instructions are required')
    .min(1, 'Instructions must contain at least one step'),
  cookingTime: Yup.string()
    .required('Cooking time is required')
    .matches(/^\d+ minutes$/, 'Cooking time must be in the format "X minutes"'),
  category: Yup.string()
    .required('Category is required')
    .oneOf(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'], 'Invalid category'),
})

const RecipeEditForm = ({ recipe, onBack }) => {
  const { refresh } = useContext(DataContext)

  const handleSubmit = async (values) => {
    const updatedIngredients = values.ingredients
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id) && id > 0)

    const response = await fetch(`http://localhost:8989/api/recipes/${recipe._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, ingredients: updatedIngredients }),
    })

    if (response.ok) {
      alert('Recipe updated successfully')
      refresh()
      onBack() 
    } else {
      alert('Failed to update recipe')
    }
  }

  // Funkcja do tworzenia stringu z ID składników
  const ingredientIdsString = recipe.ingredients.map((ingredient) => ingredient.id).join(', ')

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formik
        initialValues={{
          ...recipe,
          ingredients: ingredientIdsString, // Przekazujemy tylko ID składników w formie stringu
        }}
        validationSchema={recipeSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-6">
            {/* ID */}
            <div>
              <label htmlFor="id" className="block text-lg font-semibold">ID</label>
              <Field
                id="id"
                name="id"
                type="number"
                disabled
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <ErrorMessage name="id" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-semibold">Name</label>
              <Field
                id="name"
                name="name"
                type="text"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-lg font-semibold">Description</label>
              <Field
                id="description"
                name="description"
                as="textarea"
                rows="4"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Cooking Time */}
            <div>
              <label htmlFor="cookingTime" className="block text-lg font-semibold">Cooking Time</label>
              <Field
                id="cookingTime"
                name="cookingTime"
                type="text"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="cookingTime" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Ingredients (IDs) */}
            <div>
              <label htmlFor="ingredients" className="block text-lg font-semibold">Ingredients (IDs)</label>
              <Field
                id="ingredients"
                name="ingredients"
                type="text"
                placeholder="Enter ingredient IDs, separated by commas"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="ingredients" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Instructions */}
            <div>
              <label htmlFor="instructions" className="block text-lg font-semibold">Instructions</label>
              <Field
                id="instructions"
                name="instructions"
                as="textarea"
                rows="4"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="instructions" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-lg font-semibold">Category</label>
              <Field
                id="category"
                name="category"
                as="select"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              >
                Save Recipe
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={onBack}
          className="w-full py-3 bg-gray-500 text-white rounded-md focus:ring-2 focus:ring-gray-500"
        >
          Back to list
        </button>
      </div>
    </div>
  )
}

export default RecipeEditForm
