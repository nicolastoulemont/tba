import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import CQuery from '../commons/CustomQueryComponent';
import { UserContext } from '../contexts';
import { InitialState, Reducer, StateProvider } from '../contexts/InitialState';
import { LOGGED_USER } from '../graphql/user/Queries';
import UserMobNav from '../navs/UserMobNav';
import UserNav from '../navs/UserNavigation';
import SideBar from '../sidebar/';
import HomeRouter from './router.js';

const Home = props => {
	const path = window.location.pathname;
	if (path === '/home' || path === '/home/' || path === '/home/news' || path === '/home/news/')
		return <Redirect to={`/home/news/${dayjs().format('YYYY-MM-DD')}`} />;
	if (path === '/home/events' || path === '/home/events/')
		return <Redirect to={`/home/events/${dayjs().format('YYYY-MM-DD')}`} />;

	const handleNewTokens = data => {
		if (data.currentUser.accessToken)
			localStorage.setItem('access-token', data.currentUser.accessToken);
		if (data.currentUser.refreshToken)
			localStorage.setItem('refresh-token', data.currentUser.refreshToken);
		return;
	};

	return (
		<Fragment>
			<StateProvider initialState={InitialState} reducer={Reducer}>
				<CQuery query={LOGGED_USER}>
					{({ data }) => {
						handleNewTokens(data);
						return (
							<UserContext.Provider value={data.currentUser.body}>
								<UserNav />
								<div className="container">
									<div className="mt-2 text-center">
										<div className="row">
											<main className="col-12 col-lg-8 bg-white px-0">
												<HomeRouter />
											</main>
											<div className="d-none d-lg-block col-lg-4 text-center">
												<SideBar history={props.history} />
											</div>
										</div>
									</div>
								</div>
								<UserMobNav history={props.history} />
							</UserContext.Provider>
						);
					}}
				</CQuery>
			</StateProvider>
		</Fragment>
	);
};

export default React.memo(Home);
