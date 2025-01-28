import React, { useContext, useState } from 'react'
import { DataContext } from '@/contexts/APIContext'

const NutritionList = () => {
  const { nutrition, loading, error } = useContext(DataContext)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  if (loading) {
    return <div className="text-center text-lg">Loading nutrition...</div>
  }
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  // Paginacja
  const totalPages = Math.ceil(nutrition.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentNutrition = nutrition.slice(startIndex, startIndex + pageSize)

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Nutrition List</h2>
      
      <ul className="space-y-4">
        {currentNutrition.map((item) => (
          <li key={item.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold">ID: {item.id}</h3>
            <p className="mt-2 text-sm text-gray-600">Calories: {item.calories}</p>
            <p className="mt-1 text-sm text-gray-600">Protein: {item.protein}</p>
            <p className="mt-1 text-sm text-gray-600">Fat: {item.fat}</p>
            <p className="mt-1 text-sm text-gray-600">Carbohydrates: {item.carbohydrates}</p>
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
    </div>
  )
}

export default NutritionList
