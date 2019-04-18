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
	if (window.location.pathname === '/home' || window.location.pathname === '/home/')
		return <Redirect to="/home/news" />;
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
											<main className="col-sm-12 col-lg-8 bg-white px-0">
												<HomeRouter />
											</main>
											<SideBar history={props.history} />
										</div>
									</div>
								</div>
								<UserMobNav />
							</UserContext.Provider>
						);
					}}
				</CQuery>
			</StateProvider>
		</Fragment>
	);
};

export default React.memo(Home);
