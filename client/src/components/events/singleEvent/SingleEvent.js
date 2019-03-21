import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { DashboardError } from '../../commons/UserActionsComponents';
import Spinner from '../../commons/Spinner';
import SideBarUserProfile from '../../profile/SideBarUserProfile';
import SideBarUserEvents from '../sideBarUserEvents/SideBarUserEvents';
import Event from './Event';

import { LOGGED_USER } from '../../graphql/user/Queries';

const SingleEvent = ({ match, history }) => {
	const event_ID = match.params.id;
	return (
		<Fragment>
			<Query query={LOGGED_USER}>
				{({ loading, error, data }) => {
					if (loading) return <Spinner />;
					if (error) return <DashboardError />;
					if (data) {
						const user = data.currentUser;
						return (
							<Fragment key={user.id}>
								<div className="mt-2 text-center">
									<div className="row justify-content-center">
										<main className="col-sm-12 col-lg-8 bg-white px-0">
											<Event user={user.id} event_ID={event_ID} history={history} />
										</main>
										<div className="d-none d-lg-block col-lg-4 text-center">
											<SideBarUserProfile
												user={user.id}
												avatar={user.profile.picture_URL}
												name={user.profile.name}
											/>
											<div className="row">
												<SideBarUserEvents user={user.id} />
											</div>
										</div>
									</div>
								</div>
							</Fragment>
						);
					}
				}}
			</Query>
		</Fragment>
	);
};

export default SingleEvent;
