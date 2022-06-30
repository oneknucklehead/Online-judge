import { spawn } from 'child_process'
import path from 'path'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const javascriptRunner = async (fileLocation, input) => {
  //write execute functionality
  try {
    const output = await new Promise((resolve, reject) => {
      // const execJS = spawn('node', [
      //   `${path.join(__dirname, '..', 'codes', `${fileLocation}`)}`,
      // ])
      const execJS = spawn('node', [
        `${path.join(__dirname, '..', 'codes', fileLocation)}`,
      ])
      if (input) {
        output.stdin.write(input)
        output.stdin.end()
      }
      let outputReceived = ''
      let errorReceived = ''
      execJS.stdin.on('error', (...args) => {
        console.log(`stdin err: ${args}`)
      })
      execJS.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        outputReceived += data.toString()
        console.log(`outputReceived: ${outputReceived} `)
      })
      execJS.stderr.on('data', (data) => {
        errorReceived += data.toString()
        console.log(`errorReceived: ${errorReceived}`)
      })
      execJS.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
      })

      execJS.on('exit', () => {
        if (errorReceived) reject(errorReceived)
        resolve(outputReceived)
      })
      setTimeout(() => {
        reject(`Time Limit exceeded! (10s)`)
      }, 10000)
    })
    return {
      execSuccess: true,
      timestamp: new Date(),
      language: 'js',
      output,
    }
  } catch (error) {
    return {
      execSuccess: false,
      timestamp: new Date(),
      language: 'js',
      error,
    }
  }

  // const output = spawn('node',[`${path.join(__dirname,"..","codes",`${fileLocation}`)}`])
  // output.stdout.on('data', (data) => {
  //   console.log(data.toString())
  // });
  // output.stderr.on('data', (data) => {
  //   console.log(`error: ${data}`)
  // });
  // output.on('close', (code) => {
  //   if (code !== 0) {
  //     console.log(`Process exited with code ${code}`
  //   }
  // })
}

const executeJavascript = async (fileLocation, input) => {
  return await javascriptRunner(fileLocation, input)
}

export default executeJavascript
