# Recipe API Documentation

Welcome to the **Recipe API** documentation. This API is designed to store recipes, ingredients, and their nutritional values. It follows the **REST** architecture style, making it simple and easy to integrate into your applications.

## API Overview

The Recipe API allows you to:

- Create, read, update, override, and delete recipes.
- Manage ingredients and their nutritional data.
- Retrieve nutritional information for each recipe.

This API is built with **Express.js** and **MongoDB** and provides endpoints that allow interaction with the data in a RESTful way.

## Authentication

This API does not require authentication for basic operations. However, for sensitive actions (e.g., modifying recipes or ingredients), you may implement an authentication mechanism as needed.

## Base URL

All the API endpoints are accessible via the following base URL:

http://localhost:8989/api
