import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../commons/CustomQueryComponent';
import EventFeedItem from './EventFeedItem';

import { GET_DAY_EVENTS } from '../graphql/event/Queries';

class EventFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getDay: new Date()
    };
  }

  addDay = (e, x) => {
    const { getDay } = this.state;
    this.setState({
      getDay: new Date(getDay.setDate(getDay.getDate() + x))
    });
  };

  subtractDay = (e, x) => {
    const { getDay } = this.state;
    this.setState({
      getDay: new Date(getDay.setDate(getDay.getDate() - x))
    });
  };

  addMonth = e => {
    const { getDay } = this.state;
    this.setState({
      getDay: new Date(getDay.setMonth(getDay.getMonth() + 1, 1))
    });
  };

  subtractMonth = e => {
    const { getDay } = this.state;
    this.setState({
      getDay: new Date(getDay.setMonth(getDay.getMonth() - 1, 1))
    });
  };

  formatMinusDay = (x, sliceStart, sliceEnd) => {
    const { getDay } = this.state;
    return new Date(new Date().setDate(getDay.getDate() - x))
      .toUTCString()
      .slice(sliceStart, sliceEnd);
  };

  formatPlusDay = (x, sliceStart, sliceEnd) => {
    const { getDay } = this.state;
    return new Date(new Date().setDate(getDay.getDate() + x))
      .toUTCString()
      .slice(sliceStart, sliceEnd);
  };

  render() {
    const { user, interestOne, interestTwo, interestThree } = this.props;
    const { getDay } = this.state;
    const monthString = getDay.toLocaleString('en-us', {
      month: 'long'
    });
    const dayString = getDay.toUTCString().slice(0, 3);
    const dayNumber = getDay.toUTCString().slice(5, 7);

    const minusOneDayString = this.formatMinusDay(1, 0, 3);
    const minusOneDayNumber = this.formatMinusDay(1, 5, 7);
    const minusTwoDayString = this.formatMinusDay(2, 0, 3);
    const minusTwoDayNumber = this.formatMinusDay(2, 5, 7);
    const minusThreeDayString = this.formatMinusDay(3, 0, 3);
    const minusThreeDayNumber = this.formatMinusDay(3, 5, 7);

    const plusOneDayString = this.formatPlusDay(1, 0, 3);
    const plusOneDayNumber = this.formatPlusDay(1, 5, 7);
    const plusTwoDayString = this.formatPlusDay(2, 0, 3);
    const plusTwoDayNumber = this.formatPlusDay(2, 5, 7);
    const plusThreeDayString = this.formatPlusDay(3, 0, 3);
    const plusThreeDayNumber = this.formatPlusDay(3, 5, 7);

    const day = getDay.toISOString().slice(0, 10);

    return (
      <Fragment>
        <div className="m-0">
          <div className="d-block mb-2">
            <div className="row">
              <div className="col-5 pr-0">
                {' '}
                <Link to="#" onClick={this.subtractMonth}>
                  <i className="fas fa-chevron-left mt-1" />
                </Link>
              </div>
              <div className="col-2 px-0">
                <h6 className="d-inline font-weight-bold text-uppercase mx-auto">
                  {monthString}
                </h6>
              </div>
              <div className="col-5 pl-0">
                <Link to="#" onClick={this.addMonth}>
                  <i className="d-inline fas fa-chevron-right" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row mx-auto">
            <div className="col p-0 m-0">
              <Link to="#" onClick={e => this.subtractDay(e, 3)}>
                {' '}
                <h6 className="font-weight-bold text-uppercase lightgrey">
                  {minusThreeDayString}
                </h6>
                <h6 className="font-weight-bold lightgrey">
                  {minusThreeDayNumber}
                </h6>
              </Link>
            </div>
            <div className="col p-0 m-0">
              <Link to="#" onClick={e => this.subtractDay(e, 2)}>
                {' '}
                <h6 className="font-weight-bold text-uppercase lightgrey">
                  {minusTwoDayString}
                </h6>
                <h6 className="font-weight-bold lightgrey">
                  {minusTwoDayNumber}
                </h6>
              </Link>
            </div>
            <div className="col  p-0 m-0">
              {' '}
              <Link to="#" onClick={e => this.subtractDay(e, 1)}>
                {' '}
                <h6 className="font-weight-bold text-uppercase lightgrey">
                  {minusOneDayString}
                </h6>
                <h6 className="font-weight-bold lightgrey">
                  {minusOneDayNumber}
                </h6>
              </Link>
            </div>
            <div className="col  p-0 m-0">
              <h6 className="text-uppercase font-weight-bold">{dayString}</h6>
              <h6 className="font-weight-bold">{dayNumber}</h6>
            </div>
            <div className="col  p-0 m-0">
              {' '}
              <Link to="#" onClick={e => this.addDay(e, 1)}>
                <h6 className="font-weight-bold text-uppercase lightgrey">
                  {plusOneDayString}
                </h6>
                <h6 className="font-weight-bold lightgrey">
                  {plusOneDayNumber}
                </h6>
              </Link>
            </div>
            <div className="col  p-0 m-0">
              {' '}
              <Link to="#" onClick={e => this.addDay(e, 2)}>
                <h6 className="font-weight-bold text-uppercase lightgrey">
                  {plusTwoDayString}
                </h6>
                <h6 className="font-weight-bold lightgrey">
                  {plusTwoDayNumber}
                </h6>
              </Link>
            </div>
            <div className="col  p-0 m-0">
              {' '}
              <Link to="#" onClick={e => this.addDay(e, 3)}>
                <h6 className="font-weight-bold text-uppercase lightgrey">
                  {plusThreeDayString}
                </h6>
                <h6 className="font-weight-bold lightgrey">
                  {plusThreeDayNumber}
                </h6>
              </Link>
            </div>
          </div>
        </div>

        <CQuery
          query={GET_DAY_EVENTS}
          variables={{ day, interestOne, interestTwo, interestThree }}
        >
          {({ data }) => {
            if (data) {
              if (data.onedayevents.length === 0) {
                return (
                  <div className="mt-4 pl-4 font-italic ">
                    No events that day
                  </div>
                );
              } else {
                return (
                  <Fragment>
                    <div>
                      {data.onedayevents.map(event => (
                        <EventFeedItem
                          key={event.id}
                          currentUser={user}
                          userId={event.userId}
                          eventId={event.id}
                          name={event.name}
                          creator={event.creator}
                          categoryOne={event.categoryOne}
                          categoryTwo={event.categoryTwo}
                          categoryThree={event.categoryThree}
                          location={event.location}
                          startDate={event.startDate}
                          startTime={event.startTime}
                          endDate={event.endDate}
                          endTime={event.endTime}
                        />
                      ))}
                    </div>
                  </Fragment>
                );
              }
            }
          }}
        </CQuery>
      </Fragment>
    );
  }
}

export default EventFeed;
