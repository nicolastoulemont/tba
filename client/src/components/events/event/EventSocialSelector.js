import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import EventCommentsFeed from '../../comments/EventCommentsFeed';
import LikesFeed from '../../likes/eventLikes/LikesFeed';
import EventRegistrationsFeed from '../../registrations/EventRegistrationsFeed';
import { UserContext } from '../../contexts';

const EventSocialSelector = () => {
	const user = useContext(UserContext);
	const [commentDisplay, setCommentDisplay] = useState(true);
	const [registreeDisplay, setRegistreeDisplay] = useState(false);

	const displayComments = e => {
		setCommentDisplay(true);
		setRegistreeDisplay(false);
	};

	const displayParticipants = e => {
		setCommentDisplay(false);
		setRegistreeDisplay(true);
	};

	return (
		<Fragment>
			<div className="py-2 border-top border-bottom">
				<div className="row">
					{user.profile ? (
						<div className="col px-0">
							<LikesFeed />
						</div>
					) : null}
					<div className="col px-0">
						<Link
							to="#"
							onClick={displayComments}
							data-togggle="tooltip"
							data-placement="bottom"
							title="See this event comments"
						>
							<i className="d-inline far fa-comment" />
							<h6 className="d-none d-md-inline font-weight-bold text-uppercase ml-2">COMMENTS</h6>
						</Link>
					</div>
					<div className="col px-0">
						<Link
							to="#"
							onClick={displayParticipants}
							data-togggle="tooltip"
							data-placement="bottom"
							title="See this event participants"
						>
							<i className="d-inline fas fa-users" />
							<h6 className="d-none d-md-inline font-weight-bold text-uppercase ml-2">
								PARTICIPANTS
							</h6>
						</Link>
					</div>
				</div>
			</div>
			<div className="py-2">
				<div className="row">
					<div className="col pb-5">
						{commentDisplay ? <EventCommentsFeed /> : null}
						{registreeDisplay ? <EventRegistrationsFeed /> : null}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EventSocialSelector;
