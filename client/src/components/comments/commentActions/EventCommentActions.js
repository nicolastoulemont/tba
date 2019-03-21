import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikesFeed from '../../likes/commentLikes/LikesFeed';
import CommentReply from './CommentReply';
import CommentEdit from './CommentEdit';
import CommentReport from './CommentReport';

class EventCommentActions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showReplyForm: false,
			showEditForm: false,
			showReportForm: false
		};
	}

	showReply = e => {
		this.setState({
			showReplyForm: !this.state.showReplyForm,
			showEditForm: false,
			showReportForm: false
		});
	};

	showEdit = e => {
		this.setState({
			showEditForm: !this.state.showEditForm,
			showReplyForm: false,
			showReportForm: false
		});
	};

	showReport = e => {
		this.setState({
			showReportForm: !this.state.showReportForm,
			showReplyForm: false,
			showEditForm: false
		});
	};

	render() {
		const { showReplyForm, showEditForm, showReportForm } = this.state;
		const { user, comment_ID, commentText, refetch, createdAt, updatedAt } = this.props;
		dayjs.extend(relativeTime);
		return (
			<Fragment>
				<small className="d-block mt-1">
					<LikesFeed user={user} comment_ID={comment_ID} />
					<Link to="#" onClick={this.showReply} className="ml-2">
						<i className="far fa-comment mx-1" />
					</Link>
					<Link to="#" onClick={this.showEdit}>
						<i className="far fa-edit mx-1" />
					</Link>
					<Link to="#" onClick={this.showReport}>
						<i className="fas fa-flag mx-1" />
					</Link>

					{createdAt !== updatedAt ? (
						<small className="font-italic"> edited {dayjs(updatedAt).fromNow()}</small>
					) : (
						<small className="font-italic"> posted {dayjs(createdAt).fromNow()}</small>
					)}
				</small>
				{showReplyForm ? (
					<div>
						<CommentReply user={user} comment_ID={comment_ID} />
					</div>
				) : null}
				{showEditForm ? (
					<div>
						<CommentEdit comment_ID={comment_ID} text={commentText} refetch={refetch} />
					</div>
				) : null}
				{showReportForm ? <CommentReport comment_ID={comment_ID} user={user} /> : null}
			</Fragment>
		);
	}
}

export default EventCommentActions;
