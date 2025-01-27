import { gql } from 'apollo-server-express'
import ValueWithGrams from '../scalars/ValueWithGrams.js'
import Calories from '../scalars/Calories.js'


var typeDefs = gql`
    scalar ValueWithGrams
    scalar Calories
    enum StringFilterOperator {
        EQUALS
        CONTAINS
        NOT_EQUALS
        NOT_CONTAINS
    }

    enum NumberFilterOperator {
        EQUALS
        GREATER_THAN
        LESS_THAN
        GREATER_THAN_OR_EQUAL
        LESS_THAN_OR_EQUAL
    }

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
        description: String!
        ingredients: [ID!]!
        instructions: [String!]!
        cookingTime: String!
        category: Category!
    }

    input CreateIngredientInput {
        id: ID!
        recipes: [ID]
        name: String!
        quantity: Int!
        unit: Unit!
        nutrition: ID!
    }

    input CreateNutritionInput {
        id: ID!
        calories: Calories!
        protein: ValueWithGrams!
        fat: ValueWithGrams!
        carbohydrates: ValueWithGrams!
    }




    input ReplaceRecipeInput {
        _id: ID!
        name: String!
        description: String!
        ingredients: [ID!]!
        instructions: [String!]!
        cookingTime: String!
        category: Category!
    }

    input UpdateRecipeInput {
        _id: ID!
        name: String
        description: String
        ingredients: [ID]
        instructions: [String]
        cookingTime: String
        category: Category
    }

    input ReplaceIngredientInput {
        _id: ID!
        name: String!
        quantity: Int!
        unit: Unit!
        nutrition: ID!
        recipes: [ID]
    }

    input UpdateIngredientInput {
        _id: ID!
        name: String
        quantity: Int
        unit: Unit
        nutrition: ID
        recipes: [ID]
    }

    input ReplaceNutritionInput {
        _id: ID!
        calories: Calories!
        protein: ValueWithGrams!
        fat: ValueWithGrams!
        carbohydrates: ValueWithGrams!
    }

    input UpdateNutritionInput {
        _id: ID!
        calories: Calories
        protein: ValueWithGrams
        fat: ValueWithGrams
        carbohydrates: ValueWithGrams
    }




    input RecipeFilter {
        name: StringFilter
        category: String
    }

    input StringFilter {
        operator: StringFilterOperator
        value: String
    }

    input NumberFilter {
        operator: NumberFilterOperator
        value: Float
    }
    input Pagination {
        page: Int = 1
        limit: Int = 10
    }
    input NutritionFilter {
        calories: NumberFilter
        protein: NumberFilter
        fat: NumberFilter
        carbohydrates: NumberFilter
    }
    input IngredientFilter {
        name: StringFilter
        quantity: NumberFilter
        unit: Unit
    }   



        
    type Query {
        getRecipe(_id: ID!): Recipe
        getNutrition(_id: ID!): Nutrition
        getIngredient(_id: ID!): Ingredient
        getAllNutritions(page: Int, limit: Int): [Nutrition]
        getAllRecipes(page: Int, limit: Int, filter: RecipeFilter): [Recipe]
        getAllIngredients(page: Int, limit: Int, filter: IngredientFilter): [Ingredient]
    }

    type Mutation {
        createRecipe(input: CreateRecipeInput): Recipe
        createIngredient(input: CreateIngredientInput): Ingredient
        createNutrition(input: CreateNutritionInput): Nutrition
        deleteRecipe(_id: ID!): String
        deleteIngredient(_id: ID!): String
        deleteNutrition(_id: ID!): String
        replaceRecipe(input: ReplaceRecipeInput): Recipe
        updateRecipe(input: UpdateRecipeInput): Recipe
        replaceIngredient(input: ReplaceIngredientInput): Ingredient
        updateIngredient(input: UpdateIngredientInput): Ingredient
        replaceNutrition(input: ReplaceNutritionInput): Nutrition
        updateNutrition(input: UpdateNutritionInput): Nutrition 
        
    }
`
export default typeDefs