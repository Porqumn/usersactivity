import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router";
import {ABOUT_ROUTE, TABLE_ROUTE} from "../utils/consts";
import {Button} from "bootstrap";

const NavBar = () => {

    const navigate = useNavigate()

    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Users activity</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{navigate(TABLE_ROUTE, { replace: true })}}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{navigate(ABOUT_ROUTE, { replace: true })}}>About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    );
};

export default NavBar;