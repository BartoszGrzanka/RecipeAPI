import React from 'react'

const RecipeDetails = ({ recipe, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">{recipe.name}</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Description:</h3>
        <p className="text-gray-600">{recipe.description}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Cooking Time:</h3>
        <p className="text-gray-600">{recipe.cookingTime}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Category:</h3>
        <p className="text-gray-600">{recipe.category}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Ingredients:</h3>
        <ul className="list-disc pl-5">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient.name}: {ingredient.quantity} {ingredient.unit}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Instructions:</h3>
        <ul className="list-decimal pl-5">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="text-gray-600">{instruction}</li>
          ))}
        </ul>
      </div>

      {/* Przycisk do powrotu */}
      <button
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-md"
        onClick={onBack}
      >
        Back to list
      </button>
    </div>
  )
}

export default RecipeDetails
