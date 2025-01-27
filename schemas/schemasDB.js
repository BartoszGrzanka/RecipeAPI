import mongoose from 'mongoose'

// const ingredientSchema = new mongoose.Schema({
//     id: Number,
//     recipes: [Number],
//     name: String,
//     quantity: Number,
//     unit: String,
//     nutrition: Number,
// }) 
const ingredientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: [true,'ID must be unique '],
        min: [1, 'ID must be a positive number'],
    },
    recipes: {
      type: [Number],
      validate: {
        validator: function(value) {

            return value.every(item => typeof item === 'number');
        },
        message: 'Each element in the recipes array must be a number'
    },
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name must be less than 100 characters long']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be greater than or equal to 1'],
        max: [10, 'Quantity cannot be more than 10']
    },
    unit: {
        type: String,
        required: [true, 'Unit is required'],
        enum: {
            values: ['grams', 'ml', 'pieces', 'cups'],
            message: '{VALUE} is not a valid unit. Valid units are: grams, ml, pieces, cups.'
        },
        message: '{VALUE} is not a valid unit. Valid units are: grams, ml, pieces, cups.'
    },
    nutrition: {
        type: Number,
        required: [true, 'Nutrition value is required'],
    }
  })
  
// const nutritionSchema = new mongoose.Schema({
//     id: Number,
//     calories: String,
//     protein: String,
//     fat: String,
//     carbohydrates: String,
// }) 
const nutritionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: [true,'ID must be unique '],
        min: [1, 'ID must be a positive number'],
    },
    calories: {
        type: String,
        required: [true, 'Calories value is required'],
        match: [/^\d+\s?kcal$/, 'Calories must be a number followed by "kcal"'],
    },
    protein: {
        type: String,
        required: [true, 'Protein value is required'],
        match: [/^\d+(\.\d+)?\s?g$/, 'Protein must be a number followed by "g"'],
    },
    fat: {
        type: String,
        required: [true, 'Fat value is required'],
        match: [/^\d+(\.\d+)?\s?g$/, 'Fat must be a number followed by "g"'],
    },
    carbohydrates: {
        type: String,
        required: [true, 'Carbohydrates value is required'],
        match: [/^\d+(\.\d+)?\s?g$/, 'Carbohydrates must be a number followed by "g"'],
    },
})
  
// const recipeSchema = new mongoose.Schema({
//     id: Number,
//     name: String,
//     description: String,
//     ingredients: [Number],
//     instructions: [String],
//     cookingTime: String,
//     category: String,
// }) 
const recipeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: [true,'ID must be unique '],
        min: [1, 'ID must be a positive number'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name must be less than 100 characters long']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    ingredients: {
        type: [Number],
        required: [true, 'Ingredients are required'],
        validate: {
            validator: function(v) {
                return Array.isArray(v) && v.length > 0
            },
            message: 'Ingredients must be a non-empty array'
        }
    },
    instructions: {
        type: [String],
        required: [true, 'Instructions are required'],
        validate: {
            validator: function(v) {
                return v.length > 0
            },
            message: 'Instructions cannot be empty'
        }
    },
    cookingTime: {
        type: String,
        required: [true, 'Cooking time is required'],
        match: [/^\d+ minutes$/, 'Cooking time must be in the format "X minutes"']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values:['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
            message: '{VALUE} is not a valid category. Valid categories are: Breakfast, Lunch, Dinner, Dessert, Snack.'
        },
        message: '{VALUE} is not a valid category'
    }
})

export { ingredientSchema, nutritionSchema, recipeSchema }