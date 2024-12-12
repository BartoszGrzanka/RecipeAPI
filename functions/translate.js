export const mapIngredients = (ingredientIds, translate,ingredients) => {
    if (!translate) return ingredientIds

    return ingredientIds.map(id => {
        const ingredient = ingredients.find(i => i.id === id)
        return ingredient || { id }
    })
}