import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { BsFillCaretRightFill } from 'react-icons/bs'
import Loader from './Loader'
import qs from 'qs'
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
import { FcHighPriority, FcOk } from 'react-icons/fc'

import './ProblemScreen.css'

const ProblemScreen = ({ match }) => {
  const [problem, setProblem] = useState({})
  const [loading, setLoading] = useState(false)
  const [outputLoading, setOutputLoading] = useState(false)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('js')
  const [output, setOutput] = useState('')

  const handleRun = async () => {
    let dataPost = qs.stringify({
      code: code,
      language: language,
      problemId: match.params.id,
      // input: input,
    })
    setOutputLoading(true)
    const { data } = await axios.post(
      'http://localhost:5000/api/test/run',
      dataPost
    )
    console.log(data)

    setOutput({ ...data })
    setOutputLoading(false)
  }

  const handleSubmit = async () => {
    let dataPost = qs.stringify({
      code: code,
      language: language,
      problemId: match.params.id,
      // input: input,
    })
    setOutputLoading(true)
    const { data } = await axios.post(
      'http://localhost:5000/api/test/submit',
      dataPost
    )
    console.log(data)
    setOutput({ ...data })
    setOutputLoading(false)
  }

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:5000/api/problems/${match.params.id}`
      )
      setProblem(data)
      setCode(`${data.code}`)
      setLoading(false)
    }
    fetchProblem()
  }, [match])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row style={{ marginLeft: 0, marginRight: 0 }}>
          <Col
            md={6}
            // style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className='problem-container'>
              {/* <ListGroup variant='flush'> */}
              <ListGroup.Item>
                <div className='problem-title'>{problem.name}</div>
              </ListGroup.Item>
              <ListGroup.Item>{problem.statement}</ListGroup.Item>
              <ListGroup.Item>
                Difficulty:{' '}
                <Badge
                  bg={
                    problem.difficulty === 'hard'
                      ? 'primary'
                      : problem.difficulty === 'medium'
                      ? 'warning'
                      : 'success'
                  }
                >
                  {problem.difficulty}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                {problem?.examples?.map((example, idx) => (
                  <div key={idx}>
                    <div className='example-header'>Example {idx + 1}:</div>
                    <div className='example-container'>
                      <div>
                        <p>Input: </p>
                        <span>{example.Input}</span>
                      </div>
                      <div>
                        <p>Output: </p>
                        <span>{example.Output}</span>
                      </div>
                      {example.Explanation && (
                        <div>
                          <p>Explanation: </p>
                          <span>{example.Explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ListGroup.Item>
              {/* </ListGroup> */}
            </div>
          </Col>
          <Col md={6}>
            <Row>
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
            </Row>
            {outputLoading ? (
              <Loader />
            ) : (
              output && (
                <div className='output-container'>
                  <Row>
                    <Col md={2} className='my-auto'>
                      Test passed:
                    </Col>
                    <Col>
                      {output &&
                        output?.testpassed?.map((test, idx) => (
                          <Col key={idx}>
                            {idx + 1}
                            {test === true ? <FcOk /> : <FcHighPriority />}
                          </Col>
                        ))}
                    </Col>
                  </Row>
                  <Row className='my-2'>
                    <Col md={2} sm={2} className='my-auto'>
                      Your Input:
                    </Col>
                    <Col>
                      <div className='scroll'>
                        {outputLoading && <Loader />}
                        {output &&
                          output.yourInput.map((input, idx) => (
                            <p key={idx} style={{ margin: 0 }}>
                              {JSON.stringify(input)}
                            </p>
                          ))}
                      </div>
                    </Col>
                  </Row>
                  <Row className='my-2'>
                    <Col md={2} sm={2} className='my-auto'>
                      Output:
                    </Col>
                    <Col>
                      <div className='scroll'>
                        {outputLoading && <Loader />}
                        {output &&
                          output.yourOutput.map((input, idx) => (
                            <p key={idx} style={{ margin: 0 }}>
                              {input}
                            </p>
                          ))}
                      </div>
                    </Col>
                  </Row>
                  <Row className='my-2'>
                    <Col md={2} sm={2} className='my-auto'>
                      Expected:
                    </Col>
                    <Col>
                      <div className='scroll'>
                        {outputLoading && <Loader />}
                        {output &&
                          output.expected.map((input, idx) => (
                            <p key={idx} style={{ margin: 0 }}>
                              {JSON.stringify(input)}
                            </p>
                          ))}
                      </div>
                    </Col>
                  </Row>
                </div>
              )
            )}
            <div className='options-wrapper'>
              <span className='select-container'>
                <label htmlFor='language'>Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value='js'>JavaScript</option>
                </select>
              </span>
              <span className='button-container'>
                <button className='outlined' onClick={() => handleRun()}>
                  <BsFillCaretRightFill />
                  Run
                </button>
                <button className='not-outlined' onClick={() => handleSubmit()}>
                  Submit
                </button>
              </span>
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProblemScreen
