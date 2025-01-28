import React, { useContext, useState, useMemo } from 'react'
import { DataContext } from '@/contexts/APIContext'
import IngredientDetails from './IngredientDetails'
import IngredientFilter from './IngredientFilter'

const IngredientList = () => {
  const { ingredients, loading, error } = useContext(DataContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const pageSize = 5
  //Fitracja
  const filteredIngredients = useMemo(() => {
    return ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [ingredients, searchTerm])

  if (loading) {
    return <div className="text-center text-lg">Loading ingredients...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  // Paginacja
  const totalPages = Math.ceil(filteredIngredients.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentIngredients = filteredIngredients.slice(startIndex, startIndex + pageSize)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient)
  }

  const handleBackClick = () => {
    setSelectedIngredient(null)
  }

  const handleFilterChange = (value) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Wyświetl nagłówek tylko, jeśli żaden składnik nie jest wybrany */}
      {!selectedIngredient && (
        <h2 className="text-3xl font-bold text-center mb-4">Ingredient List</h2>
      )}

      {/* Komponent filtra */}
      <IngredientFilter onFilterChange={handleFilterChange} />

      {/* Jeśli jest wybrany składnik, wyświetlamy szczegóły */}
      {selectedIngredient ? (
        <IngredientDetails ingredient={selectedIngredient} onBack={handleBackClick} />
      ) : (
        <>
          {/* Lista składników */}
          <ul className="space-y-4">
            {currentIngredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleIngredientClick(ingredient)}
              >
                <h3 className="text-xl font-semibold">{ingredient.name}</h3>
                <p className="mt-2 text-sm text-gray-600">Quantity: {ingredient.quantity} {ingredient.unit}</p>
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
  )
}

export default IngredientList
