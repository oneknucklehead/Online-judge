import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbconfig.js'
import problemRoutes from './routes/problemsRoute.js'
import cors from 'cors'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use('/api/problems', problemRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.MODE} mode on port ${PORT}`)
)
