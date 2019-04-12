import React, { Fragment, useContext } from 'react';
import EventCommentFeedInput from './EventCommentFeedInput';
import EventCommentItem from './EventCommentItem';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';
import { EventContext, CommentContext } from '../contexts';

const EventCommentsFeed = () => {
	const { id } = useContext(EventContext);
	return (
		<Fragment>
			<CQuery query={GET_EVENT_COMMENTS} variables={{ id }}>
				{({ data: { event } }) => {
					const comments = event.comments;
					return (
						<Fragment>
							{comments.map(comment => (
								<CommentContext.Provider value={comment}>
									<EventCommentItem key={comment.id} />
								</CommentContext.Provider>
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
