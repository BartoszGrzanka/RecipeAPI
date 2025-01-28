import express from 'express'
import mongoose from 'mongoose'

import { ingredientSchema, nutritionSchema, recipeSchema } from '../schemas/schemasDB.js'
const Recipe = mongoose.model('Recipe', recipeSchema)
const Ingredient = mongoose.model('Ingredient', ingredientSchema)
const Nutrition= mongoose.model('Nutrition', nutritionSchema)
const router = express.Router()

// -------------------- Global Middleware --------------------
router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    next()
})

//---------------------------------------------------------
// -------------------- Recipes Routes --------------------
//---------------------------------------------------------

// GET All Recipes
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find()

        if (recipes.length > 0) {
            const recipesWithLinks = recipes.map(recipe => {
                return {
                    ...recipe.toObject(),
                    links: [
                        { rel: 'self', method: 'GET', href: `/api/recipes/${recipe._id}` },
                        { rel: 'update', method: 'PATCH', href: `/api/recipes/${recipe._id}` },
                        { rel: 'replace', method: 'PUT', href: `/api/recipes/${recipe._id}` },
                        { rel: 'delete', method: 'DELETE', href: `/api/recipes/${recipe._id}` },
                        { rel: 'all', method: 'GET', href: '/api/recipes' }
                    ]
                }
            })

            res.status(200).json(recipesWithLinks)
        } else {
            console.log("Please run in command line npm run data to generate data to use")
            res.status(404).json({ message: 'No recipes found' })
        }
    } catch (error) {
        console.error('Error fetching recipes:', error)
        res.status(500).json({ message: 'Error fetching recipes', error: error.message })
    }
})


// GET Single Recipe
router.get('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id)

        if (recipe) {
            const recipeWithLinks = {
                ...recipe.toObject(),
                links: [
                    { rel: 'self', method: 'GET', href: `/api/recipes/${recipe._id}` },
                    { rel: 'update', method: 'PATCH', href: `/api/recipes/${recipe._id}` },
                    { rel: 'replace', method: 'PUT', href: `/api/recipes/${recipe._id}` },
                    { rel: 'delete', method: 'DELETE', href: `/api/recipes/${recipe._id}` },
                    { rel: 'all', method: 'GET', href: '/api/recipes' }
                ]
            }

            res.status(200).json(recipeWithLinks);
        } else {
            res.status(404).json({ message: `Recipe with _id ${id} not found` });
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ message: 'Error fetching recipe', error: error.message })
    }
})

// POST New Recipe
router.post('/recipes', async (req, res) => {
    const { id, name, description, ingredients, instructions, cookingTime, category } = req.body
    const newRecipe = new Recipe({
        id,
        name,
        description,
        ingredients,
        instructions,
        cookingTime,
        category
    })

    try {
        const result = await newRecipe.save()

        res.status(201).json({
            ...result.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/recipes/${result._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/recipes/${result._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/recipes/${result._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/recipes/${result._id}` },
                { rel: 'all', method: 'GET', href: '/api/recipes' }
            ]
        })
    } catch (error) {
        console.error('Error creating recipe:', error)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }
        res.status(500).json({ message: 'Error creating recipe', error: error.message })
    }
})

// PUT Recipe
router.put('/recipes/:_id', async (req, res) => {
    const { name, description, ingredients, instructions, cookingTime, category } = req.body
    const { _id } = req.params
    if (  !name || !description || !ingredients || !instructions || !cookingTime || !category ) {
        return res.status(400).json({ error: 'Missing required fields. All fields except ID are required for PUT request.' })}
    try {
        const recipe = await Recipe.findById(_id)

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' })
        }

        const updatedRecipe = {
            name,
            description,
            ingredients,
            instructions,
            cookingTime,
            category
        }

        const result = await Recipe.findByIdAndUpdate(_id, updatedRecipe, { new: true, runValidators: true })
        if (!result) {
            return res.status(400).json({ error: 'Validation failed' })
        }

        res.status(200).json({
            ...result.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/recipes/${result._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/recipes/${recipe._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/recipes/${recipe._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/recipes/${result._id}` },
                { rel: 'all', method: 'GET', href: '/api/recipes' }
            ]
        })
    } catch (error) {
        console.error('Error updating recipe:', error)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }
        res.status(500).json({ message: 'Error updating recipe', error: error.message })
    }
})



