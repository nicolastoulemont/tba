import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateEvent from '../events/eventActions/CreateEvent';
import DeleteEvent from '../events/eventActions/DeleteEvent';
import EditEvent from '../events/eventActions/EditEvent';
import Event from '../events/event';
import EventFeed from '../events/eventsFeed';
import NewsFeed from '../news/newsFeed/index';
import CreateProfile from '../profiles/profileActions/CreateProfile';
import EditProfile from '../profiles/profileActions/EditProfile';
import Profile from '../profiles/profile';

const HomeRouter = () => {
	return (
		<Fragment>
			<Switch>
				<Route path="/home/news/:day" component={NewsFeed} />
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
