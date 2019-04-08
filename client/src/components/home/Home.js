import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CQuery from '../commons/CustomQueryComponent';
import { LOGGED_USER } from '../graphql/user/Queries';
import SideBar from '../sidebar/';
import EventFeed from '../events/EventFeed';
import NewsFeed from '../news/NewsFeed';
import CreateUserProfile from '../profile/profileactions/CreateUserProfile';
import Profile from '../profile/userprofile/Profile';
import Event from '../events/singleEvent/Event';
import CreateEvent from '../events/eventActions/CreateEvent';
import EditEvent from '../events/eventActions/EditEvent';
import DeleteEvent from '../events/eventActions/DeleteEvent';

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
										<Switch>
											<Route
												path="/home/news"
												render={props => <NewsFeed {...props} user={user.id} />}
											/>
											<Route
												path="/home/events/:day"
												render={props => <EventFeed {...props} user={user.id} />}
											/>
											<Route
												exact
												path="/home/profile/:id"
												render={props => <Profile {...props} currentUser={user.id} />}
											/>
											<Route
												exact
												path="/home/profile/create/:id"
												render={props => <CreateUserProfile {...props} currentUser={user.id} />}
											/>
											<Route
												exact
												path="/home/profile/edit/:id"
												// ADD the edit profile component
												render={props => <CreateUserProfile {...props} currentUser={user.id} />}
											/>
											<Route
												exact
												path="/home/event/:id"
												render={props => <Event {...props} currentUser={user.id} />}
											/>
											<Route
												exact
												path="/home/event/create/:id"
												render={props => <CreateEvent {...props} currentUser={user.id} />}
											/>
											<Route
												exact
												path="/home/event/edit/:id"
												render={props => <EditEvent {...props} currentUser={user.id} />}
											/>
											<Route
												exact
												path="/home/event/delete/:id"
												render={props => <DeleteEvent {...props} currentUser={user.id} />}
											/>
										</Switch>
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
