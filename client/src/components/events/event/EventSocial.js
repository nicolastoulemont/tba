import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext, UserContext } from '../../contexts';
import RegistrationFeed from '../../registrations/RegistrationFeed';
import EventReportModal from '../../reports/EventReportModal';
import EventSocialSelector from './EventSocialSelector';

const EventSocial = () => {
	const { id } = useContext(EventContext);
	const user = useContext(UserContext);

	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<div className="mb-4 pb-4">
				<div className="row pl-2 pr-4 pb-2">
					<div className="col-6">
						{user.profile[0] ? (
							<Fragment>
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
								<EventReportModal event_ID={id} />
							</Fragment>
						) : null}
					</div>

					<div className="col-6">{user.profile[0] ? <RegistrationFeed /> : null}</div>
				</div>
				<EventSocialSelector />
			</div>
		</Fragment>
	);
};

export default React.memo(EventSocial);
