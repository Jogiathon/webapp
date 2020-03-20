import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NoMatch from './components/NoMatch';
import Crud from './components/Crud';
import Crud2 from './components/Crud2';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import './styles/custom.scss';
import Schedule from './components/Schedule';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';
import auth from './services/AuthService';
import jwtDecode from 'jwt-decode';


class App extends Component {
    state = {
        user: null,
    };

    componentDidMount() {
        const thisUser = auth.getCurrentUser();
        this.setState( {user: thisUser });
        }

    render() { 
            return ( 
                <React.Fragment>
                        <Layout>
                            <NavigationBar user={this.state.user}/>
                            <Router>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/about" component={About} />
                                    <Route path="/contact" component={Contact} />
                                    <Route path="/crud" component={Crud} />
                                    <Route path="/crud2" component={Crud2} />
                                    <Route path="/schedule" component={Schedule} />
                                    <Route path="/register" component={Register} />
                                    <Route path="/login" component={Login} />
                                    <Route path="/profile" component={Profile} />
                                    <Route path="/logout" component={Logout} />
                                    <Route path="/" component={NoMatch} />
                                    <Redirect from="/" exact to="/"/>
                                </Switch>
                            </Router>
                        </Layout>
                </React.Fragment>
            );
    }
}
 
export default App;