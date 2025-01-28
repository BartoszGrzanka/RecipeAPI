import React, { useContext, useState } from 'react';
import { DataContext } from '@/contexts/APIContext';
import RecipeDetails from './RecipeDetails';

const RecipeList = () => {
  const { recipes, loading, error } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const pageSize = 5;

  if (loading) {
    return <div className="text-center text-lg">Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Paginacja
  const totalPages = Math.ceil(recipes.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentRecipes = recipes.slice(startIndex, startIndex + pageSize);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Nagłówek tylko wtedy, gdy nie ma wybranego przepisu */}
      {!selectedRecipe && (
        <h2 className="text-3xl font-bold text-center mb-4">Recipe List</h2>
      )}

      {/* Jeśli jest wybrany przepis, wyświetlamy szczegóły */}
      {selectedRecipe ? (
        <RecipeDetails recipe={selectedRecipe} onBack={handleBackClick} />
      ) : (
        <>
          {/* Lista przepisów */}
          <ul className="space-y-4">
            {currentRecipes.map((recipe) => (
              <li
                key={recipe.id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleRecipeClick(recipe)}
              >
                <h3 className="text-xl font-semibold">{recipe.name}</h3>
                <p className="text-gray-600">{recipe.description}</p>
                <p className="mt-2 text-sm text-gray-500">{recipe.cookingTime}</p>
                <p className="text-sm text-gray-500">{recipe.category}</p>
              </li>
            ))}
          </ul>

          {/* Paginacja */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeList;
