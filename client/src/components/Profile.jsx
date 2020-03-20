import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'


class Profile extends Component {

    displayName = () => {
        const jwt = localStorage.getItem("token")
        const user = jwtDecode(jwt);
        return user.username.username;
    }
        render() { 
            return ( 
                <div><h1>Hello, {this.displayName()}</h1></div>
            );
        }
    }
 
export default Profile;
