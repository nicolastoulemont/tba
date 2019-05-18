import React, { Fragment, useContext } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PlaceholderBanner from '../../../img/placeholder_event_banner.svg';
import { EventContext } from '../../contexts';

const EventLayout = () => {
	const event = useContext(EventContext);
	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<div className="px-3">
				<div className="row">
					{event.banner_URL ? (
						<img src={event.banner_URL} alt="Event Banner" />
					) : (
						<img src={PlaceholderBanner} alt="Default Event Banner" />
					)}
				</div>
				<div className="row p-1">
					<div className="col">
						<div className="text-center text-md-left my-2">
							<div className="title">
								<h4 className="font-weight-bold text-uppercase">
									{event.name}
									{' - '}
									{event.type === 'institutional' ? (
										<i
											data-togggle="tooltip"
											data-placement="bottom"
											title="Institutional Event"
											className="fas fa-university ml-2"
										/>
									) : null}
								</h4>
								<span className="font-weight-bold d-inline">
									{event.creator[0].profile[0].name}
								</span>
								{event.creator[0].profile[0].organisation
									? ` - ${event.creator[0].profile[0].organisation}`
									: null}
								{event.createdAt !== event.updatedAt ? (
									<small className="font-italic d-inline">
										{' '}
										edited {dayjs(event.updatedAt).fromNow()}
									</small>
								) : (
									<small className="font-italic d-inline">
										{' '}
										{dayjs(event.createdAt).fromNow()}
									</small>
								)}
							</div>
							<h6 className="my-1">Host : {event.eventHost}</h6>
							<p className="my-1">
								{event.address}, {event.city}
							</p>
							{new Date(event.start).getDate() === new Date(event.end).getDate() ? (
								<p className="mb-0">
									{new Date(event.start).toUTCString().slice(0, 22)} -{' '}
									{new Date(event.end).toTimeString().slice(0, 5)}
								</p>
							) : (
								<p className="mb-0">
									On {new Date(event.start).toUTCString().slice(0, 22)} to{' '}
									{new Date(event.end).toUTCString().slice(0, 22)}
								</p>
							)}
							{event.price === 0 ? (
								<small className="font-italic">Free Event</small>
							) : (
								<small className="font-italic">Entrance Fee : {event.price} €</small>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="px-4 py-2">
				<h5 className="text-left">About</h5>
				<div className="d-flex flex-wrap text-justify align-items-center">
					<p> {event.description}</p>
				</div>
				<br />
			</div>
		</Fragment>
	);
};

export default EventLayout;
