import express from 'express'
import cors from 'cors'
import recipesRoutes from './routes/recipes.js'

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

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', recipesRoutes)
app.listen(8989, () => {
  console.log("Started on 8989")
})