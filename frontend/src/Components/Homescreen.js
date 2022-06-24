import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'

const Homescreen = () => {
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
        <h1>Display list of problems here</h1>
        {loading ? (
          <Loader />
        ) : (
          problems.map((problem) => (
            <div key={problem._id}>
              <Link to={`/problem/${problem._id}`}>{problem.name}</Link>
            </div>
          ))
        )}
      </Container>
    </>
  )
}

export default Homescreen
