import express from 'express'
import asyncHandler from 'express-async-handler'

import Testcases from '../model/testcaseModel.js'
import Problems from '../model/problemModel.js'
import { runFile } from '../utils/runFile.js'
import { submitFile } from '../utils/submitFile.js'

const router = express.Router()

router.post(
  '/run',
  asyncHandler(async (req, res) => {
    let output = {}
    //input will be my testcases input

    const languageSupp = ['js']
    const { language, code, problemId } = req.body

    //check for test cases
    const testcases = await Testcases.find({ problem: problemId })
    const problem = await Problems.findById(problemId)
    const deepcopyInput =
      testcases && JSON.parse(JSON.stringify(testcases[0]?.input.sampleInputs))
    const deepcopyOutput =
      testcases &&
      JSON.parse(JSON.stringify(testcases[0]?.output.sampleOutputs))
    if (code === undefined || code.trim() === '') {
      output = 'Enter a valid code to be executed'
    }
    if (!languageSupp.includes(language)) {
      output = `Language ${language} not supported`
    } else {
      output = await runFile(language, code, problem, testcases)
    }

    if (output)
      res.send({
        ...output,
        yourInput: deepcopyInput,
        expected: deepcopyOutput,
      })
    else {
      res.status(404).send({
        message: 'output could not be generated, please recheck your code',
      })
    }
  })
)

router.post(
  '/submit',
  asyncHandler(async (req, res) => {
    let output = {}
    //input will be my testcases input

    const languageSupp = ['js']
    const { language, code, problemId } = req.body
    //check for test cases
    const testcases = await Testcases.find({ problem: problemId })
    const problem = await Problems.findById(problemId)

    const deepcopyInput =
      testcases && JSON.parse(JSON.stringify(testcases[0]?.input.testInputs))
    const deepcopyOutput =
      testcases && JSON.parse(JSON.stringify(testcases[0]?.output.testOutputs))
    if (code === undefined || code.trim() === '') {
      output = 'Enter a valid code to be executed'
    }
    if (!languageSupp.includes(language)) {
      output = `Language ${language} not supported`
    } else {
      output = await submitFile(language, code, problem, testcases)
    }

    if (output)
      res.send({
        ...output,
        yourInput: deepcopyInput,
        expected: deepcopyOutput,
      })
    else {
      res.status(404).send({
        message: 'output could not be generated, please recheck your code',
      })
    }
  })
)

export default router
