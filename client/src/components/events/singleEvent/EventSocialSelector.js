import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import EventCommentsFeed from '../../comments/EventCommentsFeed';
import LikesFeed from '../../likes/eventLikes/LikesFeed';
import EventRegistrationsFeed from '../../registrations/EventRegistrationsFeed';

export default class EventSocialSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsDisplay: true,
      registreeDisplay: false
    };
  }

  commentsDisplay = e => {
    this.setState({
      commentsDisplay: true,
      registreeDisplay: false
    });
  };

  registreeDisplay = e => {
    this.setState({
      commentsDisplay: false,
      registreeDisplay: true
    });
  };

  render() {
    const { user, event_ID, eventCreator } = this.props;
    const { commentsDisplay, registreeDisplay } = this.state;

    return (
      <Fragment>
        <div className="py-2 border-top border-bottom">
          <div className="row">
            <div className="col px-0">
              <LikesFeed user={user} event_ID={event_ID} />
            </div>
            <div className="col px-0">
              <Link to="#" onClick={this.commentsDisplay}>
                <i className="d-inline far fa-comment" />
                <h6 className="d-none d-md-inline font-weight-bold text-uppercase ml-2">
                  COMMENTS
                </h6>
              </Link>
            </div>
            <div className="col px-0">
              <Link to="#" onClick={this.registreeDisplay}>
                <i className="d-inline fas fa-users" />
                <h6 className="d-none d-md-inline font-weight-bold text-uppercase ml-2">
                  PARTICIPANTS
                </h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-2">
          <div className="row">
            <div className="col pb-5">
              {commentsDisplay ? (
                <EventCommentsFeed
                  user={user}
                  event_ID={event_ID}
                  eventCreator={eventCreator}
                />
              ) : null}
              {registreeDisplay ? (
                <EventRegistrationsFeed event_ID={event_ID} />
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
