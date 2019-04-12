import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import CQuery from '../commons/CustomQueryComponent';
import { LOGGED_USER } from '../graphql/user/Queries';
import SideBar from '../sidebar/';
import HomeRouter from './router';
import { UserContext } from '../contexts';
const Home = props => {
	if (window.location.pathname === '/home' || window.location.pathname === '/home/')
		return <Redirect to="/home/news" />;
	return (
		<Fragment>
			<CQuery query={LOGGED_USER}>
				{({ data }) => {
					const user = data.currentUser;
					return (
						<Fragment>
							<UserContext.Provider value={user}>
								<div className="mt-2 text-center">
									<div className="row">
										<main className="col-sm-12 col-lg-8 bg-white px-0">
											<HomeRouter />
										</main>
										<SideBar history={props.history} />
									</div>
								</div>
							</UserContext.Provider>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Home;
