import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaHome } from 'react-icons/fa'
const Header = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <FaHome />
            </Navbar.Brand>
          </LinkContainer>
          <Nav>
            <LinkContainer to='/compiler'>
              <Nav.Link>Compiler</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/judge'>
              <Nav.Link>Online-Judge</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>

      {/* <Navbar bg='light' expand='lg'>
          <Container>
            <Navbar.Brand href='/judge'>
              <h2>Online Judge</h2>
            </Navbar.Brand>
            <Navbar.Brand href='/compiler'>
              <h2>Compiler</h2>
            </Navbar.Brand>
          </Container>
        </Navbar> */}
    </>
  )
}

export default Header
