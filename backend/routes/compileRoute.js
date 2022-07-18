import express from 'express'
import asyncHandler from 'express-async-handler'
import execute from '../utils/compile.js'
import createFile from '../utils/generateFile.js'
import removeFile from '../utils/removeFile.js'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { language, code, input } = req.body
    const filename = createFile(language, code, '', 'compile')
    const result = await execute(filename, input, language)
    const removedFile = removeFile(filename)
    res.send({ ...result, removed: removedFile })
  })
)

export default router
