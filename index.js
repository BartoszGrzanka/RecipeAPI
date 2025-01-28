import express from 'express'
import cors from 'cors'
import recipesRoutes from './routes/recipes.js'

import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schemas/schemasQL.js'
import resolvers from './resolvers/resolvers.js'

import mongoose from 'mongoose'


const app = express()

const allowedOrigins = ['http://localhost:8989','http://localhost:3000']


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('CORS policy: Not allowed origin'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  allowedHeaders: ['Content-Type', 'X-Requested-With','Accepts'],
}

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/recipeAPI')
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

await server.start()
server.applyMiddleware({ app, path: '/graphql' })

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', recipesRoutes)

await connectDB()
app.listen(8989, () => {
  console.log("Started on 8989")
})