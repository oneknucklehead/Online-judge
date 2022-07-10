import express from 'express'
import Problems from '../model/problemModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const problems = await Problems.find({})
    res.send(problems)
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const problem = await Problems.findById(req.params.id)
    if (problem) res.send(problem)
    else res.status(404).json({ message: 'no problems found' })
  })
)

export default router
