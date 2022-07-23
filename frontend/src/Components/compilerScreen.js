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
import Connected from './Connected'
import './CompilerScreen.css'

const CompilerScreen = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('java')
  const [output, setOutput] = useState('')
  const [connectedList, setConnectedList] = useState([
    { socketId: 1, username: 'lappa' },
    { socketId: 2, username: 'lelo' },
    { socketId: 3, username: 'without' },
    { socketId: 4, username: 'lasun' },
  ])
  const [outputLoading, setOutputLoading] = useState(false)
  let languageList = {
    java: 'java',
    javascript: 'js',
    python: 'py',
  }

  const handleCompile = async () => {
    console.log({ code, language })
    let dataPost = qs.stringify({
      code: code,
      language: languageList[language],
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
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col md={2}>
          <div className='aside'>
            <div className='aside-inner'>
              <h5>Connected users:</h5>
              <div className='connected-container'>
                {connectedList.map((connected) => (
                  <Connected
                    key={connected.socketId}
                    username={connected.username}
                  />
                ))}
              </div>
            </div>
            <button className='copy-btn'>Copy Room Id</button>
            <button className='leave-btn'>Leave</button>
          </div>
        </Col>
        <Col
          md={7}
          // style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <AceEditor
            className='editor-text-area'
            mode={language}
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
        <Col md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className='comp-output-container'>
            <h4>Output</h4>
            <div className='output-area'>
              {outputLoading ? (
                <Loader />
              ) : output && output.output ? (
                output.output
              ) : (
                output.err
              )}
            </div>
            <div className='opt-container'>
              {outputLoading}
              <select
                name='language'
                id='language'
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                }}
              >
                <option value='javascript'>Javascript</option>
                <option value='java'>Java</option>
                <option value='python'>Python</option>
              </select>
              <button className='compBtn' onClick={handleCompile}>
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
