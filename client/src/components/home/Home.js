import React, { Fragment } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
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
	const userHasProfile = (user, props) => {
		const redirect = () => {
			if (window.location.pathname === '/home' || window.location.pathname === '/home/')
				return <Redirect to="/home/news" />;
		};
		return (
			<Fragment>
				<div className="mt-2 text-center">
					<div className="row">
						<main className="col-sm-12 col-lg-8 bg-white px-0">
							{redirect()}
							<Switch>
								<Route path="/home/news" render={props => <NewsFeed {...props} user={user.id} />} />
								<Route
									path="/home/events/:day"
									render={props => (
										<EventFeed
											{...props}
											user={user.id}
											interestOne={user.profile.interestOne}
											interestTwo={user.profile.interestTwo}
											interestThree={user.profile.interestThree}
										/>
									)}
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
	};

	const userHasNoProfile = user => (
		<Fragment>
			<div className="mt-2 text-center">
				<div className="row">
					<div className="col">
						<h6>You need a Profile to continue</h6>
						<p>
							<Link to={`/home/profile/create/${user.id}`}>Create your Profile</Link>
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
	return (
		<Fragment>
			<CQuery query={LOGGED_USER}>
				{({ data }) => {
					const user = data.currentUser;
					if (user.profile) return userHasProfile(user, props);
					if (!user.profile) return userHasNoProfile(user);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Home;
