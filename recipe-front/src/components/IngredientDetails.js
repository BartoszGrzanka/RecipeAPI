import React from 'react';

const IngredientDetails = ({ ingredient, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">{ingredient.name}</h2>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Quantity:</h3>
        <p className="text-gray-600">{ingredient.quantity} {ingredient.unit}</p>
      </div>

      {/* Dodaj inne szczegóły składnika */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Nutrition Information:</h3>
        <p className="text-gray-600">{ingredient.nutrition.calories}</p>
        <p className="text-gray-600">{ingredient.nutrition.protein}</p>
        <p className="text-gray-600">{ingredient.nutrition.fat}</p>
        <p className="text-gray-600">{ingredient.nutrition.carbohydrates}</p>
      </div>

      {/* Przycisk powrotu */}
      <button
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-md"
        onClick={onBack}
      >
        Back to list
      </button>
    </div>
  );
};

export default IngredientDetails;
