import express from 'express'
import { generatedRecipes, generatedIngredients } from '../generator.js'
import { mapIngredients } from '../functions/translate.js'

const router = express.Router()

let recipes = generatedRecipes()
let ingredients = generatedIngredients()

// -------------------- Global Middleware --------------------
router.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    next()
})

// -------------------- Recipes Routes --------------------

// GET All Recipes
router.get('/recipes', (req, res) => {
    const translate = req.query.tr === 'true'; // Jeśli tr=true, przekształcamy ID składników w obiekty

    const recipesWithIngredients = recipes.map(recipe => ({
        ...recipe,
        ingredients: mapIngredients(recipe.ingredients, translate,ingredients), // Mapujemy składniki
        links: [
            { rel: 'self', method: 'GET', href: `/api/recipes/${recipe.id}` },
            { rel: 'update', method: 'PUT', href: `/api/recipes/${recipe.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/recipes/${recipe.id}` },
            { rel: 'all', method: 'GET', href: '/api/recipes' }
        ]
    }));

    res.status(200).json(recipesWithIngredients);
});

// GET Single Recipe
router.get('/recipes/:id', (req, res) => {
    const recipeIndex = Number(req.params.id) - 1 // Jeśli ID w żądaniu to np. 1, zróbmy to 0-indeksowane
    const recipe = recipes[recipeIndex]

    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" })
    }

    const translate = req.query.tr === 'true'
    const recipeWithIngredients = {
        ...recipe,
        ingredients: mapIngredients(recipe.ingredients, translate, ingredients),
        links: [
            { rel: 'self', method: 'GET', href: `/api/recipes/${req.params.id}` },
            { rel: 'update', method: 'PUT', href: `/api/recipes/${req.params.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/recipes/${req.params.id}` },
            { rel: 'all', method: 'GET', href: '/api/recipes' }
        ]
    }
    res.status(200).json(recipeWithIngredients)
})

// POST New Recipe
router.post('/recipes', (req, res) => {
    const { name, ingredients } = req.body
    if (!name || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: "Invalid recipe data" })
    }
    const newRecipe = { id: String(recipes.length + 1), name, ingredients }
    recipes.push(newRecipe)
    res.setHeader('Location', `/api/recipes/${newRecipe.id}`)
    res.status(201).json({
        ...newRecipe,
        links: [
            { rel: 'self', method: 'GET', href: `/api/recipes/${newRecipe.id}` },
            { rel: 'update', method: 'PUT', href: `/api/recipes/${newRecipe.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/recipes/${newRecipe.id}` },
            { rel: 'all', method: 'GET', href: '/api/recipes' },
        ]
    })
})

// PUT Recipe
router.put('/recipes/:id', (req, res) => {
    const { name, ingredients } = req.body
    const recipeIndex = Number(req.params.id)
    const recipe = recipes[recipeIndex]

    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" })
    }
    if (!name || !Array.isArray(ingredients)) {
        return res.status(400).json({ error: "Invalid recipe data" })
    }
    const updatedRecipe = { ...recipe, name, ingredients }
    recipes = recipes.map(r => (r.id === req.params.id ? updatedRecipe : r))
    res.status(200).json({
        ...updatedRecipe,
        links: [
            { rel: 'self', method: 'GET', href: `/api/recipes/${updatedRecipe.id}` },
            { rel: 'update', method: 'PUT', href: `/api/recipes/${updatedRecipe.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/recipes/${updatedRecipe.id}` },
            { rel: 'all', method: 'GET', href: '/api/recipes' },
        ]
    })
})

// PATCH Recipe
router.patch('/recipes/:id', (req, res) => {
    const recipeIndex = Number(req.params.id)
    const recipe = recipes[recipeIndex]
    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" })
    }

    const { name, ingredients } = req.body
    if (name) recipe.name = name
    if (ingredients && Array.isArray(ingredients)) recipe.ingredients = ingredients

    res.status(200).json({
        ...recipe,
        links: [
            { rel: 'self', method: 'GET', href: `/api/recipes/${recipe.id}` },
            { rel: 'update', method: 'PUT', href: `/api/recipes/${recipe.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/recipes/${recipe.id}` },
            { rel: 'all', method: 'GET', href: '/api/recipes' },
        ]
    })
})

// DELETE Recipe
router.delete('/recipes/:id', (req, res) => {
    const numericId = Number(req.params.id) - 1 
    const recipe = recipes[numericId]
    if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" })
    }

    const recipeIndex = recipes.findIndex(r => r.id === recipe.id)

    if (recipeIndex === -1) {
        return res.status(404).json({ error: "Recipe not found" })
    }


    recipes.splice(recipeIndex, 1)

    res.setHeader('Content-Length', '0')
    res.status(200).json({ message: "Recipe deleted successfully" })
})

