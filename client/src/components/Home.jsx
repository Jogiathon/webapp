import React, { Component } from 'react';
import {Jumbotron, Container } from 'react-bootstrap';
import './Home.scss';

class Home extends Component {
    state = {  }
    render() { 
        return (  
            <Container>
                <Jumbotron>
                    <h2> Welcome to code life</h2>
                    <p> Share an idea</p> 
                </Jumbotron>
            </Container>
        );
    }
}
 
export default Home;