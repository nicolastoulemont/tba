import React from 'react';
import { Mutation } from 'react-apollo';
import { MODERATE_COMMENT_AND_DELETE_REPORT } from '../../graphql/comment/Mutations';
import { GET_EVENT_COMMENTS } from '../../graphql/comment/Queries';
import { EVENT_REPORTS } from '../../graphql/report/Queries';
import { Link } from 'react-router-dom';

const ModerateAndDelete = ({ user_ID, event, comment, report_ID }) => {
	return (
		<Mutation
			mutation={MODERATE_COMMENT_AND_DELETE_REPORT}
			refetchQueries={[
				{ query: GET_EVENT_COMMENTS, variables: { event_ID: event.id } },
				{ query: EVENT_REPORTS, variables: { event_ID: event.id } }
			]}
		>
			{(moderateComment, e) => (
				<Link
					to="#"
					className="badge tag actiontags my-2"
					onClick={async e => {
						e.preventDefault();
						await moderateComment({
							variables: {
								_id: comment.id,
								user_ID,
								event_ID: event.id,
								report_ID
							}
						});
					}}
				>
					Moderate Comment <i className="fas fa-ban ml-1" />
				</Link>
			)}
		</Mutation>
	);
};

export default ModerateAndDelete;
