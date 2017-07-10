import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router';


const Header = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Crypto Experiment</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem><Link to={'/exchange'}>Exchange Data</Link></NavItem>
        <NavItem><Link to={'/buy'}>Best Prices</Link></NavItem>
        <NavItem><Link to={'/trade'}>Trade  Bitcoin</Link></NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header;
