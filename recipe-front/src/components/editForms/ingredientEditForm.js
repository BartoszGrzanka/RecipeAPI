import React, { useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DataContext } from '@/contexts/APIContext'

const ingredientSchema = Yup.object().shape({
  id: Yup.number()
    .required('ID is required')
    .positive('ID must be a positive number')
    .integer('ID must be an integer')
    .min(1, 'ID must be greater than or equal to 1'),
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be a positive number'),
  unit: Yup.string().required('Unit is required'),
  nutrition: Yup.number()
    .required('Nutrition ID is required')
    .positive('Nutrition ID must be a positive number')
    .integer('Nutrition ID must be an integer')
    .min(1, 'Nutrition ID must be greater than or equal to 1'),
  recipes: Yup.string()
    .required('Recipes are required')
    .test('valid-recipes', 'Recipes must be a comma separated list of IDs', (value) => {
      return value.split(',').every((id) => !isNaN(id.trim()) && parseInt(id.trim(), 10) > 0)
    }),
})

const IngredientEditForm = ({ ingredient, onBack }) => {
  const { refresh } = useContext(DataContext)

  const handleSubmit = async (values) => {
    // Przekształcenie `recipes` do tablicy liczb
    const updatedRecipes = values.recipes
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id) && id > 0)

    // Przekształcenie `nutrition` do liczby
    const updatedNutrition = parseInt(values.nutrition.trim(), 10)

    // Przygotowanie danych do wysłania w odpowiednim formacie
    const updatedValues = {
      id: Number(values.id), // Upewniamy się, że id to liczba
      recipes: updatedRecipes, // Tablica liczb dla przepisów
      name: values.name, // String dla nazwy
      quantity: Number(values.quantity), // Upewniamy się, że quantity to liczba
      unit: values.unit, // String dla jednostki
      nutrition: updatedNutrition, // Pojedyncze ID dla nutrition
    }

    try {
        const response = await fetch(`http://localhost:8989/api/ingredients/${ingredient._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedValues),
        });
      
        if (response.ok) {
          alert('Ingredient updated successfully');
          refresh();
          onBack();
        } else {
          const errorResponse = await response.text(); // Pobierz odpowiedź błędu
          alert('Failed to update ingredient: ' + errorResponse);
          console.error('Error response:', errorResponse); // Zaloguj odpowiedź błędu
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the ingredient.');
      }
  }

  // Wartość ID nutrition traktujemy jako pojedyncze ID
  const nutritionId = ingredient.nutrition ? ingredient.nutrition.id : ''

  // Funkcja do tworzenia stringu z ID przepisów
  const recipeIdsString = ingredient.recipes.map((recipe) => recipe.id).join(', ')

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Formik
        initialValues={{
          ...ingredient,
          recipes: recipeIdsString,
          nutrition: nutritionId, // Tylko ID składników odżywczych jako pojedyncza wartość
        }}
        validationSchema={ingredientSchema}
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

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-lg font-semibold">Quantity</label>
              <Field
                id="quantity"
                name="quantity"
                type="number"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Unit */}
            <div>
              <label htmlFor="unit" className="block text-lg font-semibold">Unit</label>
              <Field
                id="unit"
                name="unit"
                type="text"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="unit" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Nutrition (ID) */}
            <div>
              <label htmlFor="nutrition" className="block text-lg font-semibold">Nutrition ID</label>
              <Field
                id="nutrition"
                name="nutrition"
                type="number"
                placeholder="Enter nutrition ID"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="nutrition" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Recipes (IDs) */}
            <div>
              <label htmlFor="recipes" className="block text-lg font-semibold">Recipes (IDs)</label>
              <Field
                id="recipes"
                name="recipes"
                type="text"
                placeholder="Enter recipe IDs, separated by commas"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="recipes" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md focus:ring-2 focus:ring-blue-500"
              >
                Save Ingredient
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

export default IngredientEditForm
