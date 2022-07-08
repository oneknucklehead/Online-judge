import path from 'path'
import fs from 'fs'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const removeFile = (fileLocation) => {
  try {
    fs.rmSync(path.join(__dirname, '..', 'codes', fileLocation))
    console.log(
      'removed ' + `${path.join(__dirname, '..', 'codes', fileLocation)}`
    )
    return {
      removeSuccess: true,

      path: `${path.join(__dirname, '..', 'codes', fileLocation)}`,
    }
  } catch (err) {
    return {
      removeSuccess: false,
      error: err,
    }
  }
}
export default removeFile
