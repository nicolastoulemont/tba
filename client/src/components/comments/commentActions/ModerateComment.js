import React from 'react';
import { Mutation } from 'react-apollo';
import { MODERATE_COMMENT } from '../../graphql/comment/Mutations';
import { GET_EVENT_COMMENTS } from '../../graphql/comment/Queries';
import { Link } from 'react-router-dom';

const ModerateComment = ({ user_ID, event, comment }) => {
	return (
		<Mutation
			mutation={MODERATE_COMMENT}
			refetchQueries={[{ query: GET_EVENT_COMMENTS, variables: { event_ID: event.id } }]}
		>
			{(moderateComment, e) => (
				<Link
					to="#"
					className="m-0 p-0 text-right"
					onClick={async e => {
						e.preventDefault();
						await moderateComment({
							variables: {
								_id: comment.id,
								user_ID,
								event_ID: event.id
							}
						});
					}}
				>
					{user_ID === comment.user_ID ? (
						<i className="fa fa-times mx-0" aria-hidden="true" />
					) : user_ID === event.user_ID ? (
						<i className="fas fa-ban mx-0" aria-hidden="true" />
					) : null}
				</Link>
			)}
		</Mutation>
	);
};

export default ModerateComment;
