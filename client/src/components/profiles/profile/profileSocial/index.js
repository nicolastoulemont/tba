import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileEventsFeed from './eventsFeed';
import ProfileCommentsFeed from './commentsFeed';
import ProfileLikesFeed from './likesFeed';

const ProfileSocial = () => {
	const [eventsDisplay, setEventsDisplay] = useState(true);
	const [newsDisplay, setNewsDisplay] = useState(false);
	const [commentsDisplay, setCommentsDisplay] = useState(false);
	const [likesDisplay, setLikesDisplay] = useState(false);

	const displayNews = e => {
		setEventsDisplay(false);
		setNewsDisplay(true);
		setCommentsDisplay(false);
		setLikesDisplay(false);
	};

	const displayEvents = e => {
		setEventsDisplay(true);
		setNewsDisplay(false);
		setCommentsDisplay(false);
		setLikesDisplay(false);
	};

	const displayComments = e => {
		setEventsDisplay(false);
		setNewsDisplay(false);
		setCommentsDisplay(true);
		setLikesDisplay(false);
	};

	const displayLikes = e => {
		setEventsDisplay(false);
		setNewsDisplay(false);
		setCommentsDisplay(false);
		setLikesDisplay(true);
	};

	return (
		<Fragment>
			<div className="py-2">
				<div className="row">
					<div className="col px-0">
						<Link to="#" onClick={displayEvents}>
							<i className="d-inline far fa-calendar mr-2" />
							<h6 className="d-none d-md-inline font-weight-bold text-uppercase">EVENTS</h6>
						</Link>
					</div>
					<div className="col px-0">
						<Link to="#" onClick={displayNews}>
							<i className="d-inline far fa-paper-plane mr-2" />
							<h6 className="d-none d-md-inline font-weight-bold text-uppercase">NEWS</h6>
						</Link>
					</div>
					<div className="col px-0">
						<Link to="#" onClick={displayComments}>
							<i className="d-inline far fa-comment mr-2" />
							<h6 className="d-none d-md-inline font-weight-bold text-uppercase">COMMENTS</h6>
						</Link>
					</div>
					<div className="col px-0">
						<Link to="#" onClick={displayLikes}>
							<i className="d-inline far fa-thumbs-up mr-2" />
							<h6 className="d-none d-md-inline font-weight-bold text-uppercase">LIKES</h6>
						</Link>
					</div>
				</div>
			</div>
			<div className="py-2">
				<div className="row">
					<div className="col pb-5">
						{eventsDisplay ? <ProfileEventsFeed /> : null}
						{newsDisplay ? <div>news</div> : null}
						{commentsDisplay ? <ProfileCommentsFeed /> : null}
						{likesDisplay ? <ProfileLikesFeed /> : null}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileSocial;