// PATCH Recipe
router.patch('/recipes/:_id', async (req, res) => {
    const { _id } = req.params
    const { name, description, ingredients, instructions, cookingTime, category } = req.body
    if (req.body.id || req.body._id) {
        return res.status(400).json({ error: "You cannot change the 'id' or '_id' field." })
    }

    try {
        const recipe = await Recipe.findById(_id)

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' })
        }
        const updatedRecipe = {}

        if (name) updatedRecipe.name = name
        if (description) updatedRecipe.description = description
        if (ingredients) updatedRecipe.ingredients = ingredients
        if (instructions) updatedRecipe.instructions = instructions
        if (cookingTime) updatedRecipe.cookingTime = cookingTime
        if (category) updatedRecipe.category = category

        const result = await Recipe.findByIdAndUpdate(_id, updatedRecipe, { new: true, runValidators: true })
        if (!result) {
            return res.status(400).json({ error: 'Validation failed' })
        }

        res.status(200).json({
            ...result.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/recipes/${result._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/recipes/${recipe._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/recipes/${recipe._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/recipes/${result._id}` },
                { rel: 'all', method: 'GET', href: '/api/recipes' }
            ]
        })
    } catch (error) {
        console.error('Error updating recipe:', error)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }
        res.status(500).json({ message: 'Error updating recipe', error: error.message })
    }
})


// DELETE Recipe
router.delete('/recipes/:_id', async (req, res) => {
    const { _id } = req.params

    try {
        const recipe = await Recipe.findByIdAndDelete(_id)
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' })
        }
        res.status(200).json({
            message: 'Recipe deleted successfully',
            links: [
                { rel: 'all', method: 'GET', href: '/api/recipes' }
            ]
        })
    } catch (error) {
        console.error('Error deleting recipe:', error)
        res.status(500).json({ message: 'Error deleting recipe', error: error.message })
    }
})


//-------------------------------------------------------------
// -------------------- Ingredients Routes --------------------
//-------------------------------------------------------------


// GET All Ingredients
router.get('/ingredients', async (req, res) => {
    try {
        const ingredients = await Ingredient.find()

        if (ingredients.length > 0) {
            const ingredientsWithLinks = ingredients.map(ingredient => {
                return {
                    ...ingredient.toObject(),
                    links: [
                        { rel: 'self', method: 'GET', href: `/api/ingredients/${ingredient._id}` },
                        { rel: 'update', method: 'PATCH', href: `/api/ingredients/${ingredient._id}` },
                        { rel: 'replace', method: 'PUT', href: `/api/ingredients/${ingredient._id}` }, 
                        { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${ingredient._id}` },
                        { rel: 'all', method: 'GET', href: '/api/ingredients' }
                    ]
                }
            })

            res.status(200).json(ingredientsWithLinks)
        } else {
            console.log("Please run in command line npm run data to generate data to use")
            res.status(404).json({ message: 'No ingredients found' })
        }
    } catch (error) {
        console.error('Error fetching ingredients:', error)
        res.status(500).json({ message: 'Error fetching ingredients', error: error.message })
    }
})


