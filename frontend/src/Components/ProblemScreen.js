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
  const [input, setInput] = useState('')
  // const [payload, setPayload] = useState({})
  const [output, setOutput] = useState('')

  const handleSubmit = async () => {
    // setOutput('')
    // setOutputLoading(true)
    // let data = qs.stringify({
    //   code: code,
    //   language: language,
    //   input: input,
    // })
    // const response = await axios.post('https://codex-api.herokuapp.com/', data)
    // console.log(JSON.stringify(response.data.output))
    // setOutput(JSON.stringify(response.data.output))
    // setOutputLoading(false)

    let dataPost = qs.stringify({
      code: code,
      language: language,
      problemId: match.params.id,
      // input: input,
    })
    const { data } = await axios.post('http://localhost:5000/api/run', dataPost)
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
              <div>Input (if any):</div>
              <textarea
                rows='1'
                cols='75'
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                }}
              ></textarea>
              <div>Output:</div>
              <div>
                {outputLoading && <Loader />}
                {output}
              </div>
              <button onClick={() => handleSubmit()}>Submit</button>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProblemScreen
