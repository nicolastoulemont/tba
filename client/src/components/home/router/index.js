import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import EventFeed from '../../events/eventsFeed';
import NewsFeed from '../../news/newsFeed/index';
import CreateProfile from '../../profiles/createProfile';
import EditProfile from '../../profiles/editProfile';
import Profile from '../../profiles/profile';
import Event from '../../events/event';
import CreateEvent from '../../events/createEvent';
import EditEvent from '../../events/editEvent';
import DeleteEvent from '../../events/deleteEvent';

export default function HomeRouter({ user }) {
	return (
		<Fragment>
			<Switch>
				<Route path="/home/news" render={props => <NewsFeed {...props} user={user} />} />
				<Route path="/home/events/:day" render={props => <EventFeed {...props} user={user} />} />
				<Route
					exact
					path="/home/profile/:id"
					render={props => <Profile {...props} currentUser={user} />}
				/>
				<Route
					exact
					path="/home/profile/create/:id"
					render={props => <CreateProfile {...props} user={user} />}
				/>
				<Route
					exact
					path="/home/profile/edit/:id"
					render={props => <EditProfile {...props} user={user} />}
				/>
				<Route exact path="/home/event/:id" render={props => <Event {...props} user={user} />} />
				<Route
					exact
					path="/home/event/create/:id"
					render={props => <CreateEvent {...props} user={user} />}
				/>
				<Route
					exact
					path="/home/event/edit/:id"
					render={props => <EditEvent {...props} user={user} />}
				/>
				<Route
					exact
					path="/home/event/delete/:id"
					render={props => <DeleteEvent {...props} user={user} />}
				/>
			</Switch>
		</Fragment>
	);
}
