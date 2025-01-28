import React, { useState, useEffect } from 'react'

const RecipeFilter = ({ onFilterChange, recipes }) => {
  const [category, setCategory] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const uniqueCategories = [...new Set(recipes.map((recipe) => recipe.category))]
    setCategories(uniqueCategories)
  }, [recipes])

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setCategory(selectedCategory)
    onFilterChange({ category: selectedCategory, cookingTime })
  }

  const handleCookingTimeChange = (e) => {
    const selectedCookingTime = e.target.value
    setCookingTime(selectedCookingTime)

    let timeFilter = null
    if (selectedCookingTime === 'Under 30 minutes') {
      timeFilter = '<30'
    } else if (selectedCookingTime === '30-60 minutes') {
      timeFilter = '30-60'
    } else if (selectedCookingTime === 'Over 60 minutes') {
      timeFilter = '>60'
    }

    onFilterChange({ category, cookingTime: timeFilter })
  }

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Filter Recipes</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="mt-2 p-2 border rounded-md"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Cooking Time</label>
        <select
          value={cookingTime}
          onChange={handleCookingTimeChange}
          className="mt-2 p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="Under 30 minutes">Under 30 minutes</option>
          <option value="30-60 minutes">30-60 minutes</option>
          <option value="Over 60 minutes">Over 60 minutes</option>
        </select>
      </div>
    </div>
  )
}

export default RecipeFilter
