import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/dbconfig.js'
import problemRoutes from './routes/problemsRoute.js'
import cors from 'cors'
import generateFile from './utils/generateFile.js'
import executeJavascript from './utils/executeJavascript.js'
import removeFile from './utils/removeFile.js'
import Testcases from './model/testcaseModel.js'
import Problems from './model/problemModel.js'
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
  let output = {}
  let input = ''
  //input will be my testcases input

  // let input = ''
  const languageSupp = ['js']

  const { language, code, problemId } = req.body
  //check for test cases
  const testcases = await Testcases.find({ problem: problemId })
  const problem = await Problems.findById(problemId)

  if (code === undefined || code.trim() === '') {
    output = 'Enter a valid code to be executed'
  }
  if (!languageSupp.includes(language)) {
    output = `Language ${language} not supported`
  }
  const fileName = generateFile(language, code)
  console.log(fileName)
  let testpassed = []
  const len = testcases[0]?.input.testInputs.length
  let k = 0
  const { twoSum } = await import(`./codes/${fileName}`)
  for (let i = 0; i < len; i += problem.numberOfInputs) {
    input = testcases[0]?.input?.testInputs.splice(0, problem.numberOfInputs)
    const output = JSON.stringify(twoSum(...input))
    const answer =
      output.localeCompare(
        JSON.stringify(testcases[0]?.output.testOutputs[k])
      ) === 0
    testpassed.push(answer)
    k++
    // import(`./codes/${fileName}`).then((f) => {
    //   input = testcases[0]?.input?.testInputs.splice(0, problem.numberOfInputs)
    //   console.log('result: _____________________________')
    //   console.log(
    //     JSON.stringify(f.default(...input)).localeCompare(
    //       JSON.stringify(testcases[0]?.output.testOutputs[k])
    //     ) === 0
    //   )
    //   answer =
    //     JSON.stringify(f.default(...input)).localeCompare(
    //       JSON.stringify(testcases[0]?.output.testOutputs[k])
    //     ) === 0
    //   console.log('answer: ', answer)
    //   testpassed[k] = answer
    //   console.log('op: ' + f.default(...input))
    //   console.log('test op: ' + testcases[0]?.output.testOutputs[k])
    //   k++
    // })
  }
  console.log('testpassed: ' + testpassed)

  // testcases[0]?.output.testOutputs.forEach((testOutput) => {
  //   // if (testOutput == outputs[0]) {
  //   //   testcasesPassed.push(true)
  //   //   outputs.shift()
  //   // }
  //   console.log('testOP: ' + testOutput)
  // })
  // console.log(typeof input)
  // console.log(...input)

  // const { language, code } = req.body
  // console.log(output)
  // const removedFileResult = removeFile(fileName)
  // console.log(removedFileResult)
  res.send(output)
})

app.use('/api/problems', problemRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`server running in ${process.env.MODE} mode on port ${PORT}`)
)
