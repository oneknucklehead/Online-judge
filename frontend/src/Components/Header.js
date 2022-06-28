import React from 'react'
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
const Header = () => {
  return (
    <>
      <div>
        <Navbar bg='light' expand='lg'>
          <Container className='justify-content-center'>
            <Navbar.Brand href='/'>
              <h2>Online Judge</h2>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default Header
