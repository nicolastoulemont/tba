import React, { useContext, Fragment } from 'react';
import { EventContext, UserContext } from '../contexts';
import CQuery from '../commons/CustomQueryComponent';
import { EVENT_REPORTS } from '../graphql/report/Queries';
import Report from './Report';

const EventCommentReports = () => {
	const event = useContext(EventContext);
	const user = useContext(UserContext);
	return (
		<Fragment>
			<CQuery query={EVENT_REPORTS} variables={{ event_ID: event.id }}>
				{({ data }) => {
					console.log(data);
					const reports = data.findEventCommentsReports.body;
					if (reports.length === 0) {
						return (
							<Fragment>
								<p>No reports</p>
							</Fragment>
						);
					} else if (reports.length > 0) {
						return (
							<Fragment>
								{reports.map(report => (
									<Report report={report} key={report.id} />
								))}
							</Fragment>
						);
					}
				}}
			</CQuery>
		</Fragment>
	);
};

export default EventCommentReports;
