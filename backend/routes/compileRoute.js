import express from 'express'
import asyncHandler from 'express-async-handler'
import execJS from '../utils/compile.js'
import createFile from '../utils/generateFile.js'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { language = 'js', code, input } = req.body
    const filename = createFile(language, code, '', 'compile')
    console.log(filename)
    const result = await execJS(filename, input)
    res.send(result)
  })
)

export default router
