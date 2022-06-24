import mongoose from 'mongoose'

const testcaseSchema = mongoose.Schema({
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
