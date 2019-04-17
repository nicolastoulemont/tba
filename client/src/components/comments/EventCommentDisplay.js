import React, { Fragment, useContext } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { RespSmallAvatarLink, UserNameLink } from '../commons/CustomLinks';
import { CommentContext, EventContext, UserContext } from '../contexts';
import { MODERATE_COMMENT } from '../graphql/comment/Mutations';
import EventCommentActions from './commentActions/EventCommentActions';

const EventCommentDisplay = ({ refetch }) => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);
	const comment = useContext(CommentContext);
	const moderatedComment = () => {
		return (
			<div className="list-group-item border-0 py-1 px-2" key={comment.id}>
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
			<div className="list-group-item border-0 py-1 px-2" key={comment.id}>
				<div className="row">
					<div className="col-1">
						<RespSmallAvatarLink
							id={comment.user_ID}
							avatar={comment.creator.profile.picture_URL}
						/>
					</div>
					<div className="col-9 col-md-10 mx-0 pr-0 pl-2">
						<div className="text-left mx-auto">
							<UserNameLink id={comment.user_ID} name={comment.creator.profile.name} />
							<span className="d-none d-md-inline-block ml-2">{comment.text}</span>
							<span className="d-inline-block d-md-none ml-4">{comment.text}</span>
							<EventCommentActions />
						</div>
					</div>
					<div className="col-1 mx-0">
						{user.id === comment.user_ID || user.id === event.user_ID ? (
							<Mutation
								mutation={MODERATE_COMMENT}
								// refetchQueries={() => {
								// 	return [{ query: GET_COMMENT_COMMENTS, variables: { id: parentCommentId } }];
								// }}
							>
								{(moderateComment, e) => (
									<Link
										to="#"
										className="m-0 p-0 text-right"
										onClick={async e => {
											e.preventDefault();
											await moderateComment({
												variables: {
													_id: comment.id,
													user_ID: user.id,
													event_ID: event.id
												}
											}).then(res => {
												refetch();
											});
										}}
									>
										{user.id === comment.user_ID ? (
											<i className="fa fa-times mx-0" aria-hidden="true" />
										) : user.id === event.user_ID ? (
											<i className="fas fa-ban mx-0" aria-hidden="true" />
										) : null}
									</Link>
								)}
							</Mutation>
						) : null}
					</div>
				</div>
			</div>
		);
	};

	return <Fragment>{comment.moderated ? moderatedComment() : regularComment()}</Fragment>;
};

export default EventCommentDisplay;
