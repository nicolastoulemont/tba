import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RegistrationFeed from '../../registrations/RegistrationFeed';
import EventSocialSelector from './EventSocialSelector';

import EventReportModal from '../../reports/EventReportModal';

const EventSocial = ({ user, event_ID, eventCreator }) => {
	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<div className="mb-3 pb-5">
				<div className="row pl-2 pr-4 pb-2">
					<div className="col-6">
						<Link className="d-inline" to="#" data-toggle="modal" data-target="#EventReportModal">
							<small>
								<i className="fas fa-flag float-left ml-3" />
							</small>
						</Link>
						<EventReportModal event_ID={event_ID} />
					</div>

					<div className="col-6">
						<RegistrationFeed user={user} event_ID={event_ID} />
					</div>
				</div>
				<EventSocialSelector user={user} event_ID={event_ID} eventCreator={eventCreator} />
			</div>
		</Fragment>
	);
};

export default EventSocial;
