import { gql } from 'apollo-server-express'

var typeDefs = gql`

    type Recipe {
        id: ID
        name: String
        description: String
        ingredients: [Int]
        instructions: [String]
        cookingTime: String
        category: String
    }

    type Ingredient{
        id: ID
        recipes: [Int]
        name: String
        quantity: Int
        unit: String
        nutrition: Nutrition
    }


    type Nutrition{
        id: ID
        calories: Int
        protein: Float
        fat: Float
        carbohydrates: Float
    }
        
    type Query{
    getRecipe(id: ID): Recipe
    getIngredient(id:ID): Ingredient
    getAllRecipes: [Recipe]
    getAllIngredients: [Ingredient]
    }

    type Mutation {
    createRecipe(
        name: String!
        description: String
        ingredients: [Int]
        instructions: [String]
        cookingTime: String
        category: String
    ): Recipe
    }
`
export default typeDefs