import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authroutes.js'
import categoryRoutes from './routes/categoryroutes.js'
import cors from 'cors'
import productRoutes from './routes/productroutes.js'

// rest object
const app = express()


// configure env
// dotenv.config({path: "./.env"})
dotenv.config()

// connect to DB
connectDB()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

const PORT = process.env.PORT || 7000

app.get("/", (req, res) => {
    res.json({ success: true, msg: "Hello World!" })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`.bgCyan.white)
})