import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { MODERATE_COMMENT } from '../graphql/comment/Mutations';
import { RespSmallAvatarLink, UserNameLink } from '../commons/CustomLinks';
import EventCommentActions from './commentActions/EventCommentActions';

export default function EventCommentDisplay({
	id,
	comment: { text, createdAt, updatedAt, user_ID, moderated, moderationMsg },
	comment,
	user,
	event_ID,
	refetch,
	eventCreator
}) {
	return (
		<Fragment>
			{moderated ? (
				<div className="list-group-item border-0 py-1 px-2" key={id}>
					<div className="text-left mx-auto">
						<small>
							<small className="font-italic">{'[ deleted ]'}</small>
							<small className="d-none d-md-inline-block font-italic ml-2 py-0">
								{moderationMsg}
							</small>
							<small className="d-inline-block d-md-none font-italic ml-4 py-0">
								{moderationMsg}
							</small>
						</small>
					</div>
				</div>
			) : (
				<div className="list-group-item border-0 py-1 px-2" key={id}>
					<div className="row">
						<div className="col-1">
							<RespSmallAvatarLink id={user_ID} avatar={comment.creator.profile.picture_URL} />
						</div>
						<div className="col-9 col-md-10 mx-0 pr-0 pl-1">
							<div className="text-left mx-auto">
								<UserNameLink id={user_ID} name={comment.creator.profile.name} />
								<span className="d-none d-md-inline-block ml-2">{text}</span>
								<span className="d-inline-block d-md-none ml-4">{text}</span>
								<EventCommentActions
									user={user}
									creatorId={user_ID}
									comment_ID={id}
									commentText={text}
									createdAt={createdAt}
									updatedAt={updatedAt}
									refetch={refetch}
								/>
							</div>
						</div>
						<div className="col-1 mx-0">
							{user === user_ID || user === eventCreator ? (
								<Mutation mutation={MODERATE_COMMENT}>
									{(moderateComment, e) => (
										<Link
											to="#"
											className="m-0 p-0 text-right"
											onClick={e => {
												e.preventDefault();
												moderateComment({
													variables: {
														_id: id,
														user_ID: user,
														event_ID
													}
												}).then(res => {
													refetch();
												});
											}}
										>
											{user === user_ID ? (
												<i className="fa fa-times mx-0" aria-hidden="true" />
											) : user === eventCreator ? (
												<i className="fas fa-ban mx-0" aria-hidden="true" />
											) : null}
										</Link>
									)}
								</Mutation>
							) : null}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
}
