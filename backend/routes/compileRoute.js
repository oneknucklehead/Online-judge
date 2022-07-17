import express from 'express'
import asyncHandler from 'express-async-handler'
import execJS from '../utils/compile.js'
import createFile from '../utils/generateFile.js'
import removeFile from '../utils/removeFile.js'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { language = 'js', code, input } = req.body
    const filename = createFile(language, code, '', 'compile')
    const result = await execJS(filename, input)
    const removedFile = removeFile(filename)
    res.send({ ...result, removed: removedFile })
  })
)

export default router
