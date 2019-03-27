import React, { Fragment } from 'react';
import EventCommentFeedInput from './EventCommentFeedInput';
import EventCommentItem from './EventCommentItem';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';

export default function EventCommentsFeed({ event_ID, user, eventCreator }) {
	return (
		<Fragment>
			<CQuery query={GET_EVENT_COMMENTS} variables={{ id: event_ID }}>
				{({ data: { event }, refetch }) => {
					const comments = event.comments;
					return (
						<Fragment>
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

							<div className="input-group input-group-sm mt-2 mx-0">
								<br />
								<EventCommentFeedInput user={user} event_ID={event_ID} />
							</div>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
}
