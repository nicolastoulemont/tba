import React, { Fragment, useContext } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { CommentContext, EventContext } from '../contexts';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';
import EventCommentFeedInput from './EventCommentFeedInput';
import EventCommentItem from './EventCommentItem';

const EventCommentsFeed = () => {
	const event = useContext(EventContext);
	return (
		<Fragment>
			<CQuery query={GET_EVENT_COMMENTS} variables={{ id: event.id }}>
				{({ data: { event } }) => {
					const comments = event.comments;
					if (comments.lenght === 0) return <p>No comment yet...</p>;
					return (
						<Fragment>
							{comments.map(comment => (
								<Fragment key={comment.id}>
									<CommentContext.Provider value={comment}>
										<EventCommentItem key={comment.id} />
									</CommentContext.Provider>
								</Fragment>
							))}

							<div className="input-group input-group-sm mt-2 mx-0">
								<br />
								<EventCommentFeedInput />
							</div>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default EventCommentsFeed;
