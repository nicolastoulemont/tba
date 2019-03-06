import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
    const {
      user,
      commentId,
      commentText,
      refetch,
      edited,
      moderated
    } = this.props;
    return (
      <Fragment>
        <small className="d-block mt-1">
          {!moderated ? (
            <Fragment>
              <LikesFeed user={user} commentId={commentId} />
              <Link to="#" onClick={this.showReply} className="ml-2">
                <i className="far fa-comment mx-1" />
              </Link>
              <Link to="#" onClick={this.showEdit}>
                <i className="far fa-edit mx-1" />
              </Link>
              <Link to="#" onClick={this.showReport}>
                <i className="fas fa-flag mx-1" />
              </Link>
            </Fragment>
          ) : null}
          {edited ? <span className="font-italic"> edited</span> : null}
        </small>
        {showReplyForm ? (
          <div>
            <CommentReply user={user} commentId={commentId} />
          </div>
        ) : null}
        {showEditForm ? (
          <div>
            <CommentEdit
              commentId={commentId}
              text={commentText}
              refetch={refetch}
            />
          </div>
        ) : null}
        {showReportForm ? (
          <CommentReport commentId={commentId} user={user} />
        ) : null}
      </Fragment>
    );
  }
}

export default EventCommentActions;
