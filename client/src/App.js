import ApolloClient from 'apollo-boost';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import PrivateRoute from './components/auth/Auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import SingleEvent from './components/events/singleEvent/SingleEvent';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import CreateProfile from './components/profile/CreateProfile';
import Profile from './components/profile/userprofile/Profile';
import Config from './config/config';

const { uri, token } = Config;

const client = new ApolloClient({
  uri,
  headers: {
    authorization: token ? token : ''
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Route component={Navbar} />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/event/:id" component={SingleEvent} />
            </div>
            <PrivateRoute component={MobileNav} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
