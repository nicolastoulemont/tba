import React, { Fragment, Component } from 'react';
import EventCommentFeedInput from './EventCommentFeedInput';
import EventCommentItem from './EventCommentItem';
import CQuery from '../commons/CustomQueryComponent';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';

class EventCommentsFeed extends Component {
	render() {
		const { event_ID, user, eventCreator } = this.props;
		return (
			<Fragment>
				<div>
					<CQuery query={GET_EVENT_COMMENTS} variables={{ id: event_ID }}>
						{({ data: { event }, refetch }) => {
							const comments = event.comments;
							return (
								<Fragment>
									{comments.map(comment => (
										<EventCommentItem
											key={comment.id}
											id={comment.id}
											text={comment.text}
											createdAt={comment.createdAt}
											updatedAt={comment.updatedAt}
											creatorName={comment.creator.profile.name}
											creatorId={comment.user_ID}
											creatorAvatar={comment.creator.profile.picture_URL}
											refetch={refetch}
											user={user}
											event_ID={event_ID}
											eventCreator={eventCreator}
											moderated={comment.moderated}
											moderationMsg={comment.moderationMsg}
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
				</div>
			</Fragment>
		);
	}
}

export default EventCommentsFeed;
