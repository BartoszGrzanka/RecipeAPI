import React, { useState } from 'react'
import RecipeList from './RecipeList'
import IngredientList from './IngredientList'
import NutritionList from './NutritionList'

const Menu = () => {
  const [activeSection, setActiveSection] = useState('recipes')

  const handleMenuClick = (section) => {
    setActiveSection(section)
  }

  return (
    <div>
      {/* Menu */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleMenuClick('recipes')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Recipes
        </button>
        <button
          onClick={() => handleMenuClick('ingredients')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Ingredients
        </button>
        <button
          onClick={() => handleMenuClick('nutrition')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Nutrition
        </button>
      </div>

      {/* Listy */}
      {activeSection === 'recipes' && <RecipeList />}
      {activeSection === 'ingredients' && <IngredientList />}
      {activeSection === 'nutrition' && <NutritionList />}
    </div>
  )
}

export default Menu
