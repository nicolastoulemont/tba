import React, { Fragment } from 'react';
import DefaultNav from '../../navs/DefaultNav';
import PublicSideBar from '../../sidebar/publicSideBar';
import { Spring } from 'react-spring/renderprops';
import { EventContext } from '../../contexts';
import CQuery from '../../commons/CustomQueryComponent';
import { GET_PUBLIC_EVENT } from '../../graphql/event/Queries';
import EventLayout from './EventLayout';
import EventRegistration from './EventRegistration';

const PublicEvent = ({ match }) => {
	return (
		<Fragment>
			<DefaultNav />
			<div className="container mt-2 mb-4 ">
				<div className="text-center">
					<div className="row">
						<div className="col-12 col-lg-8 bg-white px-0">
							<CQuery query={GET_PUBLIC_EVENT} variables={{ id: match.params.id }}>
								{({ data }) => {
									return (
										<Fragment>
											{data.event.statusCode === 200 ? (
												<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 300 }}>
													{props => (
														<div style={props}>
															<EventContext.Provider value={data.event.body}>
																<EventLayout />
																<EventRegistration />
															</EventContext.Provider>
														</div>
													)}
												</Spring>
											) : null}
										</Fragment>
									);
								}}
							</CQuery>
						</div>
						<div className="d-none d-lg-block col-lg-4 text-center">
							<PublicSideBar />
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default PublicEvent;
