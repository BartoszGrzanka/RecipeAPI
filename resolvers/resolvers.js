import { generatedRecipes, generatedIngredients } from '../generator.js'


const recipes = generatedRecipes()
const ingredients = generatedIngredients()


const resolvers = {
    Query: {
        getRecipe: (parent, args) => {
            return recipes.find(recipe => recipe.id === args.id)
        },
        getAllRecipes: () => recipes,
        
        getIngredient: (parent, args) => {
            return ingredients.find(ingredient => ingredient.id === args.id)
        },
        getAllIngredients: () => ingredients
    },
    Mutation: {
        createRecipe: (_, { name, description, ingredients, instructions, cookingTime, category }) => {
            const newRecipe = {
              id: String(recipes.length + 1),
              name,
              description,
              ingredients,
              instructions,
              cookingTime,
              category,
            };
            recipes.push(newRecipe)
            return newRecipe;
          },
    }
}

export default resolvers