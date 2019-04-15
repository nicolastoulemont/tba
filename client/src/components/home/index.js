import React, { Fragment } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { FetchError } from '../commons/UserActionsComponents';
import { StateProvider, UserContext } from '../contexts';
import { LOGGED_USER } from '../graphql/user/Queries';
import SideBar from '../sidebar/';
import HomeRouter from './router.js';

const Home = props => {
	const initialState = {
		stateEvent: {
			name: '',
			abstract: '',
			banner_URL: null,
			description: '',
			isPublic: true,
			city: '',
			address: '',
			start: new Date(),
			end: new Date(),
			tags: ['']
		}
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case 'addEvent':
				return {
					...state,
					stateEvent: action.newEvent
				};

			default:
				return state;
		}
	};
	if (window.location.pathname === '/home' || window.location.pathname === '/home/')
		return <Redirect to="/home/news" />;
	const { data, error } = useQuery(LOGGED_USER, { suspend: true });
	if (error) return <FetchError />;
	return (
		<Fragment>
			<StateProvider initialState={initialState} reducer={reducer}>
				<UserContext.Provider value={data.currentUser}>
					<div className="mt-2 text-center">
						<div className="row">
							<main className="col-sm-12 col-lg-8 bg-white px-0">
								<HomeRouter />
							</main>
							<SideBar history={props.history} />
						</div>
					</div>
				</UserContext.Provider>
			</StateProvider>
		</Fragment>
	);
};

export default Home;
