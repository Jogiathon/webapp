import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        account: { username:"", password:"", verifypassword:""},
        sessionToken: "",
        errors: {}
    }

    validate = () => {

        if (this.state.account.username.length === 0)
            this.state.errors.username = 'Username is required.';
        if (this.state.account.password.length === 0)
            this.state.errors.password = 'Password is required.';
        if (this.state.account.verifypassword.length === 0)
            this.state.errors.verifypassword = 'Verified Password is required.';
        if (this.state.account.verifypassword != this.state.account.password) 
            this.state.errors.verifypassword = 'Passwords must match'
        if (this.state.account.username.length > 20 || this.state.account.username.length < 8)
            this.state.errors.username = 'Username must be between 8-20 characters long'
        if (this.state.account.username.charAt(0) == '_' || this.state.account.username.charAt(0) == '.')
            this.state.errors.username = 'Username cannot start with a . or _'
        if (this.state.account.username.charAt(this.state.account.username.length) == '.' || this.state.account.username.charAt(this.state.account.username.length) == '_')
            this.state.errors.username = 'Username cannot end with a . or _'
        if (this.state.account.username.includes("._") || this.state.account.username.includes("_.") || this.state.account.username.includes("__") || this.state.account.username.includes(".."))
            this.state.errors.username = 'Username cannot contain ._, _., __, or ..'

        return Object.keys(this.state.errors).length === 0 ? null : this.state.errors;
    }

    handleSubmit = e => {
        e.preventDefault();
        // Call the server 
/*         const errors = this.validate();
        console.log(errors);
        this.setState({ errors })
        if (errors) return; 
        console.log(errors);*/
        const errors = this.validate();
        this.setState({ errors: errors || {} })
        if (errors.password != "" || errors.username != "" || errors.verifypassword != "")
            return; 
        axios.post('/api/users/register', {
            headers : {
              "Content-Type" : "application/x-www-form-urlencoded"
            },
            username: this.state.account.username,
            password: this.state.account.password,
          })
          .then((data) => {
            if (data.success) {
              alert("Registered");
            }
            if (data) {
                this.state.sessionToken = data.headers['x-auth-token'];
                localStorage.setItem('token', data.headers['x-auth-token']);
            } else {
                console.log("There appears to be an error upon registering");
            } 
          })
          .catch((err) => {
            if (err.response.status === 409) {
                this.setState({ 
                    errors: {
                        username: 'Username already exists. Please choose a different one.',
                    }
                });
            }
            if (err.response.status === 500) {
                this.setState({ 
                    errors: {
                        username: 'There is currently an issue with the server, please contact administrator.',
                    }
                });
            }
          })

        console.log("Submitted");

    };

    handleChange = ({currentTarget: input}) => {  
        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({ account });
        this.state.errors.username = '';
        this.state.errors.password = '';
        this.state.errors.verifypassword = '';
    }


    render() { 
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div style={{ padding: '10px' }}>
                        <div className="form-group">
                        Username
                            <input
                                autoFocus
                                value={this.state.account.username}
                                name="username"
                                type="text" 
                                className="form-control" 
                                onChange={this.handleChange}
                            />
                            {this.state.errors.username && <div className="alert alert-danger">{this.state.errors.username}</div>}    
                        </div>
                        Password
                        <div className="form-group">
                            <input
                                value={this.state.account.password}
                                name="password"
                                type="password" 
                                className="form-control" 
                                onChange={this.handleChange}
                            />
                            {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}    
                        </div>
                        Confirm Password
                        <div className="form-group">
                            <input
                                value={this.state.account.verifypassword}
                                name="verifypassword"
                                type="password" 
                                className="form-control" 
                                onChange={this.handleChange}
                            />
                            {this.state.errors.verifypassword && <div className="alert alert-danger">{this.state.errors.verifypassword}</div>}    
                        </div>
                        <button 
                        className="btn btn-primary"
                        >
                        Register
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Register;