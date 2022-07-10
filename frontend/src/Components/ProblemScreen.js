import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import Loader from './Loader'
import qs from 'qs'

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
    const { data } = await axios.post(
      'http://localhost:5000/api/test/run',
      dataPost
    )
    console.log(data)
    setOutput({ ...data })
  }

  const handleSubmit = async () => {
    let dataPost = qs.stringify({
      code: code,
      language: language,
      problemId: match.params.id,
      // input: input,
    })
    const { data } = await axios.post(
      'http://localhost:5000/api/test/submit',
      dataPost
    )
    console.log(data)
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
          <Row>
            <Col className='md-6'>
              <ListGroup.Item>{problem.name}</ListGroup.Item>
              <p>{problem.statement}</p>
              <p>
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
              </p>
            </Col>
            <Col className='md-6'>
              <label htmlFor='language'>Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value='js'>JavaScript</option>
                <option value='java'>Java</option>
              </select>

              <textarea
                rows='20'
                cols='75'
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                }}
              ></textarea>
              {outputLoading ? (
                <Loader />
              ) : (
                <>
                  <div>Your Input:</div>
                  <div>
                    {outputLoading && <Loader />}
                    {output && output?.yourInput.toString()}
                  </div>
                  <div>Output:</div>
                  <div>
                    {outputLoading && <Loader />}
                    {output && output?.yourOutput.toString()}
                  </div>
                  <div>Expected:</div>
                  <div>
                    {outputLoading && <Loader />}
                    {output && output?.expected.toString()}
                  </div>
                </>
              )}
              <button onClick={() => handleRun()}>Run</button>
              <button onClick={() => handleSubmit()}>Submit</button>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProblemScreen
