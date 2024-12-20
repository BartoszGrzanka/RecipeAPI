import express from 'express'
import cors from 'cors'
import recipesRoutes from './routes/recipes.js'

import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schemas/schemas.js'
import resolvers from './resolvers/resolvers.js'

const app = express()

const allowedOrigins = ['http://localhost:8989']


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
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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
app.listen(8989, () => {
  console.log("Started on 8989")
})