// -------------------- Ingredients Routes --------------------

// GET All Ingredients
router.get('/ingredients', (req, res) => {
    res.setHeader('X-Total-Count', ingredients.length)
    const data = ingredients.map(ingredient => ({
        ...ingredient,
        links: [
            { rel: 'self', method: 'GET', href: `/api/ingredients/${ingredient.id}` },
            { rel: 'update', method: 'PUT', href: `/api/ingredients/${ingredient.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${ingredient.id}` },
        ]
    }))
    res.status(200).json(data)
})

// GET Single Ingredient
router.get('/ingredients/:ingid', (req, res) => {
    const ingredient = ingredients[Number(req.params.ingid)-1]
    if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" })
    }
    res.setHeader('Last-Modified', new Date().toUTCString())
    res.status(200).json({
        ...ingredient,
        links: [
            { rel: "self", method: "GET", href: `/api/ingredients/${req.params.ingid}` },
            { rel: "update", method: "PUT", href: `/api/ingredients/${req.params.ingid}` },
            { rel: "delete", method: "DELETE", href: `/api/ingredients/${req.params.ingid}` },
            { rel: "all", method: "GET", href: `/api/ingredients` }
        ]
    })
})

// POST New Ingredient
router.post('/ingredients', (req, res) => {
    const { name, nutrition } = req.body
    if (!name || typeof nutrition !== 'object') {
        return res.status(400).json({ error: "Invalid ingredient data" })
    }
    const newIngredient = { 
        id: ingredients.length + 1,
        name, 
        nutrition 
    }
    ingredients.push(newIngredient)
    res.setHeader('Location', `/api/ingredients/${newIngredient.id}`)
    res.status(201).json({
        ...newIngredient,
        links: [
            { rel: 'self', method: 'GET', href: `/api/ingredients/${newIngredient.id}` },
            { rel: 'update', method: 'PUT', href: `/api/ingredients/${newIngredient.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${newIngredient.id}` },
            { rel: 'all', method: 'GET', href: '/api/ingredients' },
        ]
    })
})

// PUT Ingredient
router.put('/ingredients/:id', (req, res) => {
    const ingredientId = Number(req.params.id)
    const ingredientIndex = ingredients.findIndex(i => i.id === ingredientId)

    if (ingredientIndex === -1) {
        return res.status(404).json({ error: "Ingredient not found" })
    }

    const { name, quantity, unit, nutrition, recipes } = req.body
    if (!name || !quantity || !unit || !nutrition) {
        return res.status(400).json({ error: "Invalid data: missing required fields for full update" })
    }

    ingredients[ingredientIndex] = {
        id: ingredientId,
        name,
        quantity,
        unit,
        nutrition,
        recipes,
    };

    res.status(200).json({
        ...ingredients[ingredientIndex], 
        links: [
            { rel: 'self', method: 'GET', href: `/api/ingredients/${ingredients[ingredientIndex].id}` },
            { rel: 'update', method: 'PUT', href: `/api/ingredients/${ingredients[ingredientIndex].id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${ingredients[ingredientIndex].id}` },
            { rel: 'all', method: 'GET', href: '/api/ingredients' },
        ]
    })
})

// PATCH Ingredient (Partial update)
router.patch('/ingredients/:id', (req, res) => {
    const ingredientId = Number(req.params.id)
    const ingredientIndex = ingredients.findIndex(i => i.id === ingredientId)
    if (ingredientIndex === -1) {
        return res.status(404).json({ error: "Ingredient not found" })
    }
    const { name, nutrition, quantity, unit, recipes } = req.body
    const ingredient = ingredients[ingredientIndex]

    if (name) ingredient.name = name
    if (nutrition) ingredient.nutrition = nutrition
    if (quantity) ingredient.quantity = quantity
    if (unit) ingredient.unit = unit
    if (recipes) ingredient.recipes = recipes

    res.status(200).json({
        ...ingredient,
        links: [
            { rel: 'self', method: 'GET', href: `/api/ingredients/${ingredient.id}` },
            { rel: 'update', method: 'PUT', href: `/api/ingredients/${ingredient.id}` },
            { rel: 'delete', method: 'DELETE', href: `/api/ingredients/${ingredient.id}` },
            { rel: 'all', method: 'GET', href: '/api/ingredients' },
        ]
    })
})
// DELETE Ingredient
router.delete('/ingredients/:id', (req, res) => {
    const ingredientId = Number(req.params.id)
    const ingredientIndex = ingredients.findIndex(i => i.id === ingredientId)

    if (ingredientIndex === -1) {
        return res.status(404).json({ error: "Ingredient not found" })
    }

    ingredients.splice(ingredientIndex, 1)
    res.setHeader('Content-Length', '0')
    res.status(200).json({ message: "Ingredient deleted successfully" })
})

export default router
