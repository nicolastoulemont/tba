import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext, UserContext } from '../contexts';
import ModerateAndDelete from './reportActions/ModerateAndDelete';
import DeleteReport from './reportActions/DismissReport';

const Report = ({ report }) => {
	const event = useContext(EventContext);
	const user = useContext(UserContext);
	return (
		<div className="row px-4 py-2 border-bottom">
			<div className="col-9">
				<div className="text-left">
					<p className="m-0">
						<small>
							<Link className="font-weight-bold" to={`/home/profile/${report.user_ID}`}>
								{report.creator.profile[0].name}
							</Link>{' '}
							has reported this comment of{' '}
							<Link to={`/home/profile/${report.comment.user_ID}`} className="font-weight-bold">
								{report.comment.creator[0].profile[0].name}
							</Link>
						</small>
					</p>

					<span className="d-block font-italic">
						<small className="font-italic">"{report.comment.text}"</small>
					</span>
					<span className="d-block">
						<small className="font-weight-bold">For the following reason : </small>
						<small className="font-italic">"{report.text}"</small>
					</span>
				</div>
			</div>
			<div className="col-3">
				<div className="text-left">
					<span>
						<DeleteReport report_ID={report.id} event_ID={event.id} />
					</span>
					<span>
						<ModerateAndDelete
							user_ID={user.id}
							event={event}
							comment={report.comment}
							report_ID={report.id}
						/>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Report;
