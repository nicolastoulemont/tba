import React, { Fragment, useContext } from 'react';
import DefaultAvatar from '../../img/avatar_default.svg';
import { CommentContext, EventContext, UserContext } from '../contexts';
import { Link } from 'react-router-dom';
import EventCommentActions from './commentActions/EventCommentActions';
import ModerateComment from './commentActions/ModerateComment';

const EventCommentItem = () => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);
	const comment = useContext(CommentContext);
	const moderatedComment = () => {
		return (
			<div className="list-group-item border-0 py-0 px-2" key={comment.id}>
				<div className="text-left mx-auto">
					<small>
						<small className="font-italic">{'[ deleted ]'}</small>
						<small className="d-none d-md-inline-block font-italic ml-2 py-0">
							{comment.moderationMsg}
						</small>
						<small className="d-inline-block d-md-none font-italic ml-4 py-0">
							{comment.moderationMsg}
						</small>
					</small>
				</div>
			</div>
		);
	};

	const regularComment = () => {
		return (
			<div className="list-group-item border-0 mob-comment" key={comment.id}>
				<div className="row">
					<div className="d-none d-md-block col-md-1">
						<Link
							to={{ pathname: `/home/profile/${comment.user_ID}` }}
							data-togggle="tooltip"
							data-placement="bottom"
							title="See this person profile"
						>
							{comment.creator[0].profile[0].picture_URL ? (
								<img
									className="rounded-circle border-avatar small-avatar mx-auto"
									src={comment.creator[0].profile[0].picture_URL}
									alt="User Avatar"
								/>
							) : (
								<img
									className="rounded-circle border-avatar small-avatar mx-auto"
									src={DefaultAvatar}
									alt="User Avatar"
								/>
							)}
						</Link>
					</div>
					<div className="col-11 col-md-10 pr-0">
						<div className="text-left">
							<Link
								to={{
									pathname: `/home/profile/${comment.user_ID}`
								}}
								className="d-inline-block font-weight-bold text-darkblue"
								data-togggle="tooltip"
								data-placement="bottom"
								title="See this person profile"
							>
								{comment.creator[0].profile[0].name}
							</Link>
							{comment.pinned ? (
								<i className="d-inline-block ml-2 fas fa-thumbtack text-blue" />
							) : null}
							<span className="d-inline-block ml-2">{comment.text}</span>
							{user.profile[0] ? <EventCommentActions /> : null}
						</div>
					</div>
					<div className="col-1 mx-0 pl-0">
						{user.id === comment.user_ID || user.id === event.user_ID ? (
							<ModerateComment user_ID={user.id} event={event} comment={comment} />
						) : null}
					</div>
				</div>
			</div>
		);
	};

	return <Fragment>{comment.moderated ? moderatedComment() : regularComment()}</Fragment>;
};

export default EventCommentItem;
