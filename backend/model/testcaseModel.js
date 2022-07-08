import mongoose from 'mongoose'

const testcaseSchema = mongoose.Schema({
  input: {
    sampleInputs: {
      type: Array,
      default: [],
      required: true,
    },
    testInputs: {
      type: Array,
      default: [],
      required: true,
    },
  },
  output: {
    sampleOutputs: {
      type: Array,
      default: [],
      required: true,
    },
    testOutputs: {
      type: Array,
      default: [],
      required: true,
    },
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Problems',
  },
})

const Testcases = mongoose.model('Testcase', testcaseSchema)

export default Testcases
