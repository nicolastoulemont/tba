import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import CQuery from '../commons/CustomQueryComponent';
import { LOGGED_USER } from '../graphql/user/Queries';
import SideBar from '../sidebar/';
import HomeRouter from './router';

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
							<div className="mt-2 text-center">
								<div className="row">
									<main className="col-sm-12 col-lg-8 bg-white px-0">
										<HomeRouter user={user} />
									</main>
									<SideBar user={user} history={props.history} />
								</div>
							</div>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Home;
