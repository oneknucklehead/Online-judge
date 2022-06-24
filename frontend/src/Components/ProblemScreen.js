import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Loader from './Loader'

const ProblemScreen = ({ match }) => {
  const [problem, setProblem] = useState({})
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  // const [payload, setPayload] = useState({})
  // const [output, setOutput] = useState('')

  const handleSubmit = async () => {
    // setPayload({
    //   code,
    // })
    const { data } = await axios.post('http://localhost:5000/run', { code })
    // console.log('data:' + data)
  }

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:5000/api/problems/${match.params.id}`
      )
      setProblem(data)
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
              <h3>{problem.name}</h3>
              <p>{problem.statement}</p>
              <p>Difficulty: {problem.difficulty}</p>
            </Col>
            <Col className='md-6'>
              <select>
                <option>javascript</option>
                <option>java</option>
              </select>

              <textarea
                rows='20'
                cols='75'
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                }}
              ></textarea>
              <br />
              <button onClick={() => handleSubmit()}>Submit</button>
              {/* <p>{status}</p>
      <p>{jobId ? `Job ID: ${jobId}` : ""}</p>
      <p>{renderTimeDetails()}</p> */}
              <p>{problem.code}</p>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProblemScreen
