import mongoose from 'mongoose'

const testcaseSchema = mongoose.Schema({
  exampleInput: {
    type: String,
    required: true,
  },
  exampleOutput: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
})

const Testcases = mongoose.model('Testcase', testcaseSchema)

export default Testcases
