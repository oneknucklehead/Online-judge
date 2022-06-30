import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbconfig.js'
import problemRoutes from './routes/problemsRoute.js'
import cors from 'cors'
import generateFile from './utils/generateFile.js'
import executeJavascript from './utils/executeJavascript.js'
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

app.post('/api/run', async (req, res) => {
  let output = ''
  //input will be my testcases input
  let input = ''
  const languageSupp = ['js']

  const { language, code } = req.body
  if (code === undefined || code.trim() === '') {
    output = 'Enter a valid code to be executed'
  }
  if (!languageSupp.includes(language)) {
    output = `Language ${language} not supported`
  }
  console.log(language + ' ' + code)
  const fileName = generateFile(language, code)
  console.log(fileName)
  output = await executeJavascript(fileName, input)
  // const { language, code } = req.body
  res.send(output)
})

app.use('/api/problems', problemRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.MODE} mode on port ${PORT}`)
)
