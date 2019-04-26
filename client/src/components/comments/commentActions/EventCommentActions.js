import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CommentContext } from '../../contexts';
import LikesFeed from '../../likes/commentLikes/LikesFeed';
import CommentEdit from './CommentEdit';
import CommentReply from './CommentReply';
import CommentReport from './CommentReport';

const EventCommentActions = () => {
	const { createdAt, updatedAt } = useContext(CommentContext);
	const [replyForm, setReplyForm] = useState(false);
	const [editForm, setEditForm] = useState(false);
	const [reportForm, setReportForm] = useState(false);

	const showReply = e => {
		if (replyForm) {
			hideForms();
		} else {
			setReplyForm(true);
			setEditForm(false);
			setReportForm(false);
		}
	};
	const showEdit = e => {
		if (editForm) {
			hideForms();
		} else {
			setReplyForm(false);
			setEditForm(true);
			setReportForm(false);
		}
	};
	const showReport = e => {
		if (reportForm) {
			hideForms();
		} else {
			setReplyForm(false);
			setEditForm(false);
			setReportForm(true);
		}
	};

	const hideForms = e => {
		setReplyForm(false);
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
					onClick={e => showReply(e)}
					className="ml-2"
					data-togggle="tooltip"
					data-placement="bottom"
					title="Reply to this comment"
				>
					<i className="far fa-comment mx-1" />
				</Link>
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
			{replyForm ? <CommentReply hideForms={hideForms} /> : null}
			{editForm ? <CommentEdit hideForms={hideForms} /> : null}
			{reportForm ? <CommentReport hideForms={hideForms} /> : null}
		</Fragment>
	);
};

export default EventCommentActions;
