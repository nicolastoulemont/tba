import React, { Fragment } from 'react';
import EventCommentDisplay from './EventCommentDisplay';
import CQuery from '../commons/CustomQueryComponent';
import { GET_COMMENT_COMMENTS } from '../graphql/comment/Queries';

export default function EventCommentItem({
	comment: { id },
	comment,
	user,
	event_ID,
	refetch,
	eventCreator
}) {
	return (
		<Fragment>
			<EventCommentDisplay
				id={id}
				comment={comment}
				refetch={refetch}
				user={user}
				event_ID={event_ID}
				eventCreator={eventCreator}
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
											comment={comment}
											user={user}
											event_ID={event_ID}
											refetch={refetch}
											eventCreator={eventCreator}
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
}
