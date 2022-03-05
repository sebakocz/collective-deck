import React from 'react';

import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

class Navigation extends React.Component{
    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to={"/"}>Collective Deck</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={"/"}>View</Nav.Link>
                                <Nav.Link as={Link} to={"/build"}>Build</Nav.Link>
                                <Nav.Link as={Link} to={"/analyse"}>Analyse</Nav.Link>
                                <Nav.Link as={Link} to={"/credits"}>Credits</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        )
    }
}

export default Navigation