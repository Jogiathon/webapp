import React, { Component } from 'react';
import axios from 'axios';

class Delete extends Component {
    state = { 
        id: 0,
        message: null,
        secondMessage: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        data: this.props.data,
        sessionToken : null,
     }

  componentDidMount() {
    this.getDataFromDb();
    this.state.sessionToken = localStorage.getItem('token');
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 5000);
      this.setState({ intervalIsSet: interval });
    }
  }
  
  getDataFromDb = () => {
    this.setState({data: this.props.data});
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
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

 /*  deleteAllFromDB () {
    this.state.data.forEach((dat) => {
        objIdToDelete = dat._id;
        axios.delete('/api/deleteData', {
          data: {
            id: objIdToDelete,
          }
    });
    }
  }
 */

    render() { 
        return ( 
            <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ idToDelete: e.target.value })}
              placeholder="put id of item to delete here"
            />
            <br />
            <br />
            <button
              onClick={() => this.deleteFromDB(this.state.idToDelete)}
              className="btn btn-primary"
            >
              DELETE
            </button>
          </div>
         );
    }
}
 
export default Delete;