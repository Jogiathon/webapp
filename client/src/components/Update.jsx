import React, { Component } from 'react';
import axios from 'axios';

class Update extends Component {
    state = { 
        id: 0,
        message: null,
        secondMessage: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        data: this.props.data,
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
      
  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.defaults.headers.common['Authorization'] = this.state.sessionToken;
    axios.post('/api/posts/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

    render() { 
        return ( 
            <div style={{ padding: '10px' }}>
                  <input
                    type="text"
                    style={{ width: '200px' }}
                    onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                    placeholder="id of item to update here"
                  />
                  <br />
                  <br />
                  <input
                    type="text"
                    style={{ width: '200px' }}
                    onChange={(e) => this.setState({ updateToApply: e.target.value })}
                    placeholder="put new value of the item here"
                  />
                  <br />
                  <br />
                  <button 
                    onClick={() =>
                      this.updateDB(this.state.idToUpdate, this.state.updateToApply)
                    }
                    className="btn btn-primary"
                  >  
                    UPDATE
                  </button>
                </div>
         );
    }
}
 
export default Update;