import Problem from './model/problemModel.js'
import connectDB from './config/dbconfig.js'
import dotenv from 'dotenv'
import problems from './data/problems.js'
import Solutions from './model/solutionModel.js'
import Testcases from './model/testcaseModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Problem.deleteMany()

    await Problem.insertMany(problems)
    console.log('Data imported successfully!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Problem.deleteMany()
    await Solutions.deleteMany()
    await Testcases.deleteMany()

    console.log('Data destroyed successfully XXX')
    process.exit()
  } catch (error) {
    console.error(`error: ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
