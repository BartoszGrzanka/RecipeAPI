import express from 'express';
import { generatedRecipes,generatedIngredients } from '../generator.js'

const router = express.Router();

let recipes = generatedRecipes()
let ingredients = generatedIngredients()
router.get('/', (req, res) => {
    res.json("Working");
})

router.get('/recipes', (req, res) => {
    res.json(recipes);
})

router.get('/recipes/:id', (req, res) => {
    res.json(recipes[req.params.id])
})

router.get('/ingredients', (req, res) => {
    res.json(ingredients)
})

router.get('/ingredients/:ingid', (req, res) => {
    
    res.json(ingredients[Number(req.params.ingid)])
})

router.get('/ingredients/:ingid/nutritions', (req, res) => {
    res.json(ingredients[req.params.ingid].nutrition)
})


router.post('/recipes', (req, res) => {
    const newRecipe = req.body
    recipes.push(newRecipe)
    res.status(201).json(newRecipe)
})

router.post('/ingredients', (req, res) => {
    const newingredient = req.body
    ingredients.push(newingredient)
    res.status(201).json(newingredient)
})

router.put('/recipes', (req,res) => {
    
})

export default router;
