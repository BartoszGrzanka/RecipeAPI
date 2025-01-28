import React, { useState } from 'react'
import RecipeAddForm from './addForms/recipeAddForm'
import RecipeList from './RecipeList'
import IngredientList from './IngredientList'
import NutritionList from './NutritionList'
import IngredientAddForm from './addForms/ingredientAddForm'
import NutritionAddForm from './addForms/nutritionAddForm'

const RecipePage = () => {
  const [isFormVisible, setFormVisible] = useState(false)
  const [isIngredientFormVisible, setIngredientFormVisible] = useState(false)
  const [isNutritionFormVisible, setNutritionFormVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('recipes') 

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible)
  }

  const toggleIngredientFormVisibility = () => {
    setIngredientFormVisible(!isIngredientFormVisible)
  }

  const toggleNutritionFormVisibility = () => {
    setNutritionFormVisible(!isNutritionFormVisible)
  }

  const changeTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Górne menu / Przyciski */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => changeTab('recipes')}
            className={`px-4 py-2 rounded-md ${activeTab === 'recipes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Recipes
          </button>
          <button
            onClick={() => changeTab('ingredients')}
            className={`px-4 py-2 rounded-md ${activeTab === 'ingredients' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Ingredients
          </button>
          <button
            onClick={() => changeTab('nutrition')}
            className={`px-4 py-2 rounded-md ${activeTab === 'nutrition' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Nutrition
          </button>
        </div>

        {/* Przycisk do pokazywania/ukrywania formularza przepisu */}
        <button
          onClick={toggleFormVisibility}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {isFormVisible ? 'Hide Add Recipe Form' : 'Add New Recipe'}
        </button>

        {/* Przycisk do pokazywania/ukrywania formularza składnika */}
        <button
          onClick={toggleIngredientFormVisibility}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {isIngredientFormVisible ? 'Hide Add Ingredient Form' : 'Add New Ingredient'}
        </button>

        {/* Przycisk do pokazywania/ukrywania formularza wartości odżywczych */}
        <button
          onClick={toggleNutritionFormVisibility}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {isNutritionFormVisible ? 'Hide Add Nutrition Form' : 'Add New Nutrition'}
        </button>
      </div>

      {/* Formularz dodawania przepisu */}
      {isFormVisible && (
        <div className="mb-8">
          <RecipeAddForm />
        </div>
      )}

      {/* Formularz dodawania składnika */}
      {isIngredientFormVisible && (
        <div className="mb-8">
          <IngredientAddForm />
        </div>
      )}

      {/* Formularz dodawania wartości odżywczych */}
      {isNutritionFormVisible && (
        <div className="mb-8">
          <NutritionAddForm />
        </div>
      )}

      {/* Renderowanie odpowiedniego tab-u w zależności od aktywnej zakładki */}
      {activeTab === 'recipes' && <RecipeList />}
      {activeTab === 'ingredients' && <IngredientList />}
      {activeTab === 'nutrition' && <NutritionList />}
    </div>
  )
}

export default RecipePage
