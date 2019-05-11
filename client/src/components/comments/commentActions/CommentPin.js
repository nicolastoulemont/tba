import React, { useContext, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CommentContext, EventContext, UserContext } from '../../contexts';
import { PIN_COMMENT } from '../../graphql/comment/Mutations';
import { GET_EVENT_COMMENTS } from '../../graphql/comment/Queries';
import classNames from 'classnames';

const CommentPin = () => {
	const comment = useContext(CommentContext);
	const event = useContext(EventContext);
	const user = useContext(UserContext);
	return (
		<Fragment>
			<Mutation
				mutation={PIN_COMMENT}
				refetchQueries={() => {
					return [{ query: GET_EVENT_COMMENTS, variables: { event_ID: event.id } }];
				}}
			>
				{(pinComment, e) => {
					return (
						<Link
							to="#"
							className="mx-2"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Pin this comment"
							onClick={e => {
								e.preventDefault();
								pinComment({
									variables: {
										_id: comment.id,
										user_ID: user.id,
										event_ID: event.id,
										pinned: comment.pinned
									}
								});
							}}
						>
							<i className={classNames('fas fa-thumbtack', { 'text-blue': comment.pinned })} />
						</Link>
					);
				}}
			</Mutation>
		</Fragment>
	);
};

export default CommentPin;
