import React, { Fragment, Component } from 'react';
import CQuery from '../commons/CustomQueryComponent';
import EventFeedItem from './EventFeedItem';
import { DateLink, MonthActions } from '../commons/UserActionsComponents';

import { GET_DAY_EVENTS } from '../graphql/event/Queries';

class EventFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getDay: new Date()
    };
  }

  setDay = (e, x, operator) => {
    const { getDay } = this.state;
    if (operator === '+') {
      this.setState({
        getDay: new Date(getDay.setDate(getDay.getDate() + x))
      });
    } else if (operator === '-') {
      this.setState({
        getDay: new Date(getDay.setDate(getDay.getDate() - x))
      });
    }
  };

  setMonth = (e, operator) => {
    const { getDay } = this.state;
    if (operator === '+') {
      this.setState({
        getDay: new Date(getDay.setMonth(getDay.getMonth() + 1, 1))
      });
    } else if (operator === '-') {
      this.setState({
        getDay: new Date(getDay.setMonth(getDay.getMonth() - 1, 1))
      });
    }
  };

  formatDay = (x, operator, sliceStart, sliceEnd) => {
    const { getDay } = this.state;
    if (operator === '+') {
      return new Date(new Date().setDate(getDay.getDate() + x))
        .toUTCString()
        .slice(sliceStart, sliceEnd);
    } else if (operator === '-') {
      return new Date(new Date().setDate(getDay.getDate() - x))
        .toUTCString()
        .slice(sliceStart, sliceEnd);
    }
  };

  render() {
    const { user, interestOne, interestTwo, interestThree } = this.props;
    const { getDay } = this.state;
    const monthString = getDay.toLocaleString('en-us', {
      month: 'long'
    });
    const dayString = getDay.toUTCString().slice(0, 3);
    const dayNumber = getDay.toUTCString().slice(5, 7);

    const minusOneDayString = this.formatDay(1, '-', 0, 3);
    const minusOneDayNumber = this.formatDay(1, '-', 5, 7);
    const minusTwoDayString = this.formatDay(2, '-', 0, 3);
    const minusTwoDayNumber = this.formatDay(2, '-', 5, 7);
    const minusThreeDayString = this.formatDay(3, '-', 0, 3);
    const minusThreeDayNumber = this.formatDay(3, '-', 5, 7);

    const plusOneDayString = this.formatDay(1, '+', 0, 3);
    const plusOneDayNumber = this.formatDay(1, '+', 5, 7);
    const plusTwoDayString = this.formatDay(2, '+', 0, 3);
    const plusTwoDayNumber = this.formatDay(2, '+', 5, 7);
    const plusThreeDayString = this.formatDay(3, '+', 0, 3);
    const plusThreeDayNumber = this.formatDay(3, '+', 5, 7);

    const day = getDay.toISOString().slice(0, 10);

    return (
      <Fragment>
        <div className="m-0">
          <div className="d-block mb-2">
            <div className="row">
              <MonthActions
                string={monthString}
                methodOne={e => this.setMonth(e, '-')}
                methodTwo={e => this.setMonth(e, '+')}
              />
            </div>
          </div>
          <div className="row mx-auto">
            <DateLink
              string={minusThreeDayString}
              number={minusThreeDayNumber}
              method={e => this.setDay(e, 3, '-')}
            />
            <DateLink
              string={minusTwoDayString}
              number={minusTwoDayNumber}
              method={e => this.setDay(e, 2, '-')}
            />
            <DateLink
              string={minusOneDayString}
              number={minusOneDayNumber}
              method={e => this.setDay(e, 1, '-')}
            />
            <div className="col  p-0 m-0">
              <h6 className="text-uppercase font-weight-bold">{dayString}</h6>
              <h6 className="font-weight-bold">{dayNumber}</h6>
            </div>
            <DateLink
              string={plusOneDayString}
              number={plusOneDayNumber}
              method={e => this.setDay(e, 1, '+')}
            />
            <DateLink
              string={plusTwoDayString}
              number={plusTwoDayNumber}
              method={e => this.setDay(e, 2, '+')}
            />
            <DateLink
              string={plusThreeDayString}
              number={plusThreeDayNumber}
              method={e => this.setDay(e, 3, '+')}
            />
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
