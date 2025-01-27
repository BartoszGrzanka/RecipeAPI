import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import { ingredientSchema, nutritionSchema, recipeSchema } from './schemas/schemasDB.js'

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/recipeAPI')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

const Ingredient = mongoose.model('Ingredient', ingredientSchema)
const Nutrition = mongoose.model('Nutrition', nutritionSchema)
const Recipe = mongoose.model('Recipe', recipeSchema)


const generateIngredient = (index) => {
  return {
    id: index + 1,
    recipes: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.number.int({ min: 1, max: 50 })),
    name: faker.commerce.product(),
    quantity: faker.number.int({ min: 1, max: 10 }),
    unit: faker.helpers.arrayElement(['grams', 'ml', 'pieces', 'cups']),
    nutrition: faker.number.int({ min: 1, max: 100 })
  }
}

const generateNutrition = (index) => {
  return {
    id: index + 1,
    calories: faker.number.int({ min: 100, max: 800 }) + ' kcal',
    protein: faker.number.float({ min: 1, max: 50, precision: 0.1 }) + ' g',
    fat: faker.number.float({ min: 1, max: 50, precision: 0.1 }) + ' g',
    carbohydrates: faker.number.float({ min: 1, max: 100, precision: 0.1 }) + ' g'
  }
}

const generateRecipe = (index) => {
  return {
    id: index + 1,
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    ingredients: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => faker.number.int({ min: 1, max: 100 })),
    instructions: Array.from({ length: 3 }, () => faker.lorem.sentence()),
    cookingTime: faker.number.int({ min: 15, max: 120 }) + ' minutes',
    category: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'])
  }
}

const seedData = async () => {
  try {
    const ingredientData = Array.from({ length: 100 }, (_, index) => generateIngredient(index))
    const nutritionData = Array.from({ length: 100 }, (_, index) => generateNutrition(index))
    const recipeData = Array.from({ length: 50 }, (_, index) => generateRecipe(index))

    await Ingredient.insertMany(ingredientData)
    await Nutrition.insertMany(nutritionData)
    await Recipe.insertMany(recipeData)

    console.log('Data inserted successfully')
  } catch (error) {
    console.error('Error inserting data:', error)
  } finally {
    await mongoose.connection.close()
  }
}

const run = async () => {
  await connectDB()
  await seedData()
}

run()
