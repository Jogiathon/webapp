import React, { Component } from 'react';
import axios from 'axios';
import DefaultImg from '../assets/defaultimg.png'
import jwtDecode from 'jwt-decode'

class Add extends Component {
    state = {
        message: '',
        secondMessage: '',
        date: '',
        category: "Random",
        multerImage: DefaultImg,
        imageObject: DefaultImg,
        data: this.props.data,
        sessionToken: '',
      };

  componentDidMount() {
    this.state.sessionToken = localStorage.getItem('token');
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  getDataFromDb = () => {
    this.setState({data: this.props.data});
  };
  
  date = () => {
    var date = new Date().toLocaleDateString();
    var time = new Date().toLocaleTimeString();
    var final = date + ' ' + time;
    return final;
  }

    // or put method that uses our backend api
     // to create new query into our data base
  putDataToDB = (message, secondMessage, date, imageData, category) => {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    console.log(user);
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }      
    if (imageData != DefaultImg) {
      let imageFormObj = new FormData()
      imageFormObj.append("id", idToBeAdded);
      imageFormObj.append("date", date);
      imageFormObj.append("message", message);
      imageFormObj.append("secondMessage", secondMessage); 
      imageFormObj.append("category", category);   
      imageFormObj.append("imageData", imageData);
      imageFormObj.append("userName", user.username.username);
      axios.post('/api/posts/putData', imageFormObj) 
      .then((data) => {
        if (data.success) {
          alert("image has been successfully uploaded");
        }
      })
      .catch((err) => {
        alert("Error while uploading image")
      })
    }
    else {      
      axios.defaults.headers.common['Authorization'] = this.state.sessionToken;
      axios.post('/api/posts/putPost', {
        id: idToBeAdded,
        message: message,
        secondMessage: secondMessage,
        date: date,
        category: category,
        imageData: imageData,
        userName: user.username.username,
      })
      .then((data) => {
        if (data.success) {
          alert("image has been successfully uploaded");
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        alert("Please login or create an account")
      })
    }

    this.setState({
      message: '',
      secondMessage: '',
      date: '',
      category: "Random",
      multerImage: DefaultImg,
      imageObject: DefaultImg,
    })

  };

  uploadImage(e) {    
    //stores readable image uploaded using multer
    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0]),
      imageObject: e.target.files[0],
    });
  }
    render() { 
        return ( 
          <form onSubmit={(e) => this.putDataToDB(this.state.message, this.state.secondMessage, this.date(),this.state.imageObject, this.state.category, this.refs.title)}>
            <div className = "column">
              <div style={{ padding: '10px' }}>
                <div className="md-form">
                  <input
                    className = "form-control"
                    type="text"
                    id = "title"
                    onChange={(e) => this.setState({ message: e.target.value })}
                    placeholder="Title"
                    style={{ width: '200px' }}
                  />
                </div>
                < br/>
                <textarea 
                  onChange={(e) => this.setState({ secondMessage: e.target.value })}
                  rows="4" 
                  cols="50" 
                  id="body"
                  name="comment" 
                  form="usrform"
                  placeholder="Enter a message here...">
                </textarea>
                <br />
                <br />
                <img src={this.state.multerImage} style={{ width:' 120px' }} alt="upload-image" />
                <br />
                <br />
                <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    className = "custom-file-input"
                    name = "imageData"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e) => this.uploadImage(e)}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                </div>
                </div>
                <br />
                <br /> 
                <div className="md-form">
                  <input
                    className = "form-control"
                    type="text"
                    id="category"
                    onChange={(e) => this.setState({ category: e.target.value })}
                    placeholder="Enter category"
                    style={{ width: '200px' }}
                  />
                </div>
                <br />
                <br />
                <button 
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
         );
    }
}
 
export default Add;