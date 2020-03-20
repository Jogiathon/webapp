import React, { Component } from 'react';
import axios from 'axios';
import Add from './Add';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import {Container, ListGroup} from 'react-bootstrap';
import './Display.scss';
import Pagination from './Pagination'
import {paginate} from '../utils/paginate';
import {Listgroup} from '../components/Listgroup';
//import {getCategories } from "../c"

class DisplayData extends Component {
  state = {
    data: this.props.data,
    category: [],
    id: 0,
    message: null,
    secondMessage: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    date: null,
    pageSize: 4,
    currentPage: 1,
    sessionToken: null,
  };

  componentDidMount() {
    this.getDataFromDb();
    this.state.sessionToken = localStorage.getItem('token');
    this.state.category = this.getCategories();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  
  getDataFromDb = () => {
    this.setState({data: this.props.data});
  };

  getCategories = () => {
      let categories = [];
    this.state.data.forEach((dat) => {
      if (categories.indexOf(dat.category) == -1) {
        categories.push(dat.category);
      }
    });
    return categories;
  };

  
  deleteFromDB = (idTodelete) => {
    void
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    axios.defaults.headers.common['Authorization'] = this.state.sessionToken;
    axios.delete('/api/posts/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  returnImage(e) {
    if (e === "No Image") {
      return
    }
    var extension = e.substr(e.length - 3);
    if (extension === "jpg" || extension === "png")
      return <img src={e} className="coolimg" alt="uploaded image" />
    else if (extension === "mp4")
      return (
        <div>
        <video ref="vidRef" src={e} type="video/mp4"></video>
        </div>
      )
    else
      return
  } 

  handlePageChange = page => {
    this.setState({currentPage: page});
  }

  handleCategorySelect = category => {
    console.log(category);
  }

    render() { 
      const {data, pageSize, currentPage} = this.state;
      const postsCount = data.length;

      const posts = paginate(data, currentPage, pageSize);

        return ( 
            <Container>
              <div>
                {data.length <= 0 ? <p>There are no posts currently</p>
                  : posts.map((dat) => (
                      <a href="#" className="list-group-item list-group-item-action flex-column align-items-start"  key={dat.id}>
                        <span style={{ color: 'gray' }}> ID: {dat.id}</span>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{dat.message}</h5>
                          <small className="text-muted">{dat.date}</small>
                        </div>
                        <p className="mb-1">{dat.secondMessage}</p>
                        <Container>
                          <div>{this.returnImage(dat.imageData)}</div>
                        </Container>
                        <span> Category: {dat.category} </span>
                        <input type='button'
                          onClick={() => this.deleteFromDB(dat.id)}
                          href='#'
                          className="btn btn-primary"
                          value='Delete'
                        />                        
                       </a>
                    ))}
              </div>
              <Pagination 
                pageSize={pageSize} 
                postsCount={postsCount} 
                onPageChange={this.handlePageChange} 
                currentPage={currentPage}
                />
            </Container>
        );
    }
}
 
export default DisplayData;