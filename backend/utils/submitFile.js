import generateFile from './generateFile.js'
import removeFile from './removeFile.js'

const submitFile = async (language, code, problem, testcases) => {
  //generation of the file

  const fileName = generateFile(language, code, problem.functionName)
  //   console.log(fileName)
  let testpassed = []
  let yourOutput = []
  const len = testcases[0]?.input.testInputs.length
  let k = 0

  //importing the generated file and then executing with test outputs
  const testfunc = await import(`../codes/${fileName}`)
  let toTestInputs = testcases[0]?.input?.testInputs
  try {
    for (let i = 0; i < len; i += problem.numberOfInputs) {
      let input = toTestInputs.splice(0, problem.numberOfInputs)
      let output = ''
      output = JSON.stringify(testfunc.default(...input))

      yourOutput.push(output)
      const answer =
        output.localeCompare(
          JSON.stringify(testcases[0]?.output.testOutputs[k])
        ) === 0
      testpassed.push(answer)
      k++
    }
  } catch (err) {
    return {
      ...err,
    }
  }

  //removing the generated file
  const removedFileResult = removeFile(fileName)
  return {
    generated: {
      filePath: fileName,
    },
    removed: {
      removedFileResult,
    },
    yourOutput,
    testpassed,
  }
}

export { submitFile }
