import dayjs from 'dayjs';
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import CQuery from '../commons/CustomQueryComponent';
import { UserContext } from '../contexts';
import { InitialState, Reducer, StateProvider } from '../contexts/InitialState';
import { LOGGED_USER } from '../graphql/user/Queries';
import UserMobNav from '../navs/UserMobNav';
import UserNav from '../navs/userNav/index';
import SideBar from '../sidebar/';
import HomeRouter from './router.js';

const Home = props => {
	const path = window.location.pathname;
	if (path === '/home' || path === '/home/' || path === '/home/news' || path === '/home/news/')
		return <Redirect to={`/home/news/${dayjs().format('YYYY-MM-DD')}`} />;
	if (path === '/home/events' || path === '/home/events/')
		return <Redirect to={`/home/events/${dayjs().format('YYYY-MM-DD')}`} />;
	return (
		<Fragment>
			<StateProvider initialState={InitialState} reducer={Reducer}>
				<CQuery query={LOGGED_USER}>
					{({ data }) => {
						return (
							<UserContext.Provider value={data.currentUser}>
								<UserNav />
								<div className="container">
									<div className="mt-2 text-center">
										<div className="row">
											<main className="col-12 col-md-8 bg-white px-0">
												<HomeRouter />
											</main>
											<SideBar history={props.history} />
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
