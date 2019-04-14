import React, { Fragment, useContext } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { CommentContext } from '../contexts';
import { GET_COMMENT_COMMENTS } from '../graphql/comment/Queries';
import EventCommentDisplay from './EventCommentDisplay';

const EventCommentItem = () => {
	const comment = useContext(CommentContext);
	return (
		<Fragment>
			<EventCommentDisplay />
			<CQuery query={GET_COMMENT_COMMENTS} variables={{ id: comment.id }}>
				{({ data: { comment } }) => {
					const comments = comment.comments;
					if (comments.length === 0) return null;
					return (
						<Fragment>
							<div className="row">
								<div className="col-12 child-comment">
									{comments.map(comment => (
										<Fragment key={comment.id}>
											<CommentContext.Provider value={comment}>
												<EventCommentItem key={comment.id} />
											</CommentContext.Provider>
										</Fragment>
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
