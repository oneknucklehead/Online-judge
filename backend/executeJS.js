import { exec } from 'child_process'

const executeJs = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(`node ${filepath}`, (error, stdout, stderr) => {
      error && reject({ error, stderr })
      stderr && reject(stderr)
      resolve(stdout)
    })
  })
}

export default executeJs
