import React, { useState } from 'react'
import AceEditor from 'react-ace'
// import 'ace-builds/src-noconflict/theme-dracula'
// import 'ace-builds/src-noconflict/mode-java'
// import 'ace-builds/src-noconflict/mode-javascript'
// import 'ace-builds/src-noconflict/mode-c_cpp'
// import 'ace-builds/src-noconflict/mode-csharp'
// import 'ace-builds/src-noconflict/mode-python'
// import 'ace-builds/src-noconflict/mode-ruby'
// import 'ace-builds/src-noconflict/mode-kotlin'
// import 'ace-builds/src-noconflict/mode-swift'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/webpack-resolver'
import './CompilerScreen.css'
import { Row, Col, Container } from 'react-bootstrap'

const CompilerScreen = () => {
  const [code, setCode] = useState('')
  return (
    <>
      <Row>
        <Col md={9}>
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
          <h3>Output</h3>
          <div>output area</div>
          <button>run</button>
          <button>submit</button>
        </Col>
      </Row>
    </>
  )
}

export default CompilerScreen
