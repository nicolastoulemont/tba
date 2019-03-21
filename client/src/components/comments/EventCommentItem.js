import React, { Fragment } from 'react';
import EventCommentDisplay from './EventCommentDisplay';
import CQuery from '../commons/CustomQueryComponent';
import { GET_COMMENT_COMMENTS } from '../graphql/comment/Queries';

const EventCommentItem = ({
	id,
	text,
	createdAt,
	updatedAt,
	creatorName,
	creatorId,
	creatorAvatar,
	refetch,
	user,
	event_ID,
	eventCreator,
	moderated,
	moderationMsg
}) => {
	return (
		<Fragment>
			<EventCommentDisplay
				id={id}
				text={text}
				createdAt={createdAt}
				updatedAt={updatedAt}
				creatorName={creatorName}
				creatorId={creatorId}
				creatorAvatar={creatorAvatar}
				refetch={refetch}
				user={user}
				event_ID={event_ID}
				eventCreator={eventCreator}
				moderated={moderated}
				moderationMsg={moderationMsg}
			/>
			<CQuery query={GET_COMMENT_COMMENTS} variables={{ id }}>
				{({ data: { comment }, refetch }) => {
					const comments = comment.comments;
					if (comments.length === 0) return null;
					return (
						<Fragment>
							<div className="row">
								<div className="col-12 child-comment">
									{comments.map(comment => (
										<EventCommentItem
											key={comment.id}
											id={comment.id}
											text={comment.text}
											createdAt={comment.createdAt}
											updatedAt={comment.updatedAt}
											creatorName={comment.creator.profile.name}
											creatorId={comment.user_ID}
											creatorAvatar={comment.creator.avatar}
											refetch={refetch}
											user={user}
											event_ID={event_ID}
											eventCreator={eventCreator}
											moderated={comment.moderated}
											moderationMsg={comment.moderationMsg}
										/>
									))}
								</div>
							</div>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default EventCommentItem;
