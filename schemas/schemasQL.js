import { gql } from 'apollo-server-express'


var typeDefs = gql`
    """
    Custom scalar for values with grams (e.g., '500g').
    """
    scalar ValueWithGrams

    """
    Custom scalar representing calorie values (e.g., '200 kcal').
    """
    scalar Calories

    """
    Enum for string filter operators used in filtering logic.
    """
    enum StringFilterOperator {
        """Checks if the value is equal to the given string."""
        EQUALS
        """Checks if the given string contains the specified value."""
        CONTAINS
        """Checks if the value is not equal to the given string."""
        NOT_EQUALS
        """Checks if the given string does not contain the specified value."""
        NOT_CONTAINS
    }

    """
    Enum for number filter operators used in filtering logic.
    """
    enum NumberFilterOperator {
        """Checks if the value is equal to the given number."""
        EQUALS
        """Checks if the value is greater than the given number."""
        GREATER_THAN
        """Checks if the value is less than the given number."""
        LESS_THAN
        """Checks if the value is greater than or equal to the given number."""
        GREATER_THAN_OR_EQUAL
        """Checks if the value is less than or equal to the given number."""
        LESS_THAN_OR_EQUAL
    }

    """
    Enum for units of measurement used in ingredients.
    """
    enum Unit {
        """Unit representing grams."""
        grams
        """Unit representing milliliters."""
        ml
        """Unit representing individual pieces."""
        pieces
        """Unit representing cups."""
        cups
    }

    """
    Enum for recipe categories.
    """
    enum Category {
        """Category for breakfast recipes."""
        Breakfast
        """Category for lunch recipes."""
        Lunch
        """Category for dinner recipes."""
        Dinner
        """Category for dessert recipes."""
        Dessert
        """Category for snack recipes."""
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



    """
    Input for creating a new recipe.
    """
    input CreateRecipeInput {
        """Unique identifier for the recipe."""
        id: ID!
        """Name of the recipe."""
        name: String!
        """Description of the recipe."""
        description: String!
        """List of ingredient IDs used in the recipe."""
        ingredients: [ID!]!
        """List of step-by-step instructions for the recipe."""
        instructions: [String!]!
        """Time required to cook the recipe in minutes (e.g., '30minutes')."""
        cookingTime: String!
        """Category of the recipe (e.g., 'Breakfast')."""
        category: Category!
    }

    """
    Input for creating a new ingredient.
    """
    input CreateIngredientInput {
        """Unique identifier for the ingredient."""
        id: ID!
        """List of recipe IDs where the ingredient is used."""
        recipes: [ID]
        """Name of the ingredient."""
        name: String!
        """Quantity of the ingredient."""
        quantity: Int!
        """Unit of measurement for the ingredient (e.g., 'grams', 'ml')."""
        unit: Unit!
        """Nutrition information ID associated with the ingredient."""
        nutrition: ID!
    }

    """
    Input for creating a new nutrition entry.
    """
    input CreateNutritionInput {
        """Unique identifier for the nutrition entry."""
        id: ID!
        """Calorie count for the nutrition entry."""
        calories: Calories!
        """Protein content in grams."""
        protein: ValueWithGrams!
        """Fat content in grams."""
        fat: ValueWithGrams!
        """Carbohydrate content in grams."""
        carbohydrates: ValueWithGrams!
    }

    """
    Input for completely replacing an existing recipe.
    """
    input ReplaceRecipeInput {
        """Unique identifier for the recipe."""
        _id: ID!
        """Name of the recipe."""
        name: String!
        """Description of the recipe."""
        description: String!
        """List of ingredient IDs used in the recipe."""
        ingredients: [ID!]!
        """List of step-by-step instructions for the recipe."""
        instructions: [String!]!
        """Time required to cook the recipe (e.g., '30m')."""
        cookingTime: String!
        """Category of the recipe (e.g., 'Breakfast')."""
        category: Category!
    }

    """
    Input for updating an existing recipe. Fields are optional.
    """
    input UpdateRecipeInput {
        """Unique identifier for the recipe."""
        _id: ID!
        """Name of the recipe."""
        name: String
        """Description of the recipe."""
        description: String
        """List of ingredient IDs used in the recipe."""
        ingredients: [ID]
        """List of step-by-step instructions for the recipe."""
        instructions: [String]
        """Time required to cook the recipe (e.g., '30m')."""
        cookingTime: String
        """Category of the recipe (e.g., 'Breakfast')."""
        category: Category
    }

    """
    Input for completely replacing an existing ingredient.
    """
    input ReplaceIngredientInput {
        """Unique identifier for the ingredient."""
        _id: ID!
        """Name of the ingredient."""
        name: String!
        """Quantity of the ingredient."""
        quantity: Int!
        """Unit of measurement for the ingredient (e.g., 'grams', 'ml')."""
        unit: Unit!
        """Nutrition information ID associated with the ingredient."""
        nutrition: ID!
        """List of recipe IDs where the ingredient is used."""
        recipes: [ID]
    }

    """
    Input for updating an existing ingredient. Fields are optional.
    """
    input UpdateIngredientInput {
        """Unique identifier for the ingredient."""
        _id: ID!
        """Name of the ingredient."""
        name: String
        """Quantity of the ingredient."""
        quantity: Int
        """Unit of measurement for the ingredient (e.g., 'grams', 'ml')."""
        unit: Unit
        """Nutrition information ID associated with the ingredient."""
        nutrition: ID
        """List of recipe IDs where the ingredient is used."""
        recipes: [ID]
    }

    """
    Input for completely replacing an existing nutrition entry.
    """
    input ReplaceNutritionInput {
        """Unique identifier for the nutrition entry."""
        _id: ID!
        """Calorie count for the nutrition entry."""
        calories: Calories!
        """Protein content in grams."""
        protein: ValueWithGrams!
        """Fat content in grams."""
        fat: ValueWithGrams!
        """Carbohydrate content in grams."""
        carbohydrates: ValueWithGrams!
    }

    """
    Input for updating an existing nutrition entry. Fields are optional.
    """
    input UpdateNutritionInput {
        """Unique identifier for the nutrition entry."""
        _id: ID!
        """Calorie count for the nutrition entry."""
        calories: Calories
        """Protein content in grams."""
        protein: ValueWithGrams
        """Fat content in grams."""
        fat: ValueWithGrams
        """Carbohydrate content in grams."""
        carbohydrates: ValueWithGrams
    }

    """
    Input for filtering recipes.
    """
    input RecipeFilter {
        """Filter recipes by name."""
        name: StringFilter
        """Filter recipes by category."""
        category: String
    }

    """
    Filter for string fields.
    """
    input StringFilter {
        """Operator to use for filtering (e.g., 'EQUALS', 'CONTAINS')."""
        operator: StringFilterOperator
        """Value to filter by."""
        value: String
    }

    """
    Filter for number fields.
    """
    input NumberFilter {
        """Operator to use for filtering (e.g., 'GREATER_THAN', 'LESS_THAN')."""
        operator: NumberFilterOperator
        """Value to filter by."""
        value: Float
    }

    """
    Input for pagination parameters.
    """
    input Pagination {
        """Page number for pagination. Defaults to 1."""
        page: Int = 1
        """Number of items per page. Defaults to 10."""
        limit: Int = 10
    }

    """
    Input for filtering nutrition data.
    """
    input NutritionFilter {
        """Filter by calories."""
        calories: NumberFilter
        """Filter by protein content."""
        protein: NumberFilter
        """Filter by fat content."""
        fat: NumberFilter
        """Filter by carbohydrate content."""
        carbohydrates: NumberFilter
    }

    """
    Input for filtering ingredients.
    """
    input IngredientFilter {
        """Filter by ingredient name."""
        name: StringFilter
        """Filter by ingredient quantity."""
        quantity: NumberFilter
        """Filter by ingredient unit."""
        unit: Unit
    }
        
    type Query {
        """
        Retrieves a specific recipe by its unique identifier (_id).
        """
        getRecipe(_id: ID!): Recipe

        """
        Retrieves a specific nutrition entry by its unique identifier (_id).
        """
        getNutrition(_id: ID!): Nutrition

        """
        Retrieves a specific ingredient by its unique identifier (_id).
        """
        getIngredient(_id: ID!): Ingredient

        """
        Retrieves all nutrition entries, with optional pagination (page and limit).
        """
        getAllNutritions(page: Int, limit: Int): [Nutrition]

        """
        Retrieves all recipes, with optional pagination and filtering by RecipeFilter.
        """
        getAllRecipes(page: Int, limit: Int, filter: RecipeFilter): [Recipe]

        """
        Retrieves all ingredients, with optional pagination and filtering by IngredientFilter.
        """
        getAllIngredients(page: Int, limit: Int, filter: IngredientFilter): [Ingredient]
    }

    type Mutation {
        """
        Creates a new recipe using the provided CreateRecipeInput and returns the created Recipe object.
        """
        createRecipe(input: CreateRecipeInput): Recipe

        """
        Creates a new ingredient using the provided CreateIngredientInput and returns the created Ingredient object.
        """
        createIngredient(input: CreateIngredientInput): Ingredient

        """
        Creates a new nutrition entry using the provided CreateNutritionInput and returns the created Nutrition object.
        """
        createNutrition(input: CreateNutritionInput): Nutrition

        """
        Deletes a specific recipe by its unique identifier (_id) and returns a success message.
        """
        deleteRecipe(_id: ID!): String

        """
        Deletes a specific ingredient by its unique identifier (_id) and returns a success message.
        """
        deleteIngredient(_id: ID!): String

        """
        Deletes a specific nutrition entry by its unique identifier (_id) and returns a success message.
        """
        deleteNutrition(_id: ID!): String

        """
        Completely replaces an existing recipe with new data using ReplaceRecipeInput and returns the updated Recipe object.
        """
        replaceRecipe(input: ReplaceRecipeInput): Recipe

        """
        Partially updates an existing recipe using UpdateRecipeInput and returns the updated Recipe object.
        """
        updateRecipe(input: UpdateRecipeInput): Recipe

        """
        Completely replaces an existing ingredient with new data using ReplaceIngredientInput and returns the updated Ingredient object.
        """
        replaceIngredient(input: ReplaceIngredientInput): Ingredient

        """
        Partially updates an existing ingredient using UpdateIngredientInput and returns the updated Ingredient object.
        """
        updateIngredient(input: UpdateIngredientInput): Ingredient

        """
        Completely replaces an existing nutrition entry with new data using ReplaceNutritionInput and returns the updated Nutrition object.
        """
        replaceNutrition(input: ReplaceNutritionInput): Nutrition

        """
        Partially updates an existing nutrition entry using UpdateNutritionInput and returns the updated Nutrition object.
        """
        updateNutrition(input: UpdateNutritionInput): Nutrition
    }

`
export default typeDefs