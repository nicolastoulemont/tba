import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CommentContext } from '../../contexts';
import LikesFeed from '../../likes/commentLikes/LikesFeed';
import CommentEdit from './CommentEdit';
import CommentReport from './CommentReport';

const EventCommentActions = () => {
	const { createdAt, updatedAt } = useContext(CommentContext);
	const [editForm, setEditForm] = useState(false);
	const [reportForm, setReportForm] = useState(false);

	const showEdit = e => {
		if (editForm) {
			hideForms();
		} else {
			setEditForm(true);
			setReportForm(false);
		}
	};
	const showReport = e => {
		if (reportForm) {
			hideForms();
		} else {
			setEditForm(false);
			setReportForm(true);
		}
	};

	const hideForms = e => {
		setEditForm(false);
		setReportForm(false);
	};
	dayjs.extend(relativeTime);
	return (
		<Fragment>
			<small className="d-block mt-1">
				<LikesFeed />
				<Link
					to="#"
					onClick={e => showEdit(e)}
					data-togggle="tooltip"
					data-placement="bottom"
					title="Edit your comment"
				>
					<i className="far fa-edit mx-1" />
				</Link>
				<Link
					to="#"
					onClick={e => showReport(e)}
					data-togggle="tooltip"
					data-placement="bottom"
					title="Report this comment"
				>
					<i className="far fa-flag mx-1" />
				</Link>

				{createdAt !== updatedAt ? (
					<small className="font-italic"> edited {dayjs(updatedAt).fromNow()}</small>
				) : (
					<small className="font-italic"> posted {dayjs(createdAt).fromNow()}</small>
				)}
			</small>
			{editForm ? <CommentEdit hideForms={hideForms} /> : null}
			{reportForm ? <CommentReport hideForms={hideForms} /> : null}
		</Fragment>
	);
};

export default EventCommentActions;
