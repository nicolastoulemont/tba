import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import CommentReply from './CommentReply';

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
    const { user, commentId } = this.props;
    return (
      <Fragment>
        <small className="d-block mt-1">
          <Link to="#">
            <i className="text-secondary far fa-thumbs-up mr-2" />
          </Link>
          <span className="mr-2">1</span>
          <Link to="#">
            <i className="text-secondary far fa-thumbs-down mr-2" />
          </Link>
          <Link to="#" onClick={this.showReply}>
            {' '}
            <i className="far fa-comment mx-1" />
          </Link>{' '}
          <Link to="#" onClick={this.showEdit}>
            <i className="far fa-edit mx-1" />
          </Link>{' '}
          <Link to="#" onClick={this.showReport}>
            {' '}
            <i className="fas fa-flag mx-1" />
          </Link>
        </small>
        {showReplyForm ? (
          <div>
            <CommentReply user={user} commentId={commentId} />
          </div>
        ) : null}
        {showEditForm ? <div className="">test2</div> : null}
        {showReportForm ? <div className="">test3</div> : null}
      </Fragment>
    );
  }
}

export default EventCommentActions;
