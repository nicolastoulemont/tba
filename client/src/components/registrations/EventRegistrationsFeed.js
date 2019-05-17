import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../../img/default_avatar.svg';
import CQuery from '../commons/CustomQueryComponent';
import { EventContext, UserContext } from '../contexts';
import RegistrationsModal from './RegistrationsList/RegistrationsModal';
import { GET_EVENT_REGISTRATIONS } from '../graphql/registration/Queries';

const EventRegistrationFeed = ({ setNumberOfParticipant }) => {
	const event = useContext(EventContext);
	const user = useContext(UserContext);
	return (
		<Fragment>
			<CQuery query={GET_EVENT_REGISTRATIONS} variables={{ event_ID: event.id }}>
				{({ data }) => {
					if (data.eventRegistrations) {
						const registrations = data.eventRegistrations.body;
						setNumberOfParticipant(registrations.length);
						if (typeof registrations !== 'undefined' && registrations.length === 0)
							return <div className="font-italic">No participant yet</div>;
						if (typeof registrations !== 'undefined' && registrations.length !== 0)
							return (
								<Fragment>
									{user.id === event.user_ID ? (
										<div className="py-2 px-2 text-left">
											<Link
												to="#"
												className="badge tag actiontags p-2"
												data-toggle="modal"
												data-target="#RegistrationsModal"
												data-togggle="tooltip"
												data-placement="bottom"
												title="Download the full list of participants"
											>
												Download full list <i className="fas fa-file-download ml-1" />
											</Link>
											<RegistrationsModal event={event} registrations={registrations} />
										</div>
									) : null}
									{registrations.map(registration => (
										<div className="list-group-item border-0 py-1 px-4" key={registration.id}>
											<div className="row">
												<div className="d-none d-md-block col-md-1 px-0">
													<Link
														to={{ pathname: `/home/profile/${registration.user_ID}` }}
														data-togggle="tooltip"
														data-placement="bottom"
														title="See this person profile"
													>
														{registration.creator[0].profile[0].picture_URL ? (
															<img
																className="rounded-circle border-avatar small-avatar mx-auto"
																src={registration.creator[0].profile[0].picture_URL}
																alt="User Avatar"
															/>
														) : (
															<img
																className="rounded-circle border-avatar small-avatar mx-auto"
																src={DefaultAvatar}
																alt="User Avatar"
															/>
														)}
													</Link>
												</div>
												<div className="col-11 col-md-11 mx-0 pr-0 pl-1">
													<div className="text-left mx-auto">
														<div className="block">
															<Link
																to={{
																	pathname: `/home/profile/${registration.user_ID}`
																}}
																className="d--inline-block font-weight-bold text-darkblue"
																data-togggle="tooltip"
																data-placement="bottom"
																title="See this person profile"
															>
																{registration.creator[0].profile[0].name}
															</Link>
														</div>
														<div className="d-block">
															{registration.creator[0].profile[0].position}{' '}
															{registration.creator[0].profile[0].organisation
																? `- ${registration.creator[0].profile[0].organisation}`
																: null}
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
								</Fragment>
							);
						return null;
					}
					return null;
				}}
			</CQuery>
		</Fragment>
	);
};

export default EventRegistrationFeed;
