import mongoose from 'mongoose'

const problemSchema = mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Problems = mongoose.model('Problem', problemSchema)

export default Problems
