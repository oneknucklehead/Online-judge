const testcases = [
  {
    input: {
      sampleInputs: [[2, 7, 11, 15], 9, [3, 3], 6, [3, 2, 4], 6],
      testInputs: [
        null,
        0,
        [],
        0,
        [1, 0, -1],
        -1,
        [2, 7, 11, 15],
        9,
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        19,
      ],
    },
    output: {
      sampleOutputs: [
        [0, 1],
        [0, 1],
        [1, 2],
      ],
      testOutputs: [
        [0, 0],
        [0, 0],
        [1, 2],
        [0, 1],
        [8, 9],
      ],
    },
  },
  {
    input: {
      sampleInputs: [121, -121, 10],
      testInputs: [3, 9, 0, 44, 161, 898, 123, 3455, 667],
    },
    output: {
      sampleOutputs: [true, false, false],
      testOutputs: [true, true, true, true, true, true, false, false, false],
    },
  },
]

export default testcases
