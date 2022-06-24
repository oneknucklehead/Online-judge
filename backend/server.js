import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbconfig.js'
import problemRoutes from './routes/problemsRoute.js'
import generateFile from './generateFile.js'
import executeJs from './executeJS.js'
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

app.post('/run', async (req, res) => {
  const { code } = req.body
  console.log('code:' + code)
  if (code === undefined) {
    return res.status(400).json({ success: false, error: 'Empty code body!' })
  }
  try {
    const filepath = await generateFile(code)
    console.log('filepath:' + filepath)
    const output = await executeJs(filepath)
    res.status(201).json({ filepath, output })
  } catch (error) {
    console.error(error)
  }
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.MODE} mode on port ${PORT}`)
)
