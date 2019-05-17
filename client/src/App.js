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
import About from './components/layout/About';
import ConfirmEmail from './components/auth/ConfirmEmail';
import { uri } from './config/config';

const client = new ApolloClient({
	uri,
	request: operation => {
		const accessToken = localStorage.getItem('access-token');
		const refreshToken = localStorage.getItem('refresh-token');
		if (accessToken || refreshToken) {
			operation.setContext({
				headers: {
					accesstoken: accessToken,
					refreshtoken: refreshToken
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
							<Route exact path="/about" component={About} />
							<PrivateRoute path="/home" component={Home} />
							<Route path="/confirmation/:emailToken" component={ConfirmEmail} />
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
