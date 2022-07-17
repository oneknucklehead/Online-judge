import { spawn } from 'child_process'
import path from 'path'
// import { v4 as uuid } from 'uuid'
// import fs from 'fs'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const compileCode = async (filePath, input) => {
  try {
    const output = await new Promise((resolve, reject) => {
      // const compileRes = spawn('node', [
      //   `${path.join(__dirname, '..', 'codes', filePath)}`,
      // ])

      JAVA
      const compileRes = spawn('java', [
        '-Dfile.encoding=UTF-8',
        `${path.join(__dirname, `..`, `codes`, filePath)}`,
      ])
      // const compileRes = spawn('python3', [
      //   `${path.join(__dirname, `..`, `codes`, filePath)}`,
      // ])

      let result = ''
      let fault = ''
      if (input) {
        compileRes.stdin.write(input)
        compileRes.stdin.end()
      }
      compileRes.stdin.on('error', (...args) => {
        console.log('STD input error : ' + args)
      })
      compileRes.stdout.on('data', (data) => {
        result += data.toString()
      })
      compileRes.stderr.on('data', (data) => {
        fault += data.toString()
      })
      compileRes.on('exit', (code, signal) => {
        if (code) console.log(`Process exited with code : ${code}`)
        if (signal) console.log(`Process killed with signal : ${signal}`)
        if (fault) reject(fault)
        resolve(result)
      })
      setTimeout(() => {
        reject('Error: TLE; took too long to execute : 10s')
      }, 10000)
    })
    return {
      compileSuccess: true,
      output,
      timestamp: new Date(),
      language: 'js',
    }
  } catch (err) {
    return {
      compileSuccess: false,
      err,
      timestamp: new Date(),
      language: 'js',
    }
  }
}

const execJS = async (filePath, input) => {
  return await compileCode(filePath, input)
}

export default execJS
