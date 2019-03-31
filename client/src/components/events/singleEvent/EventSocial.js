import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RegistrationFeed from '../../registrations/RegistrationFeed';
import EventSocialSelector from './EventSocialSelector';

import EventReportModal from '../../reports/EventReportModal';

const EventSocial = ({ currentUser, event }) => {
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
								<i className="far fa-flag float-left ml-3" />
							</small>
						</Link>
						<EventReportModal event_ID={event.id} />
					</div>

					<div className="col-6">
						<RegistrationFeed user={currentUser} event={event} />
					</div>
				</div>
				<EventSocialSelector user={currentUser} event_ID={event.id} eventCreator={event.user_ID} />
			</div>
		</Fragment>
	);
};

export default EventSocial;
