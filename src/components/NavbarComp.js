import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import {Link, Outlet} from 'react-router-dom'
function NavbarComp(){
   
        return(
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/Users"}>Users</Nav.Link>
                            <Nav.Link as={Link} to={"/Productos"}>Productos</Nav.Link>
                            
                        </Nav>
                    </Container>
                </Navbar>
                <section>
                    <Outlet></Outlet>
                 </section> 
                </>
        )
    
}

export default NavbarComp
