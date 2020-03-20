import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';

const Styles = styled.div`
    .navbar {
        background-color: White;
    }

    .navbar-brand .navbar-nav .nav-link {
        color: white;

        &:hover {
            color: black;
        }
    }
`;

// Stateless Functional Component instead of a class since there are is no states only props data
export const NavigationBar = ( {user} ) => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">Code Life</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/contact">Contact</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/crud">Crud</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/crud2">Crud2</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/schedule">Schedule</Nav.Link></Nav.Item>
                    {!user && (
                    <React.Fragment>
                    <Nav.Item><Nav.Link href="/register">Register</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
                    </React.Fragment>
                    )}
                    {user && (
                    <React.Fragment>
                    <Nav.Item><Nav.Link href="/profile">{user.username.username}</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/logout">Logout</Nav.Link></Nav.Item>
                    </React.Fragment>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)