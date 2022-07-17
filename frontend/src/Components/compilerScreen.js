import React, { useState } from 'react'
import AceEditor from 'react-ace'
// import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-javascript'
// import 'ace-builds/src-noconflict/mode-c_cpp'
// import 'ace-builds/src-noconflict/mode-csharp'
// import 'ace-builds/src-noconflict/mode-python'
// import 'ace-builds/src-noconflict/mode-ruby'
// import 'ace-builds/src-noconflict/mode-kotlin'
// import 'ace-builds/src-noconflict/mode-swift'
import qs from 'qs'
import axios from 'axios'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/webpack-resolver'
import './CompilerScreen.css'
import { Row, Col } from 'react-bootstrap'
import Loader from './Loader'

const CompilerScreen = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('java')
  const [output, setOutput] = useState('')
  const [outputLoading, setOutputLoading] = useState(false)

  const handleCompile = async () => {
    console.log({ code, language })
    let dataPost = qs.stringify({
      code: code,
      language: language,
      input: '',
    })
    setOutputLoading(true)
    const { data } = await axios.post(
      'http://localhost:5000/api/compile',
      dataPost
    )
    console.log(data)
    setOutput({ ...data })
    setOutputLoading(false)
  }
  return (
    <>
      <Row>
        <Col md={9} className='my-4'>
          <AceEditor
            className='editor-text-area'
            mode='javascript'
            theme='solarized_light'
            onChange={(e) => {
              setCode(e)
            }}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              fontSize: 20,
              showPrintMargin: false,
            }}
            value={code}
          />
        </Col>
        <Col md={3}>
          <div className='output-container'>
            <h3>Output</h3>
            <div className='output-area'>
              {outputLoading ? <Loader /> : output && output.output}
            </div>
            <div className='btn-container'>
              <select
                name='language'
                id='language'
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                }}
              >
                <option value='js'>Javascript</option>
                <option value='java'>Java</option>
              </select>
              <button onClick={handleCompile}>
                {outputLoading ? 'Compiling...' : 'Compile'}
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default CompilerScreen
