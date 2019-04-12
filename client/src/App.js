import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import PrivateRoute from './components/auth/Auth';
import Error404 from './components/commons/IncorrectRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import Config from './config/config';
import { AuthContext, AuthContextValue } from './components/contexts';

const { uri } = Config;

const client = new ApolloClient({
	uri,
	request: operation => {
		const token = localStorage.getItem('token');
		if (token) {
			operation.setContext({
				headers: {
					authorization: token
				}
			});
		}
	}
});

const App = () => (
	<ApolloProvider client={client}>
		<Router>
			<div className="App">
				<AuthContext.Provider value={AuthContextValue}>
					<Route component={Navbar} />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/login" component={Login} />
							<PrivateRoute path="/home" component={Home} />
							<Route component={Error404} />
							<Route path="/error" component={Error404} />
						</Switch>
					</div>
					<Route component={MobileNav} />
				</AuthContext.Provider>
			</div>
		</Router>
	</ApolloProvider>
);

export default App;
