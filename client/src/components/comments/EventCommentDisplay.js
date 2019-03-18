import React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { MODERATE_COMMENT } from '../graphql/comment/Mutations';
import { RespSmallAvatarLink, UserNameLink } from '../commons/CustomLinks';
import EventCommentActions from './commentActions/EventCommentActions';

const EventCommentDisplay = ({
	id,
	text,
	createdAt,
	updatedAt,
	creatorName,
	creatorId,
	creatorAvatar,
	refetch,
	user,
	eventId,
	eventCreator,
	moderated
}) => {
	return (
		<div className="list-group-item border-0 py-1 px-2" key={id}>
			<div className="row">
				<div className="col-1">
					<RespSmallAvatarLink id={creatorId} avatar={creatorAvatar} />
				</div>
				{moderated ? (
					<div className="col-9 col-md-10 mx-0 pr-0 pl-1 py-0">
						<div className="text-left mx-auto">
							<UserNameLink id={creatorId} name={creatorName} />
							<small className="d-none d-md-inline-block font-italic ml-2 py-0">{text}</small>
							<small className="d-inline-block d-md-none font-italic ml-4 py-0">{text}</small>
						</div>
					</div>
				) : (
					<div className="col-9 col-md-10 mx-0 pr-0 pl-1">
						<div className="text-left mx-auto">
							<UserNameLink id={creatorId} name={creatorName} />
							<span className="d-none d-md-inline-block ml-2">{text}</span>
							<span className="d-inline-block d-md-none ml-4">{text}</span>
							<EventCommentActions
								user={user}
								creatorId={creatorId}
								commentId={id}
								commentText={text}
								createdAt={createdAt}
								updatedAt={updatedAt}
								refetch={refetch}
							/>
						</div>
					</div>
				)}

				<div className="col-1 mx-0">
					{!moderated && (user === creatorId || user === eventCreator) ? (
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
												userId: user,
												eventId
											}
										}).then(res => {
											refetch();
										});
									}}
								>
									{user === creatorId ? (
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
	);
};

export default EventCommentDisplay;
