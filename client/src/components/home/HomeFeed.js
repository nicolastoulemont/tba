import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import EventFeed from '../events/EventFeed';
import NewsFeed from '../news/NewsFeed';
import dayjs from 'dayjs';

const HomeFeed = ({ user, interestOne, interestTwo, interestThree }) => {
	const today = new Date();
	return (
		<Fragment>
			<div className="row m-0 p-0">
				<div className="col border-right p-0 py-2">
					<Link to="/home/news" className="link-menu">
						<i className="d-inline far fa-paper-plane mr-2" />
						<h6 className="d-inline font-weight-bold text-uppercase">NEWS</h6>
					</Link>
				</div>
				<div className="col p-0 py-2">
					<Link
						to={`/home/events/${dayjs(today).format('YYYY-MM-DD')}`}
						className="align-middle link-menu"
					>
						<i className="d-inline far fa-calendar mr-2" />
						<h6 className="d-inline font-weight-bold text-uppercase">EVENTS</h6>
					</Link>
				</div>
			</div>
			<div className="row  m-0 p-0">
				<div className="mb-2 mt-2 w-100">
					<Route path="/home/news" render={props => <NewsFeed {...props} user={user} />} />
					<Route
						path="/home/events/:day"
						render={props => (
							<EventFeed
								{...props}
								user={user}
								interestOne={interestOne}
								interestTwo={interestTwo}
								interestThree={interestThree}
							/>
						)}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default HomeFeed;
