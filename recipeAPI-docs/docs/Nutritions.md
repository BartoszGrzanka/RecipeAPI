### Endpoints for Nutritions ###

### 1.  GET /api/nutritions ###

Retrieve a list of all nutrition records stored in the database.

#### Request

GET /api/nutritions

#### Response

``` 200 OK ``` : Returns an array of nutrition records, each with relevant details and links for self, update, replace, delete, and all nutrition records.

Example Response:

```json
[
  {
    "id": "1",
    "calories": 250,
    "protein": 30,
    "fat": 5,
    "carbohydrates": 20,
    "links": [
      {"rel": "self", "method": "GET", "href": "/api/nutritions/1"},
      {"rel": "update", "method": "PATCH", "href": "/api/nutritions/1"},
      {"rel": "replace", "method": "PUT", "href": "/api/nutritions/1"},
      {"rel": "delete", "method": "DELETE", "href": "/api/nutritions/1"},
      {"rel": "all", "method": "GET", "href": "/api/nutritions"}
    ]
  }
]
```

### 2. GET /api/nutritions/:_id ###

Retrieve a specific nutrition record by its unique ID.

#### Request

GET /api/nutritions/:_id

#### Response

``` 200 OK``` : Returns the nutrition details with links to self, update, replace, delete, and all nutrition records.

``` 404 Not Found``` : If no nutrition record is found with the specified ID.

Example Response:

```json
{
  "id": "1",
  "calories": 250,
  "protein": 30,
  "fat": 5,
  "carbohydrates": 20,
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/nutritions/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/nutritions/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/nutritions/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/nutritions/1"},
    {"rel": "all", "method": "GET", "href": "/api/nutritions"}
  ]
}
```

### 3. POST /api/nutritions ###

Create a new nutrition record.

#### Request

POST /api/nutritions

#### Request Body

```json
{
  "calories": 250,
  "protein": 30,
  "fat": 5,
  "carbohydrates": 20
}
```

#### Response

``` 201 Created ``` : Returns the newly created nutrition record details with links for self, update, replace, delete, and all nutrition records.

Example Response:

```json
{
  "id": "1",
  "calories": 250,
  "protein": 30,
  "fat": 5,
  "carbohydrates": 20,
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/nutritions/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/nutritions/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/nutritions/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/nutritions/1"},
    {"rel": "all", "method": "GET", "href": "/api/nutritions"}
  ]
}
```

### 4. PUT /api/nutritions/:_id ###

Update an existing nutrition record by its unique ID.

#### Request

PUT /api/nutritions/:_id

#### Request Body

```json
{
  "calories": 300,
  "protein": 40,
  "fat": 10,
  "carbohydrates": 25
}
```

#### Response

``` 200 OK ``` : Returns the updated nutrition record details with links for self, update, replace, delete, and all nutrition records.

``` 404 Not Found ``` : If no nutrition record is found with the specified ID.

Example Response:

```json
{
  "id": "1",
  "calories": 300,
  "protein": 40,
  "fat": 10,
  "carbohydrates": 25,
  "links": [
    {"rel": "self", "method": "GET", "href": "/api/nutritions/1"},
    {"rel": "update", "method": "PATCH", "href": "/api/nutritions/1"},
    {"rel": "replace", "method": "PUT", "href": "/api/nutritions/1"},
    {"rel": "delete", "method": "DELETE", "href": "/api/nutritions/1"},
    {"rel": "all", "method": "GET", "href": "/api/nutritions"}
  ]
}
```

### 5. DELETE /api/nutritions/:_id ###

Delete a nutrition record by its unique ID.

#### Request

DELETE /api/nutritions/:_id

#### Response

``` 200 OK ``` : Returns a success message.

``` 404 Not Found ``` : If no nutrition record is found with the specified ID.

Example Response:

```json
{
  "message": "Nutrition record deleted successfully",
  "links": [
    {"rel": "all", "method": "GET", "href": "/api/nutritions"}
  ]
}
```

### Note: The examples above include the appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE) for the operations on the `/api/nutritions` endpoint. ###
