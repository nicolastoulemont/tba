import React, { Fragment, useContext } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { CommentContext, EventContext, UserContext } from '../contexts';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';
import EventCommentFeedInput from './EventCommentFeedInput';
import EventCommentItem from './EventCommentItem';

const EventCommentsFeed = () => {
	const event = useContext(EventContext);
	const user = useContext(UserContext);
	if (event.showComments) {
		return (
			<Fragment>
				<CQuery query={GET_EVENT_COMMENTS} variables={{ event_ID: event.id }}>
					{({ data, refetch }) => {
						const comments = data.eventComments.body;
						if (comments.length === 0) {
							return (
								<Fragment>
									<p>No comment yet...</p>
									<br />
								</Fragment>
							);
						} else if (comments.length > 0) {
							const pinnedComments = comments.filter(comment => comment.pinned);
							const normalComments = comments.filter(comment => !comment.pinned);
							return (
								<Fragment>
									{pinnedComments.length > 0
										? pinnedComments.map(comment => (
												<CommentContext.Provider value={comment} key={comment.id}>
													<EventCommentItem key={comment.id} refetch={refetch} />
												</CommentContext.Provider>
										  ))
										: null}
									{normalComments.map(comment => (
										<CommentContext.Provider value={comment} key={comment.id}>
											<EventCommentItem key={comment.id} refetch={refetch} />
										</CommentContext.Provider>
									))}
									{user.profile[0] ? (
										<div className="input-group input-group-sm mt-2 mx-0">
											<br />
											<EventCommentFeedInput />
										</div>
									) : null}
								</Fragment>
							);
						}
					}}
				</CQuery>
			</Fragment>
		);
	} else {
		return <p>Comments are disabled</p>;
	}
};

export default EventCommentsFeed;
