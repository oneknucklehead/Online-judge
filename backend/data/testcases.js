const testcases = [
  {
    input: {
      sampleInputs: [
        [2, 7, 11, 15],
        9,
        [3, 3],
        6,
        [3, 2, 4],
        6,
        // 'nums = [2,7,11,15], target = 9',
        // 'nums = [3,2,4], target = 6',
        // 'nums = [3,3], target = 6',
      ],
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
        // 'nums = null, target = 0',
        // 'nums = [], target = 0',
        // 'nums = [1,0,-1], target = -1',
        // 'nums = [2,7,11,15], target = 9',
        // 'nums = [1,2,3,4,5,6,7,8,9,10], target = 19',
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
]

export default testcases
