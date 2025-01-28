import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { ingredientSchema, nutritionSchema, recipeSchema } from '../schemas/schemasDB.js'

const Recipe = mongoose.model('Recipe', recipeSchema)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)
const Nutrition = mongoose.model('Nutrition', nutritionSchema)

const ingredientExists = async (ingredientId) => {
  const ingredient = await Ingredient.findOne({ id: ingredientId });
  return ingredient !== null;
}

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

      getAllNutritions: async (_, { page = 1, limit = 0 }) => {
        try {
          // Paginacja
          let skip=0
            if(limit <= 0){
              limit =await Nutrition.countDocuments()
            }else{
              skip = (page - 1) * limit
            }
      
          // Pobieranie danych z bazy z paginacją
          const nutritions = await Nutrition.find()
            .skip(skip)
            .limit(limit);
      
          if (!nutritions || nutritions.length === 0) {
            return { message: 'No nutritions found', data: [] };
          }
      
          return nutritions;
        } catch (error) {
          console.error(error);
          return { message: 'Failed to fetch all nutritions', data: [] };
        }
      },
      

      getAllRecipes: async (_, { page = 1, limit = 0, filter = {} }) => {
        try {
            const filterQuery = {}
    
            if (filter.name) {
              const { operator, value } = filter.name
              if (operator === 'CONTAINS') {
                  filterQuery.name = { $regex: value, $options: 'i' }
              } else if (operator === 'EQUALS') {
                  filterQuery.name = value
              }
          }
  
          if (filter.category) {
              filterQuery.category = filter.category
          }
  
          if (filter.description) {
              const { operator, value } = filter.description
              if (operator === 'CONTAINS') {
                  filterQuery.description = { $regex: value, $options: 'i' }
              } else if (operator === 'EQUALS') {
                  filterQuery.description = value
              }
          }
            let skip=0
            if(limit <= 0){
              limit =await Recipe.countDocuments()
            }else{
              skip = (page - 1) * limit
            }

            //const skip = (page - 1) * limit
            const recipes = await Recipe.find(filterQuery)
                .skip(skip)
                .limit(limit)
                .populate({
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
    getAllIngredients: async (_, { page = 1, limit = 0, filter = {} }) => {
      try {
        const filterQuery = {}
    
        if (filter.name) {
          const { operator, value } = filter.name
          if (operator === 'EQUALS') {
            filterQuery.name = value
          } else if (operator === 'CONTAINS') {
            filterQuery.name = { $regex: value, $options: 'i' }
          } else if (operator === 'NOT_EQUALS') {
            filterQuery.name = { $ne: value }
          } else if (operator === 'NOT_CONTAINS') {
            filterQuery.name = { $not: { $regex: value, $options: 'i' } }
          }
        }
        
    
        if (filter.quantity) {
          const { operator, value } = filter.quantity
          if (value && typeof value === 'number') {
            const valueInFloat = value
            if (operator === 'GREATER_THAN') {
              filterQuery.quantity = { $gt: valueInFloat }
            } else if (operator === 'LESS_THAN') {
              filterQuery.quantity = { $lt: valueInFloat }
            } else if (operator === 'GREATER_THAN_OR_EQUAL') {
              filterQuery.quantity = { $gte: valueInFloat }
            } else if (operator === 'LESS_THAN_OR_EQUAL') {
              filterQuery.quantity = { $lte: valueInFloat }
            } else if (operator === 'EQUALS') {
              filterQuery.quantity = valueInFloat
            }
          }
        }
    
        if (filter.unit) {
          filterQuery.unit = filter.unit
        }
        let skip=0
          if(limit <= 0){
            limit =await Ingredient.countDocuments()
          }else{
            skip = (page - 1) * limit
          }
    
        const ingredients = await Ingredient.find(filterQuery)
          .skip(skip)
          .limit(limit)
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
          return { message: 'No ingredients found', data: [] }
        }
    
        return ingredients
      } catch (error) {
        console.error(error)
        return { message: 'Failed to fetch ingredients', data: [] }
      }
    }
    
  },
    Mutation: {
      createRecipe: async (_, { input }) => {
        try {
            const ingredientCount = await Ingredient.find({ id: { $in: input.ingredients } }).countDocuments();
            if (ingredientCount !== input.ingredients.length) {
                const missingIngredients = input.ingredients.filter(ingredientId =>
                    !ingredientExists(ingredientId)
                )
                throw new UserInputError('Some ingredients do not exist', {
                    invalidArgs: missingIngredients,
                    message: `Ingredients with IDs: ${missingIngredients.join(', ')} do not exist in the database.`,
                })
            }
            const newRecipe = new Recipe({
                id: input.id,
                name: input.name,
                description: input.description || '',
                ingredients: input.ingredients,
                instructions: input.instructions,
                cookingTime: input.cookingTime,
                category: input.category,
            })
            await newRecipe.save()
            return newRecipe
    
        } catch (error) {
            console.error('Error while creating recipe:', error)
            if (error.name === 'ValidationError') {
                throw new UserInputError('MongoDB Validation Error', {
                    message: error.message,
                    invalidArgs: error.errors,
                })
            }
            throw new Error('Failed to create recipe')
        }
      },


      createIngredient: async (_, { input }) => {
        try {
            const existingIngredient = await Ingredient.findOne({ id: input.id })
            if (existingIngredient) {
                throw new UserInputError('Ingredient with this ID already exists', {
                    message: `An ingredient with ID ${input.id} already exists in the database.`,
                })
            }
            const nutritionExists = await Nutrition.findOne({ id: input.nutrition })
            if (!nutritionExists) {
                throw new UserInputError('Nutrition data not found', {
                    message: `Nutrition with ID ${input.nutrition} does not exist in the database.`,
                })
            }
            const newIngredient = new Ingredient({
                id: input.id,
                name: input.name,
                quantity: input.quantity,
                unit: input.unit,
                nutrition: input.nutrition,
            })
            await newIngredient.save()
            const populatedIngredient = await Ingredient.findById(newIngredient._id)
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

        return populatedIngredient
    
        } catch (error) {
            console.error('Error while creating ingredient:', error)
            if (error.name === 'ValidationError') {
                throw new UserInputError('MongoDB Validation Error', {
                    message: error.message,
                    invalidArgs: error.errors,
                })
            }

            throw new Error('Failed to create ingredient')
        }
     },

     createNutrition: async (_, { input }) => {
      try {
        const newNutrition = new Nutrition({
          id: input.id,
          calories: input.calories,
          protein: input.protein,
          fat: input.fat,
          carbohydrates: input.carbohydrates,
        });

        await newNutrition.save();
        
        return newNutrition;
      } catch (error) {
        console.error('Error while creating nutrition:', error);
        if (error.name === 'ValidationError') {
          throw new UserInputError('MongoDB Validation Error', {
            message: error.message,
            invalidArgs: error.errors
          })
        }

        throw new Error('Failed to create nutrition');
      }
    },


    deleteRecipe: async (_, { _id }) => {
      try {
        const deletedRecipe = await Recipe.findByIdAndDelete(_id);
        
        if (!deletedRecipe) {
          throw new UserInputError('Recipe not found', {
            message: `No recipe found with ID ${_id}`,
          });
        }

        return `Recipe with ID ${_id} has been successfully deleted`;
      } catch (error) {
        console.error('Error while deleting recipe:', error);
        throw new Error('Failed to delete recipe');
      }
    },

    deleteIngredient: async (_, { _id }) => {
      try {
        const deletedIngredient = await Ingredient.findByIdAndDelete(_id);

        if (!deletedIngredient) {
          throw new UserInputError('Ingredient not found', {
            message: `No ingredient found with ID ${_id}`,
          });
        }

        return `Ingredient with ID ${_id} has been successfully deleted`;
      } catch (error) {
        console.error('Error while deleting ingredient:', error);
        throw new Error('Failed to delete ingredient');
      }
    },

    deleteNutrition: async (_, { _id }) => {
      try {
        const deletedNutrition = await Nutrition.findByIdAndDelete(_id);

        if (!deletedNutrition) {
          throw new UserInputError('Nutrition data not found', {
            message: `No nutrition data found with ID ${_id}`,
          });
        }

        return `Nutrition data with ID ${_id} has been successfully deleted`;
      } catch (error) {
        console.error('Error while deleting nutrition data:', error);
        throw new Error('Failed to delete nutrition data');
      }
    },

    replaceRecipe: async (_, { input }) => {
      const { _id, name, description, ingredients, instructions, cookingTime, category } = input

      if (!name || !description || !ingredients || !instructions || !cookingTime || !category) {
        throw new UserInputError('All fields are required for a full update')
      }

      try {
        const recipe = await Recipe.findById(_id)

        if (!recipe) {
          throw new UserInputError('Recipe not found', {
            message: `No recipe found with _id ${_id}`,
          })
        }

        const updatedRecipe = {
          name,
          description,
          ingredients,
          instructions,
          cookingTime,
          category,
        }

        const result = await Recipe.findByIdAndUpdate(_id, updatedRecipe, { new: true, runValidators: true }).populate({
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

        if (!result) {
          throw new UserInputError('Validation failed')
        }

        return result

      } catch (error) {
        console.error('Error replacing recipe:', error)
        if (error.name === 'ValidationError') {
          throw new UserInputError('MongoDB Validation Error', {
            message: error.message,
            invalidArgs: error.errors
          })
        }
        throw new Error('Failed to replace recipe')
      }
    },

    updateRecipe: async (_, { input }) => {
      const { _id, name, description, ingredients, instructions, cookingTime, category } = input

      if (input.id) {
        throw new UserInputError("You cannot change the '_id' field.")
      }

      try {
        const recipe = await Recipe.findById(_id)

        if (!recipe) {
          throw new UserInputError('Recipe not found', {
            message: `No recipe found with _id ${_id}`,
          })
        }

        const updatedRecipe = {}

        if (name) updatedRecipe.name = name
        if (description) updatedRecipe.description = description
        if (ingredients) updatedRecipe.ingredients = ingredients
        if (instructions) updatedRecipe.instructions = instructions
        if (cookingTime) updatedRecipe.cookingTime = cookingTime
        if (category) updatedRecipe.category = category

        const result = await Recipe.findByIdAndUpdate(_id, updatedRecipe, { new: true, runValidators: true }).populate({
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

        if (!result) {
          throw new UserInputError('Validation failed')
        }

        return result

      } catch (error) {
        console.error('Error updating recipe:', error)
        if (error.name === 'ValidationError') {
          throw new UserInputError('MongoDB Validation Error', {
            message: error.message,
            invalidArgs: error.errors
          })
        }
        throw new Error('Failed to update recipe')
      }
    },
    
    replaceIngredient: async (_, { _id, input }) => {
      const { recipes, name, quantity, unit, nutrition } = input

      if (!name || !quantity || !unit || !nutrition) {
        throw new UserInputError('Missing required fields. All fields except ID are required for PUT request.')
      }

      try {
        const ingredient = await Ingredient.findById(_id)

        if (!ingredient) {
          throw new UserInputError('Ingredient not found', {
            message: `No ingredient found with _id ${_id}`,
          })
        }

        const updatedIngredient = { recipes, name, quantity, unit, nutrition }

        const result = await Ingredient.findByIdAndUpdate(_id, updatedIngredient, { new: true, runValidators: true })

        if (!result) {
          throw new UserInputError('Validation failed')
        }

        return result
      } catch (error) {
        console.error('Error replacing ingredient:', error)
        if (error.name === 'ValidationError') {
          throw new UserInputError('MongoDB Validation Error', {
            message: error.message,
            invalidArgs: error.errors
          })
        }
        throw new Error('Failed to replace ingredient')
      }
    },

    replaceIngredient: async (_, { _id, input }) => {
      const { recipes, name, quantity, unit, nutrition } = input

      if (!name || !quantity || !unit || !nutrition) {
        throw new UserInputError('Missing required fields. All fields except ID are required for PUT request.')
      }

      try {
        const ingredient = await Ingredient.findById(_id)

        if (!ingredient) {
          throw new UserInputError('Ingredient not found', {
            message: `No ingredient found with _id ${_id}`,
          })
        }

        const updatedIngredient = { recipes, name, quantity, unit, nutrition }

        const result = await Ingredient.findByIdAndUpdate(_id, updatedIngredient, { new: true, runValidators: true }).populate({
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

        if (!result) {
          throw new UserInputError('Validation failed')
        }

        return result
      } catch (error) {
        console.error('Error replacing ingredient:', error)
        throw new Error('Failed to replace ingredient')
      }
    },

    updateIngredient: async (_, { input }) => {
      const { _id, name, quantity, unit, nutrition, recipes } = input

      if (input.id) {
        throw new UserInputError("You cannot change the 'id' or '_id' field.")
      }

      try {
        const ingredient = await Ingredient.findById(_id)

        if (!ingredient) {
          throw new UserInputError('Ingredient not found', {
            message: `No ingredient found with _id ${_id}`,
          })
        }

        const updatedIngredient = {}

        if (name) updatedIngredient.name = name
        if (quantity) updatedIngredient.quantity = quantity
        if (unit) updatedIngredient.unit = unit
        if (nutrition) updatedIngredient.nutrition = nutrition
        if (recipes) updatedIngredient.recipes = recipes

        const result = await Ingredient.findByIdAndUpdate(_id, updatedIngredient, { new: true, runValidators: true }).populate({
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

        if (!result) {
          throw new UserInputError('Validation failed')
        }

        return result
      } catch (error) {
        console.error('Error updating ingredient:', error)
        if (error.name === 'ValidationError') {
          throw new UserInputError('MongoDB Validation Error', {
            message: error.message,
            invalidArgs: error.errors
          })
        }
        throw new Error('Failed to update ingredient')
      }
    },


    replaceNutrition: async (_, { input }) => {
      const {  _id, calories, protein, fat, carbohydrates } = input
    
      if (!calories || !protein || !fat || !carbohydrates) {
        throw new UserInputError('Missing required fields. All fields are required for a full update.')
      }
    
      if (!_id) {
        throw new UserInputError('Nutrition _id is required for replacement.')
      }
    
      try {
        const nutrition = await Nutrition.findById(_id)
    
        if (!nutrition) {
          throw new UserInputError('Nutrition not found', {
            message: `No nutrition found with _id ${_id}`,
          })
        }
    
        const updatedNutrition = { calories, protein, fat, carbohydrates }
    
        const result = await Nutrition.findByIdAndUpdate(_id, updatedNutrition, { new: true, runValidators: true })
    
        if (!result) {
          throw new UserInputError('Validation failed')
        }
    
        return result
      } catch (error) {
        console.error('Error replacing nutrition:', error)
        if (error.name === 'ValidationError') {
          throw new UserInputError('MongoDB Validation Error', {
            message: error.message,
            invalidArgs: error.errors
          })
        }
        throw new Error('Failed to replace nutrition')
      }
    },
    
    updateNutrition: async (_, { input }) => {
      const { _id, calories, protein, fat, carbohydrates } = input
    
      if (input.id) {
        throw new UserInputError("You cannot change the 'id' field.")
      }
    
      try {
        const nutrition = await Nutrition.findById(_id)
    
        if (!nutrition) {
          throw new UserInputError('Nutrition not found', {
            message: `No nutrition found with _id ${_id}`,
          })
        }
    
        const updatedNutrition = {}
    
        if (calories) updatedNutrition.calories = calories
        if (protein) updatedNutrition.protein = protein
        if (fat) updatedNutrition.fat = fat
        if (carbohydrates) updatedNutrition.carbohydrates = carbohydrates
    
        const result = await Nutrition.findByIdAndUpdate(_id, updatedNutrition, { new: true, runValidators: true })
        if (!result) {
          throw new UserInputError('Validation failed')
        }
    
        return result
      } catch (error) {
        console.error('Error updating nutrition:', error)
        if (error.name === 'ValidationError') {
          throw new UserInputError('MongoDB Validation Error', {
            message: error.message,
            invalidArgs: error.errors
          })
        }
        throw new Error('Failed to update nutrition')
      }
    }



    }
  }
  


export default resolvers;
