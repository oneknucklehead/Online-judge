import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { BsFillCaretRightFill } from 'react-icons/bs'
import Loader from './Loader'
import qs from 'qs'
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
        <>
          <Row className='my-3'>
            <Col md={6}>
              <ListGroup variant='flush'>
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
              </ListGroup>
            </Col>
            <Col md={6}>
              <label htmlFor='language'>Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value='js'>JavaScript</option>
              </select>
              <Row>
                <textarea
                  className='code-area'
                  rows='20'
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                  }}
                ></textarea>
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
              <div className='button-container'>
                <button className='outlined' onClick={() => handleRun()}>
                  <BsFillCaretRightFill />
                  Run
                </button>
                <button className='not-outlined' onClick={() => handleSubmit()}>
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProblemScreen
