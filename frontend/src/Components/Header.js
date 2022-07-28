import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaHome } from 'react-icons/fa'
import './Header.css'
const Header = () => {
  return (
    <>
      <nav>
        <div className='nav-container'>
          <LinkContainer to='/'>
            <span className='nav-brand'>
              <FaHome />
            </span>
          </LinkContainer>
          <div className='route-container'>
            <LinkContainer to='/compiler' style={{ color: '#000' }}>
              <Nav.Link>Compiler</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/judge' style={{ color: '#000' }}>
              <Nav.Link>Online-Judge</Nav.Link>
            </LinkContainer>
            {/* implement authorization here */}
            {/* <LinkContainer to='/login' style={{ color: '#000' }}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
