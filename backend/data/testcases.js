const testcases = [
  {
    input: {
      1: null,
      2: 0,
    },
    output: [0, 0],
  },
  {
    input: {
      1: [],
      2: 0,
    },
    output: [0, 0],
  },
  {
    input: {
      1: [1, 0, -1],
      2: -1,
    },
    output: [1, 2],
  },
  {
    input: {
      1: [2, 7, 11, 15],
      2: 9,
    },
    output: [0, 1],
  },
]

export default testcases
