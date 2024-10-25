import express from 'express'
import recipesRoutes from './routes/recipes.js'

const app = express()

app.use(express.json())
app.use('/api', recipesRoutes)


app.listen(8989, () => {
    console.log("Started on 8989")
})
