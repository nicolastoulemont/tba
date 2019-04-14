import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import EventFeed from '../events/eventsFeed';
import NewsFeed from '../news/newsFeed/index';
import CreateProfile from '../profiles/createProfile';
import EditProfile from '../profiles/editProfile';
import Profile from '../profiles/profile';
import Event from '../events/event';
import CreateEvent from '../events/createEvent';
import EditEvent from '../events/editEvent';
import DeleteEvent from '../events/deleteEvent';

const HomeRouter = () => {
	return (
		<Fragment>
			<Switch>
				<Route path="/home/news" component={NewsFeed} />
				<Route path="/home/events/:day" component={EventFeed} />
				<Route exact path="/home/profile/:id" component={Profile} />
				<Route exact path="/home/profile/create/:id" component={CreateProfile} />
				<Route exact path="/home/profile/edit/:id" component={EditProfile} />
				<Route exact path="/home/event/:id" component={Event} />
				<Route exact path="/home/event/create/:id" component={CreateEvent} />
				<Route exact path="/home/event/edit/:id" component={EditEvent} />
				<Route exact path="/home/event/delete/:id" component={DeleteEvent} />
			</Switch>
		</Fragment>
	);
};

export default HomeRouter;
