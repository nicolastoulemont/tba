import React, { Fragment, useContext } from 'react';
import EventCommentDisplay from './EventCommentDisplay';
import CQuery from '../commons/CustomQueryComponent';
import { GET_COMMENT_COMMENTS } from '../graphql/comment/Queries';
import { CommentContext } from '../contexts';

const EventCommentItem = () => {
	const { id } = useContext(CommentContext);
	return (
		<Fragment>
			<EventCommentDisplay />
			<CQuery query={GET_COMMENT_COMMENTS} variables={{ id }}>
				{({ data: { comment } }) => {
					const comments = comment.comments;
					if (comments.length === 0) return null;
					return (
						<Fragment>
							<div className="row">
								<div className="col-12 child-comment">
									{comments.map(comment => (
										<CommentContext.Provider value={comment}>
											<EventCommentItem key={comment.id} />
										</CommentContext.Provider>
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
