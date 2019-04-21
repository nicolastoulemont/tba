import React, { Fragment, useContext } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { CommentContext, EventContext, UserContext } from '../contexts';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';
import EventCommentFeedInput from './EventCommentFeedInput';
import EventCommentItem from './EventCommentItem';

const EventCommentsFeed = () => {
	const event = useContext(EventContext);
	const user = useContext(UserContext);
	return (
		<Fragment>
			<CQuery query={GET_EVENT_COMMENTS} variables={{ event_ID: event.id }}>
				{({ data, refetch }) => {
					const comments = data.eventComments;
					return (
						<Fragment>
							{comments.length === 0 ? (
								<Fragment>
									<p>No comment yet...</p>
									<br />
								</Fragment>
							) : (
								<Fragment>
									{comments.map(comment => (
										<Fragment key={comment.id}>
											<CommentContext.Provider value={comment}>
												<EventCommentItem key={comment.id} refetch={refetch} />
											</CommentContext.Provider>
										</Fragment>
									))}
								</Fragment>
							)}
							{user.profile ? (
								<div className="input-group input-group-sm mt-2 mx-0">
									<br />
									<EventCommentFeedInput />
								</div>
							) : null}
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default EventCommentsFeed;
