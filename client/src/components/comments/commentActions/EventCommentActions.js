import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikesFeed from '../../likes/commentLikes/likesFeed/index';
import CommentReply from './CommentReply';
import CommentEdit from './CommentEdit';
import CommentReport from './CommentReport';

export default function EventCommentActions({
	user,
	comment_ID,
	commentText,
	refetch,
	createdAt,
	updatedAt
}) {
	const [replyForm, setReplyForm] = useState(false);
	const [editForm, setEditForm] = useState(false);
	const [reportForm, setReportForm] = useState(false);

	const showReply = e => {
		setReplyForm(true);
		setEditForm(false);
		setReportForm(false);
	};
	const showEdit = e => {
		setReplyForm(false);
		setEditForm(true);
		setReportForm(false);
	};
	const showReport = e => {
		setReplyForm(false);
		setEditForm(false);
		setReportForm(true);
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
				<LikesFeed user={user} comment_ID={comment_ID} />
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
			{replyForm ? (
				<div>
					<CommentReply user={user} comment_ID={comment_ID} hideForms={hideForms} />
				</div>
			) : null}
			{editForm ? (
				<div>
					<CommentEdit
						comment_ID={comment_ID}
						text={commentText}
						refetch={refetch}
						hideForms={hideForms}
					/>
				</div>
			) : null}
			{reportForm ? (
				<CommentReport comment_ID={comment_ID} user={user} hideForms={hideForms} />
			) : null}
		</Fragment>
	);
}
