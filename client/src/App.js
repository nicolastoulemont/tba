import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/auth/Auth';
import Error404 from './components/commons/IncorrectRoute';
import { AuthContext, AuthContextValue } from './components/contexts';
import Home from './components/home';
import Landing from './components/layout/Landing';
import { uri } from './config/config';

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
		<ApolloProviderHooks client={client}>
			<AuthContext.Provider value={AuthContextValue}>
				<div className="App">
					<Router>
						<Switch>
							<Route exact path="/" component={Landing} />
							<PrivateRoute path="/home" component={Home} />
							<Route component={Error404} />
							<Route path="/error" component={Error404} />
						</Switch>
					</Router>
				</div>
			</AuthContext.Provider>
		</ApolloProviderHooks>
	</ApolloProvider>
);

export default App;
