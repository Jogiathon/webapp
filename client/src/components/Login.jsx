import React, { Component } from 'react';
import auth from '../services/AuthService';
import axios from 'axios';


class Login extends Component {
    state = {
        account: { username:"", password:""},
        sessionToken: "",
        errors: {}
    }

    validate = () => {

        if (this.state.account.username.length === 0)
            this.state.errors.username = 'Username is required.';
        if (this.state.account.password.length === 0)
            this.state.errors.password = 'Password is required.';

        return Object.keys(this.state.errors).length === 0 ? null : this.state.errors;
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} })
        if (errors.password != "" || errors.username != "")
            return; 
        axios.post('/api/users/login', {
            headers : {
              "Content-Type" : "application/x-www-form-urlencoded"
            },
            username: this.state.account.username,
            password: this.state.account.password,
          })
          .then((data) => {
            if (data) {
                this.state.sessionToken = data.headers['x-auth-token'];
                localStorage.setItem('token', data.headers['x-auth-token']);
                window.location ='/';
            } else {
                console.log("There appears to be no data returned");
            }
            window.location ='/';
          })
          .catch((err) => {
            if (err.response.status === 401 || err.response.status === 500) {
                this.setState({ 
                    errors: {
                        password: 'Login information is invalid',
                    }
                });
            }
          })
    };

    handleChange = ({currentTarget: input}) => {  
        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({ account });
        this.state.errors.username = '';
        this.state.errors.password = '';
    }

    render() { 
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
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
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={this.state.account.password}
                                name="password"
                                type="password" 
                                className="form-control" 
                                onChange={this.handleChange}
                            />
                            {this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}    
                        </div>
                        <button 
                            className="btn btn-primary"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Login;