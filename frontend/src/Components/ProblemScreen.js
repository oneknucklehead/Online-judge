import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import Loader from './Loader'
import qs from 'qs'

const ProblemScreen = ({ match }) => {
  const [problem, setProblem] = useState({})
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  // const [payload, setPayload] = useState({})
  // const [output, setOutput] = useState('')

  const handleSubmit = async () => {
    let data = qs.stringify({
      code: 'import java.util.Scanner;\npublic class MatSym {\n    public static void main(String[]args) {\n       Scanner in = new Scanner(System.in);\nSystem.out.println(in.nextLine());\nSystem.out.println(in.nextLine());\n    }\n}',
      language: 'java',
      input: 'Hello\nWorld',
    })
    const response = await axios.post('https://codex-api.herokuapp.com/', data)
    console.log(JSON.stringify(response.data.output))
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
              <select>
                <option>python</option>
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
              <p>{problem.code}</p>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProblemScreen
