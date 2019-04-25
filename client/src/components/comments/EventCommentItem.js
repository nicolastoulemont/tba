import React, { Fragment, useContext } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import { CommentContext } from '../contexts';
import { GET_COMMENT_COMMENTS } from '../graphql/comment/Queries';
import EventCommentDisplay from './EventCommentDisplay';

const EventCommentItem = ({ refetch }) => {
	const comment = useContext(CommentContext);
	return (
		<Fragment>
			<EventCommentDisplay refetch={refetch} />
			<CQuery query={GET_COMMENT_COMMENTS} variables={{ comment_ID: comment.id }}>
				{({ data, refetch }) => {
					const comments = data.commentComments;
					if (comments.length === 0) return null;
					return (
						<Fragment>
							<div className="row">
								<div className="col-12 child-comment">
									{comments.map(comment => (
										<Fragment key={comment.id}>
											<CommentContext.Provider value={comment}>
												<EventCommentItem key={comment.id} refetch={refetch} />
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
