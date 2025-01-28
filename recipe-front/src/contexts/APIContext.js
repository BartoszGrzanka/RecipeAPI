"use client"
import React, { createContext, useState, useEffect } from 'react';

// Funkcja pomocnicza do wykonywania zapytań GraphQL
const fetchGraphQL = async (query) => {
  const response = await fetch('http://localhost:8989/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const { data, errors } = await response.json();
  
  if (errors) {
    throw new Error(errors.map((err) => err.message).join(', '));
  }

  return data;
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const recipesQuery = `
        query {
          getAllRecipes {
            _id
            id
            name
            description
            instructions
            cookingTime
            category
            ingredients {
              unit
              quantity
              name
            }
          }
        }
      `;
      
      const ingredientsQuery = `
        query {
          getAllIngredients {
            _id
            id
            name
            quantity
            unit
            nutrition {
              _id
              id
              calories
              protein
              fat
              carbohydrates
            }
          }
        }
      `;
      
      const nutritionQuery = `
        query {
          getAllNutritions {
            _id
            id
            calories
            protein
            fat
            carbohydrates
          }
        }
      `;

      try {
        // Wykonaj zapytania GraphQL
        const [recipesData, ingredientsData, nutritionData] = await Promise.all([
          fetchGraphQL(recipesQuery),
          fetchGraphQL(ingredientsQuery),
          fetchGraphQL(nutritionQuery),
        ]);

        setRecipes(recipesData.getAllRecipes);
        setIngredients(ingredientsData.getAllIngredients);
        setNutrition(nutritionData.getAllNutritions);
      } catch (err) {
        console.error('Error during GraphQL fetch:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ recipes, ingredients, nutrition, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
