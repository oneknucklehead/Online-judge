import React from 'react'
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './HomeScreen.css'
const HomeScreen = () => {
  return (
    <>
      <div className='hero-container sketchy'>
        <h1>
          Welcome to <span>Piler</span>.
        </h1>
        <p>
          <span className='fancy'>Online</span>-
          <span className='fancy'>Judge</span> x{' '}
          <span className='fancy'>Compiler</span>
        </p>
        <div className='btn-container'>
          <button className='btn1'>
            <Link
              to='/compiler'
              style={{ textDecoration: 'none', color: '#455a64' }}
            >
              Compiler <FiArrowUpRight />
            </Link>
          </button>
          <button className='btn2'>
            <Link to='/judge' style={{ textDecoration: 'none', color: '#fff' }}>
              Online-judge <FiArrowDownRight />
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default HomeScreen
