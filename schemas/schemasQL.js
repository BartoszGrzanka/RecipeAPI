import { gql } from 'apollo-server-express'
import ValueWithGrams from '../scalars/ValueWithGrams.js'
import Calories from '../scalars/Calories.js'


var typeDefs = gql`
    scalar ValueWithGrams
    scalar Calories

    enum Unit {
        grams
        ml
        pieces
        cups
    }
    enum Category {
        Breakfast 
        Lunch 
        Dinner
        Dessert
        Snack
    }

    type Recipe {
        _id: ID!
        id: ID!
        name: String!
        description: String
        ingredients: [Ingredient!]!
        instructions: [String]
        cookingTime: String
        category: Category
    }

    type Ingredient{
        _id: ID!
        id: ID!
        recipes: [Recipe]
        name: String!
        quantity: Int!
        unit: Unit
        nutrition: Nutrition!
    }

    type Nutrition{
        _id: ID!
        id: ID!
        calories: Calories!
        protein: ValueWithGrams!
        fat: ValueWithGrams!
        carbohydrates: ValueWithGrams!
    }



    input CreateRecipeInput {
        id: ID!
        name: String!
        description: String
        ingredients: [CreateIngredientInput!]!
        instructions: [String!]!
        cookingTime: String!
        category: Category!
    }

    input CreateIngredientInput {
        id: ID!
        name: String!
        quantity: Int!
        unit: Unit!
        nutrition: CreateNutritionInput!
    }

    input CreateNutritionInput {
        id: ID!
        calories: Calories!
        protein: ValueWithGrams!
        fat: ValueWithGrams!
        carbohydrates: ValueWithGrams!
    }
        
    type Query {
        getRecipe(_id: ID!): Recipe
        getNutrition(_id: ID!): Nutrition
        getIngredient(_id: ID!): Ingredient
        getALLNutritions: [Nutrition]
        getAllRecipes: [Recipe]
        getAllIngredients: [Ingredient]
    }

    type Mutation {
        createRecipe(input: CreateRecipeInput): Recipe
        createIngredient(input: CreateIngredientInput): Ingredient
        createNutrition(input: CreateNutritionInput): Nutrition
    }
`
export default typeDefs