// GET Single Ingredient
router.get('/ingredients/:id', async (req, res) => {
    try {
        const { id } = req.params
        const ingredient = await Ingredient.findById(id)

        if (ingredient) {
            const ingredientWithLinks = {
                ...ingredient.toObject(),
                links: [
                    { rel: 'self', method: 'GET', href: `/api/ingredients/${ingredient._id}` },
                    { rel: 'update', method: 'PATCH', href: `/api/ingredients/${ingredient._id}` },
                    { rel: 'replace', method: 'PUT', href: `/api/ingredients/${ingredient._id}` },
                    { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${ingredient._id}` },
                    { rel: 'all', method: 'GET', href: '/api/ingredients' }
                ]
            }

            res.status(200).json(ingredientWithLinks)
        } else {
            res.status(404).json({ message: `Ingredient with _id ${id} not found` })
        }
    } catch (error) {
        console.error('Error fetching ingredient:', error)
        res.status(500).json({ message: 'Error fetching ingredient', error: error.message })
    }
})


// POST New Ingredient
router.post('/ingredients', async (req, res) => {
    const { id, recipes, name, quantity, unit, nutrition } = req.body
    try {
        const newIngredient = new Ingredient({
            id,
            recipes,
            name,
            quantity,
            unit,
            nutrition
        })

        await newIngredient.save()
        res.status(201).json({
            ...newIngredient.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/ingredients/${newIngredient._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/ingredients/${newIngredient._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/ingredients/${newIngredient._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${newIngredient._id}` },
                { rel: 'all', method: 'GET', href: '/api/ingredients' }
            ]
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }
        console.error('Error creating ingredient:', error)
        res.status(500).json({ message: 'Error creating ingredient', error: error.message })
    }
})

// PUT Ingredient
router.put('/ingredients/:_id', async (req, res) => {
    const { recipes, name, quantity, unit, nutrition } = req.body
    const { _id } = req.params

    if (!name || !quantity || !unit || !nutrition) {
        return res.status(400).json({ error: 'Missing required fields. All fields except ID are required for PUT request.' })
    }

    try {
        const ingredient = await Ingredient.findById(_id)

        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' })
        }

        const updatedIngredient = {
            recipes,     
            name,        
            quantity,   
            unit,        
            nutrition  
        }
        const result = await Ingredient.findByIdAndUpdate(_id, updatedIngredient, { new: true, runValidators: true })
        if (!result) {
            return res.status(400).json({ error: 'Validation failed' })
        }
        res.status(201).json({
            ...result.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/ingredients/${result._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/ingredients/${result._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/ingredients/${result._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${result._id}` },
                { rel: 'all', method: 'GET', href: '/api/ingredients' }
            ]
        })
    } catch (error) {
        console.error('Error updating ingredient:', error)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }
        res.status(500).json({ message: 'Error updating ingredient', error: error.message })
    }
})


// PATCH Ingredient (Partial update)
router.patch('/ingredients/:_id', async (req, res) => {
    const { _id } = req.params
    const { recipes, name, quantity, unit, nutrition } = req.body
    if (req.body.id || req.body._id) {
        return res.status(400).json({ error: "You cannot change the 'id' or '_id' field." })
    }
    try {
        const ingredient = await Ingredient.findById(_id)

        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' })
        }

        const updatedIngredient = {}
        if (recipes) updatedIngredient.recipes = recipes
        if (name) updatedIngredient.name = name
        if (quantity) updatedIngredient.quantity = quantity
        if (unit) updatedIngredient.unit = unit
        if (nutrition) updatedIngredient.nutrition = nutrition
        const result = await Ingredient.findByIdAndUpdate(
            _id,
            { $set: updatedIngredient },
            { new: true, runValidators: true }
        )

        if (!result) {
            return res.status(400).json({ error: 'Validation failed' })
        }
        res.status(200).json({
            ...result.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/ingredients/${result._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/ingredients/${result._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/ingredients/${result._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${result._id}` },
                { rel: 'all', method: 'GET', href: '/api/ingredients' }
            ]
        })
    } catch (error) {
        console.error('Error updating ingredient:', error)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }

        res.status(500).json({ message: 'Error updating ingredient', error: error.message })
    }
})

// DELETE Ingredient
router.delete('/ingredients/:_id', async (req, res) => {
    const { _id } = req.params

    try {
        const ingredient = await Ingredient.findById(_id)

        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' })
        }
        await Ingredient.findByIdAndDelete(_id)

        res.status(200).json({
            message: `Ingredient with id ${_id} has been successfully deleted`,
            links: [
                { rel: 'all', method: 'GET', href: '/api/ingredients' }
            ]
        })
    } catch (error) {
        console.error('Error deleting ingredient:', error)
        res.status(500).json({ message: 'Error deleting ingredient', error: error.message })
    }
})



//------------------------------------------------------------
// -------------------- Nutritions Routes --------------------
//------------------------------------------------------------


// GET All Nutritions
router.get('/nutritions', async (req, res) => {
    try {
        const nutritions = await Nutrition.find()

        if (nutritions.length > 0) {
            const nutritionsWithLinks = nutritions.map(nutrition => {
                return {
                    ...nutrition.toObject(),
                    links: [
                        { rel: 'self', method: 'GET', href: `/api/nutritions/${nutrition._id}` },
                        { rel: 'update', method: 'PATCH', href: `/api/nutritions/${nutrition._id}` },
                        { rel: 'replace', method: 'PUT', href: `/api/nutritions/${nutrition._id}` },
                        { rel: 'delete', method: 'DELETE', href: `/api/nutritions/${nutrition._id}` },
                        { rel: 'all', method: 'GET', href: '/api/nutritions' }
                    ]
                }
            })

            res.status(200).json(nutritionsWithLinks)
        } else {
            console.log("Please run in command line npm run data to generate data to use")
            res.status(404).json({ message: 'No nutritions found' })
        }
    } catch (error) {
        console.error('Error fetching nutritions:', error)
        res.status(500).json({ message: 'Error fetching nutritions', error: error.message })
    }
})

// GET Single Nutrition
router.get('/nutritions/:id', async (req, res) => {
    try {
        const nutrition = await Nutrition.findById(req.params.id)

        if (nutrition) {
            const nutritionWithLinks = {
                ...nutrition.toObject(),
                links: [
                    { rel: 'self', method: 'GET', href: `/api/nutritions/${nutrition._id}` },
                    { rel: 'update', method: 'PATCH', href: `/api/nutritions/${nutrition._id}` },
                    { rel: 'replace', method: 'PUT', href: `/api/nutritions/${nutrition._id}` },
                    { rel: 'delete', method: 'DELETE', href: `/api/nutritions/${nutrition._id}` },
                    { rel: 'all', method: 'GET', href: '/api/nutritions' }
                ]
            }

            res.status(200).json(nutritionWithLinks)
        } else {
            res.status(404).json({ message: 'Nutrition not found' })
        }
    } catch (error) {
        console.error('Error fetching nutrition:', error)
        res.status(500).json({ message: 'Error fetching nutrition', error: error.message })
    }
})

