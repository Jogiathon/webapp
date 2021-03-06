// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

class Crud extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    secondMessage: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('/api/posts/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message, secondMessage) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('api/posts/putData', {
      id: idToBeAdded,
      message: message,
      secondMessage: secondMessage,
    });
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

    axios.delete('/api/posts/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
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

    axios.post('/api/posts/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (  
        <div style= {{ padding:'50px' }} className = "container">
          <div className = "row">
            <div className = "column">
              <div style={{ padding: '10px' }}>
                <input
                  type="text"
                  onChange={(e) => this.setState({ message: e.target.value })}
                  placeholder="add something in the database"
                  style={{ width: '200px' }}
                />
                <br />
                <br />
                <input
                  type="text"
                  onChange={(e) => this.setState({ secondMessage: e.target.value })}
                  placeholder="add another something in the database"
                  style={{ width: '200px' }}
                />
                <br />
                <br />
                <button onClick={() => this.putDataToDB(this.state.message, this.state.secondMessage)}>
                  ADD
                </button>
              </div>
            </div>
            <div className = "column">
              <div style={{ padding: '10px' }}>
                <input
                  type="text"
                  style={{ width: '200px' }}
                  onChange={(e) => this.setState({ idToDelete: e.target.value })}
                  placeholder="put id of item to delete here"
                />
                <br />
                <br />
                <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
                  DELETE
                </button>
              </div>
            </div>
            <div className = "column">
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
                  >  
                    UPDATE
                  </button>
                </div>
            </div>
          </div>
              <div className="row">
                <ul>
                {data.length <= 0
                  ? 'NO DB ENTRIES YET'
                  : data.map((dat) => (
                      <li style={{ padding: '10px' }} key={data.message}>
                        <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                        <span style={{ color: 'gray' }}> data: </span> {dat.message} <br />
                        <span style={{ color: 'gray' }}> second: </span> {dat.secondMessage}
                      </li>
                    ))}
                </ul>
              </div>
          </div>
    );
  }
}

export default Crud;