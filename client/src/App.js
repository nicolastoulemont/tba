import ApolloClient from 'apollo-boost';
import React, { Suspense } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Spinner from './components/commons/Spinner';
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
	<Suspense fallback={<Spinner />}>
		<ApolloProvider client={client}>
			<ApolloProviderHooks client={client}>
				<AuthContext.Provider value={AuthContextValue}>
					<div className="App">
						<Router>
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
						</Router>
					</div>
				</AuthContext.Provider>
			</ApolloProviderHooks>
		</ApolloProvider>
	</Suspense>
);

export default App;
