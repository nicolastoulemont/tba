import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileCommentsFeed from './commentsFeed';
import ProfileEventsFeed from './eventsFeed';
import ProfileLikesFeed from './likesFeed';

const ProfileSocial = () => {
	const [eventsDisplay, setEventsDisplay] = useState(true);
	const [commentsDisplay, setCommentsDisplay] = useState(false);
	const [likesDisplay, setLikesDisplay] = useState(false);

	const displayEvents = e => {
		setEventsDisplay(true);
		setCommentsDisplay(false);
		setLikesDisplay(false);
	};

	const displayComments = e => {
		setEventsDisplay(false);
		setCommentsDisplay(true);
		setLikesDisplay(false);
	};

	const displayLikes = e => {
		setEventsDisplay(false);
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
							<h6 className="d-none d-sm-inline font-weight-bold text-uppercase">EVENTS</h6>
						</Link>
					</div>
					<div className="col px-0 border-left border-right">
						<Link to="#" onClick={displayComments}>
							<i className="d-inline far fa-comment mr-2" />
							<h6 className="d-none d-sm-inline font-weight-bold text-uppercase">COMMENTS</h6>
						</Link>
					</div>
					<div className="col px-0">
						<Link to="#" onClick={displayLikes}>
							<i className="d-inline far fa-thumbs-up mr-2" />
							<h6 className="d-none d-sm-inline font-weight-bold text-uppercase">LIKES</h6>
						</Link>
					</div>
				</div>
			</div>
			<div className="py-2">
				<div className="row">
					<div className="col pb-5">
						{eventsDisplay ? <ProfileEventsFeed /> : null}
						{commentsDisplay ? <ProfileCommentsFeed /> : null}
						{likesDisplay ? <ProfileLikesFeed /> : null}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default React.memo(ProfileSocial);
