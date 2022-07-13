import React, { useEffect, useState } from 'react'
import { Badge, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import './JudgeScreen.css'

const JudgeScreen = () => {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true)
      const { data } = await axios.get('http://localhost:5000/api/problems')
      setProblems(data)
      setLoading(false)
    }
    fetchProblems()
  }, [])
  return (
    <>
      <Container>
        <h3 style={{ textAlign: 'center' }}>Problems</h3>

        {loading ? (
          <Loader />
        ) : (
          problems.map((problem) => (
            <ListGroup.Item key={problem._id}>
              <Row className='justify-content-center'>
                <Col className='probContainer' md='4'>
                  <Link
                    to={`/problem/${problem._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <span className='probName'>{problem.name}</span>
                  </Link>
                </Col>
                <Col className='my-3' md='4'>
                  <Badge
                    bg={
                      problem.difficulty == 'hard'
                        ? 'primary'
                        : problem.difficulty == 'medium'
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {problem.difficulty}
                  </Badge>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        )}
      </Container>
    </>
  )
}

export default JudgeScreen
