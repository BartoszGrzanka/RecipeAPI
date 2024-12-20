import { faker } from '@faker-js/faker'

const generateIngredient = (index) => {
  return {
    id: index+1,
    recipes: Array.from({ length:faker.number.int({ min: 1, max: 3 }) }, ()=>faker.number.int({ min: 1, max: 50 })),
    name: faker.commerce.product(),
    quantity: faker.number.int({ min: 1, max: 10 }),
    unit: faker.helpers.arrayElement(['grams', 'ml', 'pieces', 'cups']),
    nutrition: generateNutrition(index),
  }
}

const generateNutrition = (index) => {
  return {
    id: index+1,
    calories: faker.number.int({ min: 100, max: 800 }) + ' kcal',
    protein: faker.number.float({ min: 1, max: 50, precision: 0.1 }) + ' g',
    fat: faker.number.float({ min: 1, max: 50, precision: 0.1 }) + ' g',
    carbohydrates: faker.number.float({ min: 1, max: 100, precision: 0.1 }) + ' g',
  }
}

const generateRecipe = (index) => {
  return {
    id: index+1,
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    //ingredients: Array.from({ length: 5 }, generateIngredient),
    ingredients: Array.from({ length:faker.number.int({ min: 3, max: 10 }) }, ()=>faker.number.int({ min: 1, max: 100 })),
    instructions: Array.from({ length: 3 }, () => faker.lorem.sentence()),
    cookingTime: faker.number.int({ min: 15, max: 120 }) + ' minutes',
    category: faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']),
  }
}

export const generatedRecipes = (count = 50) => {
  return Array.from({ length: count }, (_, index) => generateRecipe(index));
}

export const generatedIngredients = (count = 100) => {
  return Array.from({ length: count }, (_, index) => generateIngredient(index))
};