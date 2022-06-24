import fs from 'fs'
import path from 'path'
import * as url from 'url'
import { v4 as uuid } from 'uuid'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const dirCodes = path.join(__dirname, 'codes')

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true })
}

const generateFile = async (content) => {
  const jobId = uuid()
  const filename = `${jobId}.js`
  const filepath = path.join(dirCodes, filename)
  await fs.writeFileSync(filepath, content)
  return filepath
}

export default generateFile
