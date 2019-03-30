import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RegistrationFeed from '../../registrations/RegistrationFeed';
import EventSocialSelector from './EventSocialSelector';

import EventReportModal from '../../reports/EventReportModal';

const EventSocial = ({ currentUser, event_ID, eventCreator }) => {
	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<div className="mb-4 pb-4">
				<div className="row pl-2 pr-4 pb-2">
					<div className="col-6">
						<Link
							className="d-inline"
							to="#"
							data-toggle="modal"
							data-target="#EventReportModal"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Report this event"
						>
							<small>
								<i className="fas fa-flag float-left ml-3" />
							</small>
						</Link>
						<EventReportModal event_ID={event_ID} />
					</div>

					<div className="col-6">
						<RegistrationFeed user={currentUser} event_ID={event_ID} />
					</div>
				</div>
				<EventSocialSelector user={currentUser} event_ID={event_ID} eventCreator={eventCreator} />
			</div>
		</Fragment>
	);
};

export default EventSocial;