// POST Nutrition
router.post('/nutritions', async (req, res) => {
    const { id, calories, protein, fat, carbohydrates } = req.body

    try {
        const newNutrition = new Nutrition({
            id,
            calories,
            protein,
            fat,
            carbohydrates
        })

        await newNutrition.save()
        res.status(201).json({
            ...newNutrition.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/nutrition/${newNutrition._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/nutrition/${newNutrition._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/nutrition/${newNutrition._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/nutrition/${newNutrition._id}` },
                { rel: 'all', method: 'GET', href: '/api/nutrition' }
            ]
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }
        console.error('Error creating nutrition:', error)
        res.status(500).json({ message: 'Error creating nutrition', error: error.message })
    }
})

// PUT Nutrition
router.put('/nutritions/:_id', async (req, res) => {
    const { id, calories, protein, fat, carbohydrates } = req.body
    const { _id } = req.params
    if (  !calories || !protein || !fat || !carbohydrates ) {
        return res.status(400).json({ error: 'Missing required fields. All fields except ID are required for PUT request.' })}
    try {
        const nutrition = await Nutrition.findById(_id);

        if (!nutrition) {
            return res.status(404).json({ error: 'Nutrition not found' });
        }

        const updatedNutrition = {
            calories,
            protein,
            fat,
            carbohydrates
        }

        const result = await Nutrition.findByIdAndUpdate(_id, updatedNutrition, { new: true, runValidators: true });
        if (!result) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        res.status(200).json({
            ...result.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/nutritions/${result._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/nutritions/${result._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/nutritions/${result._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/nutritions/${result._id}` },
                { rel: 'all', method: 'GET', href: '/api/nutritions' }
            ]
        })
    } catch (error) {
        console.error('Error updating nutrition:', error)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors: errorMessages })
        }
        res.status(500).json({ message: 'Error updating nutrition', error: error.message })
    }
})


// PATCH Nutrition
router.patch('/nutritions/:_id', async (req, res) => {
    const { _id } = req.params
    const { id, calories, protein, fat, carbohydrates } = req.body
    if (req.body.id || req.body._id) {
        return res.status(400).json({ error: "You cannot change the 'id' or '_id' field." })
    }

    try {
        const nutrition = await Nutrition.findById(_id)

        if (!nutrition) {
            return res.status(404).json({ error: 'Nutrition not found' })
        }
        const updatedNutrition = {}
        if (id) updatedNutrition.id = id
        if (calories) updatedNutrition.calories = calories
        if (protein) updatedNutrition.protein = protein
        if (fat) updatedNutrition.fat = fat
        if (carbohydrates) updatedNutrition.carbohydrates = carbohydrates
        const result = await Nutrition.findByIdAndUpdate(
            _id,
            { $set: updatedNutrition },
            { new: true, runValidators: true }
        )

        if (!result) {
            return res.status(400).json({ error: 'Validation failed' })
        }
        res.status(200).json({
            ...result.toObject(),
            links: [
                { rel: 'self', method: 'GET', href: `/api/nutritions/${result._id}` },
                { rel: 'update', method: 'PATCH', href: `/api/nutritions/${result._id}` },
                { rel: 'replace', method: 'PUT', href: `/api/nutritions/${result._id}` },
                { rel: 'delete', method: 'DELETE', href: `/api/nutritions/${result._id}` },
                { rel: 'all', method: 'GET', href: '/api/nutritions' }
            ]
        })
    } catch (error) {
        console.error('Error updating nutrition:', error)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message)
            return res.status(400).json({ errors: errorMessages })
        }

        res.status(500).json({ message: 'Error updating nutrition', error: error.message })
    }
})

// DELETE Nutrition
router.delete('/nutritions/:_id', async (req, res) => {
    const { _id } = req.params

    try {
        const nutrition = await Nutrition.findById(_id)

        if (!nutrition) {
            return res.status(404).json({ error: 'Nutrition not found' })
        }
        await Nutrition.findByIdAndDelete(_id)

        res.status(200).json({
            message: `Nutrition with id ${_id} has been successfully deleted`,
            links: [
                { rel: 'all', method: 'GET', href: '/api/nutritions' }
            ]
        })
    } catch (error) {
        console.error('Error deleting nutrition:', error)
        res.status(500).json({ message: 'Error deleting nutrition', error: error.message })
    }
})

export default router
