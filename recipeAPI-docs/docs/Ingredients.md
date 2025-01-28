### Endpoints for Ingredients ###

### 1.  GET /api/ingredients

Retrieve a list of all ingredients stored in the database.

### Request

GET /api/ingredients

### Response

``` 200 OK ``` : Returns an array of ingredients, each with relevant details and links for self, update, replace, delete, and all ingredients.

Example Response:

```json
[
  {
    "id": "1",
    "name": "Tomato",
    "quantity": "200g",
    "unit": "grams",
    "nutrition": "Rich in vitamins",
    "links": [
      {"rel": "self", "method": "GET", "href": "/api/ingredients/1"},
      {"rel": "update", "method": "PATCH", "href": "/api/ingredients/1"},
      {"rel": "replace", "method": "PUT", "href": "/api/ingredients/1"},
      {"rel": "delete", "method": "DELETE", "href": "/api/ingredients/1"},
      {"rel": "all", "method": "GET", "href": "/api/ingredients"}
    ]
  }
]
```

### 2. GET /api/ingredients/:_id

Retrieve a specific ingredient by its unique ID.

### Request

GET /api/ingredients/:_id

### Response

``` 200 OK``` : Returns the ingredient details with links to self, update, replace, delete, and all ingredients.

``` 404 Not Found``` : If no ingredient is found with the specified ID.

Example Response:

```json
{
  "id": "1",
  "name": "Tomato",
  "quantity": "200g",
  "unit": "grams",
  "nutrition": "Rich in vitamins",
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/ingredients/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/ingredients/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/ingredients/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/ingredients/1"},
    {"rel": "all", "method": "GET", "href": "/api/ingredients"}
  ]
}
```

### 3. POST /api/ingredients

Create a new ingredient.

### Request

POST /api/ingredients

### Request Body

```json
{
  "name": "Tomato",
  "quantity": "200g",
  "unit": "grams",
  "nutrition": "Rich in vitamins"
}
```

### Response

``` 201 Created ``` : Returns the newly created ingredient details with links for self, update, replace, delete, and all ingredients.

Example Response:

```json
{
  "id": "1",
  "name": "Tomato",
  "quantity": "200g",
  "unit": "grams",
  "nutrition": "Rich in vitamins",
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/ingredients/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/ingredients/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/ingredients/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/ingredients/1"},
    {"rel": "all", "method": "GET", "href": "/api/ingredients"}
  ]
}
```

### 4. PUT /api/ingredients/:_id

Update an existing ingredient by its unique ID.

### Request

PUT /api/ingredients/:_id

### Request Body

```json
{
  "name": "Updated Tomato",
  "quantity": "250g",
  "unit": "grams",
  "nutrition": "Rich in vitamins and fiber"
}
```

### Response

``` 200 OK ``` : Returns the updated ingredient details with links for self, update, replace, delete, and all ingredients.

``` 404 Not Found ``` : If no ingredient is found with the specified ID.

Example Response:

```json
{
  "id": "1",
  "name": "Updated Tomato",
  "quantity": "250g",
  "unit": "grams",
  "nutrition": "Rich in vitamins and fiber",
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/ingredients/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/ingredients/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/ingredients/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/ingredients/1"},
    {"rel": "all", "method": "GET", "href": "/api/ingredients"}
  ]
}
```

### 5. DELETE /api/ingredients/:_id

Delete an ingredient by its unique ID.

### Request

DELETE /api/ingredients/:_id

### Response

``` 200 OK ``` : Returns a success message.

``` 404 Not Found ``` : If no ingredient is found with the specified ID.

Example Response:

```json
{
  "message": "Ingredient deleted successfully",
  "links": [
    {"rel": "all", "method": "GET", "href": "/api/ingredients"}
  ]
}
```

### Note: The examples above include the appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE) for the operations on the `/api/ingredients` endpoint.
