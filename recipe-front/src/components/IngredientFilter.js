import React, { useState } from 'react'

const IngredientFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    onFilterChange(value)
  }

  return (
    <div className="mb-6">
      <label htmlFor="ingredientSearch" className="block text-lg font-semibold mb-2">
        Search by Name
      </label>
      <input
        id="ingredientSearch"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search ingredient..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  )
}

export default IngredientFilter
