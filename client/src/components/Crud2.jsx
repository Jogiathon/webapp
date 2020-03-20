// /client/App.js
import React, { Component } from 'react';
import { Row, Container } from 'react-bootstrap';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import Display from './Display';
import styled from 'styled-components';

const Styles = styled.div`
    .container {
      padding-left:50px;
      padding-right:50px;
    }
`;


class Crud2 extends Component {
  state = {
    data: [],
    intervalIsSet: false,
  };


  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  getDataFromDb = () => {
    fetch('/api/posts/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  render() {
    return (  
        <div>
          <Styles>
            <Container>
              <Row>
                  <Add data={this.state.data}/>
                  <Update data={this.state.data}/>
                  <Delete data={this.state.data}/>
              </Row>
              <Row>
                  <Display data={this.state.data}/>
              </Row>
            </Container>
          </Styles>
        </div>
    );
  }
}

export default Crud2;