import mongoose from 'mongoose';
import { ingredientSchema, nutritionSchema, recipeSchema } from '../schemas/schemasDB.js';

const Recipe = mongoose.model('Recipe', recipeSchema);
const Ingredient = mongoose.model('Ingredient', ingredientSchema);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);

const resolvers = {
    Query: {
      getRecipe: async (_parent, { _id }) => {
        try {
          const recipe = await Recipe.findById(_id).populate({
            path: 'ingredients', 
            model: 'Ingredient', 
            localField: 'ingredients', 
            foreignField: 'id', 
            populate: [
              { 
                path: 'recipes', 
                model: 'Recipe', 
                localField: 'recipes', 
                foreignField: 'id', 
              },
              { 
                path: 'nutrition', 
                model: 'Nutrition', 
                localField: 'nutrition', 
                foreignField: 'id', 
              }
            ]
          })
  
          if (!recipe) {
            throw new Error('Recipe not found')
          }
  
          return recipe
        } catch (error) {
          console.error(error)
          throw new Error('Failed to fetch recipe')
        }
      },
  
      getNutrition: async (_parent, { _id }) => {
        try {
          const nutrition = await Nutrition.findById({ _id })
          if (!nutrition) {
            throw new Error('Nutrition not found')
          }
          return nutrition
        } catch (error) {
          console.error(error)
          throw new Error('Failed to fetch nutrition')
        }
      },
  
      getIngredient: async (_parent, { _id }) => {
        try {
          const ingredient = await Ingredient.findById({ _id }).populate({
            path: 'recipes',
            model: 'Recipe',
            localField: 'recipes',
            foreignField: 'id',
          })
          .populate({
            path: 'nutrition',
            model: 'Nutrition',
            localField: 'nutrition',
            foreignField: 'id',
          })
  
          if (!ingredient) {
            throw new Error('Ingredient not found')
          }
          
          return ingredient
        } catch (error) {
          console.error(error)
          throw new Error('Failed to fetch ingredient')
        }
      },
  
      getALLNutritions: async () => {
        try {
          const nutritions = await Nutrition.find()
          if (!nutritions || nutritions.length === 0) {
            throw new Error('No nutrition found')
          }
          return nutritions
        } catch (error) {
          console.error(error)
          throw new Error('Failed to fetch all nutritions')
        }
      },
  
      getAllRecipes: async () => {
        try {
          const recipes = await Recipe.find().populate({
            path: 'ingredients',
            model: 'Ingredient',
            localField: 'ingredients',
            foreignField: 'id',
            populate: [
              { 
                path: 'recipes', 
                model: 'Recipe', 
                localField: 'recipes', 
                foreignField: 'id',
              },
              { 
                path: 'nutrition', 
                model: 'Nutrition', 
                localField: 'nutrition', 
                foreignField: 'id',
              }
            ]
          })
  
          if (!recipes || recipes.length === 0) {
            throw new Error('No recipes found')
          }
  
          return recipes
        } catch (error) {
          console.error(error)
          throw new Error('Failed to fetch all recipes')
        }
      },
  
      getAllIngredients: async () => {
        try {
            const ingredients = await Ingredient.find()
            .populate({
              path: 'recipes',
              model: 'Recipe',
              localField: 'recipes',
              foreignField: 'id',
            })
            .populate({
              path: 'nutrition',
              model: 'Nutrition',
              localField: 'nutrition',
              foreignField: 'id',
            })
  
          if (!ingredients || ingredients.length === 0) {
            throw new Error('No ingredients found')
          }
  
          return ingredients
        } catch (error) {
          console.error(error)
          throw new Error('Failed to fetch all ingredients')
        }
      }
    }
  }
  


export default resolvers;
