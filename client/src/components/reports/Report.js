import React from 'react';
import { Link } from 'react-router-dom';

const Report = ({ report }) => {
	return (
		<div className="px-4 py-2 text-left">
			<p className="m-0">
				<Link className="font-weight-bold" to={`/home/profile/${report.user_ID}`}>
					{report.creator.profile[0].name}
				</Link>{' '}
				has reported this comment of{' '}
				<Link to={`/home/profile/${report.comment.user_ID}`} className="font-weight-bold">
					{report.comment.creator[0].profile[0].name}
				</Link>
			</p>

			<span className="d-block font-italic">"{report.comment.text}"</span>
			<span className="d-block">
				For the following reason : <small className="font-italic">"{report.text}"</small>
			</span>
		</div>
	);
};

export default Report;
