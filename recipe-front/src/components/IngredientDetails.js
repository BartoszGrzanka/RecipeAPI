import { useContext, useState } from 'react'
import { DataContext } from '@/contexts/APIContext'
import { handleDelete } from '@/utils/handleDelete'
import IngredientEditForm from './editForms/ingredientEditForm'

const IngredientDetails = ({ ingredient, onBack }) => {
  const { refresh } = useContext(DataContext)
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Jeśli nie edytujemy, wyświetlamy szczegóły składnika */}
      {!isEditing ? (
        <>
          <h2 className="text-3xl font-bold text-center mb-4">{ingredient.name}</h2>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">ID:</h3>
            <p className="text-gray-600">{ingredient.id}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Quantity:</h3>
            <p className="text-gray-600">{ingredient.quantity} {ingredient.unit}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Nutrition Information:</h3>
            <p className="text-gray-600">Calories: {ingredient.nutrition?.calories}</p>
            <p className="text-gray-600">Protein: {ingredient.nutrition?.protein}</p>
            <p className="text-gray-600">Fat: {ingredient.nutrition?.fat}</p>
            <p className="text-gray-600">Carbohydrates: {ingredient.nutrition?.carbohydrates}</p>
          </div>

          {/* Przycisk do usunięcia */}
          <button 
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={async () => await handleDelete("ingredients", ingredient._id, refresh, onBack)}
          >
            DELETE
          </button>

          {/* Przycisk powrotu */}
          <button
            className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={onBack}
          >
            Back to list
          </button>

          {/* Przycisk do edycji */}
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={toggleEdit}
          >
            Edit Ingredient
          </button>
        </>
      ) : (
        // Jeśli edytujemy, wyświetlamy formularz edycji składnika
        <IngredientEditForm ingredient={ingredient} onBack={onBack} />
      )}
    </div>
  )
}

export default IngredientDetails
