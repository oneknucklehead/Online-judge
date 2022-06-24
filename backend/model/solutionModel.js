import mongoose from 'mongoose'

const solutionSchema = mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    verdict: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Solutions = mongoose.model('Solution', solutionSchema)

export default Solutions
