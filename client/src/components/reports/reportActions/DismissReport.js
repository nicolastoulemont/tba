import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_REPORT } from '../../graphql/report/Mutations';
import { EVENT_REPORTS } from '../../graphql/report/Queries';
import { Link } from 'react-router-dom';

const DeleteReport = ({ report_ID, event_ID }) => {
	return (
		<Mutation
			mutation={DELETE_REPORT}
			refetchQueries={[{ query: EVENT_REPORTS, variables: { event_ID } }]}
		>
			{(deleteReport, e) => (
				<Link
					to="#"
					className="badge tag actiontags my-2"
					onClick={async e => {
						e.preventDefault();
						await deleteReport({
							variables: {
								_id: report_ID
							}
						});
					}}
				>
					Dismiss Report <i className="fas fa-times ml-1" />
				</Link>
			)}
		</Mutation>
	);
};

export default DeleteReport;
