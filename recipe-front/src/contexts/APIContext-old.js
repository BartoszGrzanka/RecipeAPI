"use client"
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [nutrition, setNutrition] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [recipesRes, ingredientsRes, nutritionRes] = await Promise.all([
          fetch('http://localhost:8989/api/recipes'),
          fetch('http://localhost:8989/api/ingredients'),
          fetch('http://localhost:8989/api/nutritions'),
        ]);

        console.log('Recipes Response:', recipesRes)
        console.log('Ingredients Response:', ingredientsRes)
        console.log('Nutrition Response:', nutritionRes)

        if (!recipesRes.ok || !ingredientsRes.ok || !nutritionRes.ok) {
          const errMessage = `Failed to fetch: ${recipesRes.status}, ${ingredientsRes.status}, ${nutritionRes.status}`;
          throw new Error(errMessage);
        }

        const recipesData = await recipesRes.json()
        const ingredientsData = await ingredientsRes.json()
        const nutritionData = await nutritionRes.json()

        setRecipes(recipesData)
        setIngredients(ingredientsData)
        setNutrition(nutritionData)
      } catch (err) {
        console.error("Error during fetch:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{ recipes, ingredients, nutrition, loading, error }}>
      {children}
    </DataContext.Provider>
  )
}
