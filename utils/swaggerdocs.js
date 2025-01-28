import fs from 'fs'
import swaggerJsdoc from 'swagger-jsdoc'

// Twoja konfiguracja Swaggera
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe API',
      version: '1.0.0',
      description: 'API for managing recipes and nutrition data',
    },
  },
  apis: ['./routes/*.js'],  // Ścieżka do Twoich tras z komentarzami Swaggera
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

// Zapisz specyfikację Swaggera do pliku JSON
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerDocs, null, 2))

console.log('Swagger documentation generated at ./swagger.json')
