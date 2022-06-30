import path from 'path'
import fs from 'fs'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const removeFile = (fileLocation) => {
  fs.rmSync(path.join(__dirname, '..', 'codes', fileLocation))
  console.log(
    'removed' + `${path.join(__dirname, '..', 'codes', fileLocation)}`
  )
  return {
    removeSuccess: true,
  }
}
export default removeFile
