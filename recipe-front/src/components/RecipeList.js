import React, { useContext, useState, useMemo } from 'react';
import { DataContext } from '@/contexts/APIContext';
import RecipeDetails from './RecipeDetails';
import RecipeFilter from './RecipeFilter';

const RecipeList = () => {
  const { recipes, loading, error } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filters, setFilters] = useState({ category: '', cookingTime: '' });

  const pageSize = 5;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = filters.category
        ? recipe.category.toLowerCase().includes(filters.category.toLowerCase())
        : true;

      const matchesCookingTime = filters.cookingTime
        ? (() => {
            const cookingTimeNumber = parseInt(recipe.cookingTime.match(/\d+/)?.[0] || '0', 10);

            if (filters.cookingTime.includes('-')) {
              const [min, max] = filters.cookingTime
                .split('-')
                .map((val) => parseInt(val.trim(), 10));
              return cookingTimeNumber >= min && cookingTimeNumber <= max;
            }

            if (filters.cookingTime.startsWith('<')) {
              const max = parseInt(filters.cookingTime.slice(1).trim(), 10);
              return cookingTimeNumber < max;
            }

            if (filters.cookingTime.startsWith('>')) {
              const min = parseInt(filters.cookingTime.slice(1).trim(), 10);
              return cookingTimeNumber > min;
            }

            const filterTimeNumber = parseInt(filters.cookingTime.trim(), 10);
            return cookingTimeNumber === filterTimeNumber;
          })()
        : true;

      return matchesCategory && matchesCookingTime;
    });
  }, [recipes, filters]);

  // Paginacja
  const totalPages = Math.ceil(filteredRecipes.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + pageSize);

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Nagłówek tylko wtedy, gdy nie ma wybranego przepisu */}
      {!selectedRecipe && (
        <h2 className="text-3xl font-bold text-center mb-4">Recipe List</h2>
      )}

      {/* Filtracja tylko jeśli nie ma wybranego przepisu */}
      {!selectedRecipe && <RecipeFilter onFilterChange={handleFilterChange} recipes={recipes} />}

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
