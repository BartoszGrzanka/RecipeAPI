# API Documentation

This documentation provides details about the RESTful API for managing recipes and ingredients.

## Base URL

```
/api
```

## Global Middleware

Every request is processed with the following middleware:
- **Content-Type:** `application/json`
- **Cache-Control:** `no-store`
- **X-Content-Type-Options:** `nosniff`

---

## Recipes Routes

### GET /recipes

Fetch all recipes with their ingredients.

**Query Parameters:**
- `tr` (optional): If set to `'true'`, ingredients will be translated.

**Response:**
- Status: `200 OK`
- Body: An array of recipes with ingredients and associated links.

### GET /recipes/:id

Fetch a specific recipe by ID.

**Path Parameters:**
- `id`: The ID of the recipe.

**Query Parameters:**
- `tr` (optional): If set to `'true'`, ingredients will be translated.

**Response:**
- Status: `200 OK`
- Body: A single recipe with its ingredients and associated links.

### POST /recipes

Create a new recipe.

**Request Body:**
```json
{
  "name": "Recipe Name",
  "ingredients": ["Ingredient 1", "Ingredient 2"]
}
```

**Response:**
- Status: `201 Created`
- Body: The newly created recipe with its links.

### PUT /recipes/:id

Update an existing recipe by ID.

**Path Parameters:**
- `id`: The ID of the recipe.

**Request Body:**
```json
{
  "name": "Updated Recipe Name",
  "ingredients": ["Updated Ingredient 1", "Updated Ingredient 2"]
}
```

**Response:**
- Status: `200 OK`
- Body: The updated recipe with its links.

### PATCH /recipes/:id

Partially update an existing recipe by ID.

**Path Parameters:**
- `id`: The ID of the recipe.

**Request Body (optional):**
```json
{
  "name": "Partial Update Name",
  "ingredients": ["Ingredient 1", "Ingredient 2"]
}
```

**Response:**
- Status: `200 OK`
- Body: The updated recipe with its links.

### DELETE /recipes/:id

Delete a recipe by ID.

**Path Parameters:**
- `id`: The ID of the recipe.

**Response:**
- Status: `200 OK`
- Body: A message indicating the recipe has been deleted.

---

## Ingredients Routes

### GET /ingredients

Fetch all ingredients.

**Response:**
- Status: `200 OK`
- Body: An array of ingredients with associated links.

### GET /ingredients/:ingid

Fetch a specific ingredient by ID.

**Path Parameters:**
- `ingid`: The ID of the ingredient.

**Response:**
- Status: `200 OK`
- Body: A single ingredient with its details and links.

### POST /ingredients

Create a new ingredient.

**Request Body:**
```json
{
  "name": "Ingredient Name",
  "nutrition": { "calories": 50, "protein": 3 }
}
```

**Response:**
- Status: `201 Created`
- Body: The newly created ingredient with its links.

### PUT /ingredients/:id

Update an existing ingredient by ID.

**Path Parameters:**
- `id`: The ID of the ingredient.

**Request Body:**
```json
{
  "name": "Updated Ingredient Name",
  "quantity": 10,
  "unit": "kg",
  "nutrition": { "calories": 60, "protein": 4 },
  "recipes": ["Recipe 1", "Recipe 2"]
}
```

**Response:**
- Status: `200 OK`
- Body: The updated ingredient with its links.

### PATCH /ingredients/:id

Partially update an existing ingredient by ID.

**Path Parameters:**
- `id`: The ID of the ingredient.

**Request Body (optional):**
```json
{
  "name": "Partial Update Ingredient Name",
  "nutrition": { "calories": 55 }
}
```

**Response:**
- Status: `200 OK`
- Body: The updated ingredient with its links.

### DELETE /ingredients/:id

Delete an ingredient by ID.

**Path Parameters:**
- `id`: The ID of the ingredient.

**Response:**
- Status: `200 OK`
- Body: A message indicating the ingredient has been deleted.

---

## Links

Each response includes `links` for related actions (self, update, delete, etc.), providing clients with a hypermedia-driven API.
