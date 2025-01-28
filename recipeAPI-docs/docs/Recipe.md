### Endpoints for Recipes

### 1.  GET /api/recipes

Retrieve a list of all recipes stored in the database.

### Request

GET /api/recipes


### Response

``` 200 OK ``` : Returns an array of recipes, each with relevant details and links for self, update, replace, delete, and all recipes.

Example Response:

``` json
[
  {
    "id": "1",
    "name": "Chicken Salad",
    "description": "A healthy chicken salad.",
    "ingredients": [
      {"name": "Chicken", "quantity": "200g"},
      {"name": "Lettuce", "quantity": "100g"}
    ],
    "instructions": "Mix the chicken and lettuce.",
    "cookingTime": "15 minutes",
    "category": "Salad",
    "links": [
      {"rel": "self", "method": "GET", "href": "/api/recipes/1"},
      {"rel": "update", "method": "PATCH", "href": "/api/recipes/1"},
      {"rel": "replace", "method": "PUT", "href": "/api/recipes/1"},
      {"rel": "delete", "method": "DELETE", "href": "/api/recipes/1"},
      {"rel": "all", "method": "GET", "href": "/api/recipes"}
    ]
  }
]
``` 


### 2. GET /api/recipes/:_id

Retrieve a specific recipe by its unique ID.

### Request

GET /api/recipes/:_id
### Response

``` 200 OK ``` : Returns the recipe details with links to self, update, replace, delete, and all recipes.

``` 404 Not Found ``` : If no recipe is found with the specified ID.

Example Response:

``` json
{
  "id": "1",
  "name": "Chicken Salad",
  "description": "A healthy chicken salad.",
  "ingredients": [
    {"name": "Chicken", "quantity": "200g"},
    {"name": "Lettuce", "quantity": "100g"}
  ],
  "instructions": "Mix the chicken and lettuce.",
  "cookingTime": "15 minutes",
  "category": "Salad",
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/recipes/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/recipes/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/recipes/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/recipes/1"},
    {"rel": "all", "method": "GET", "href": "/api/recipes"}
  ]
}
``` 

### 3. POST /api/recipes
Create a new recipe.

### Request

POST /api/recipes
### Request Body

``` json
{
  "name": "Chicken Salad",
  "description": "A healthy chicken salad.",
  "ingredients": [
    {"name": "Chicken", "quantity": "200g"},
    {"name": "Lettuce", "quantity": "100g"}
  ],
  "instructions": "Mix the chicken and lettuce.",
  "cookingTime": "15 minutes",
  "category": "Salad"
}
```

### Response

``` 201 Created ``` : Returns the newly created recipe details with links for self, update, replace, delete, and all recipes.

Example Response:

``` json
{
  "id": "1",
  "name": "Chicken Salad",
  "description": "A healthy chicken salad.",
  "ingredients": [
    {"name": "Chicken", "quantity": "200g"},
    {"name": "Lettuce", "quantity": "100g"}
  ],
  "instructions": "Mix the chicken and lettuce.",
  "cookingTime": "15 minutes",
  "category": "Salad",
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/recipes/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/recipes/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/recipes/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/recipes/1"},
    {"rel": "all", "method": "GET", "href": "/api/recipes"}
  ]
}
```

### 4. PUT /api/recipes/:_id
Update an existing recipe by its unique ID.

### Request

PUT /api/recipes/:_id
### Request Body

``` json
{
  "name": "Updated Chicken Salad",
  "description": "An updated chicken salad.",
  "ingredients": [
    {"name": "Chicken", "quantity": "250g"},
    {"name": "Lettuce", "quantity": "100g"}
  ],
  "instructions": "Mix the chicken and lettuce with dressing.",
  "cookingTime": "20 minutes",
  "category": "Salad"
}

```
### Response

``` 200 OK ``` : Returns the updated recipe details with links for self, update, replace, delete, and all recipes.

``` 404 Not Found ``` : If no recipe is found with the specified ID.

Example Response:

``` json
{
  "id": "1",
  "name": "Updated Chicken Salad",
  "description": "An updated chicken salad.",
  "ingredients": [
    {"name": "Chicken", "quantity": "250g"},
    {"name": "Lettuce", "quantity": "100g"}
  ],
  "instructions": "Mix the chicken and lettuce with dressing.",
  "cookingTime": "20 minutes",
  "category": "Salad",
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/recipes/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/recipes/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/recipes/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/recipes/1"},
    {"rel": "all", "method": "GET", "href": "/api/recipes"}
  ]
}
``` 

### 5. DELETE /api/recipes/:_id
Delete a recipe by its unique ID.

### Request

DELETE /api/recipes/:_id
### Response

``` 200 OK ```: Returns a success message.

``` 404 Not Found ```: If no recipe is found with the specified ID.

Example Response:

``` json
{
  "message": "Recipe deleted successfully",
  "links": [
    {"rel": "all", "method": "GET", "href": "/api/recipes"}
  ]
}
```
### Note: The examples above include the appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE) for the operations on the `/api/nutritions` endpoint. ###
