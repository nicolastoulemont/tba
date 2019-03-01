import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import HostedEventsDisplay from './hostedEventsDisplay';

import CQuery from '../../../commons/CustomQueryComponent';
import { GET_USER_EVENTS } from '../../../graphql/user/Queries';

class UserHostedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      futEventsDisplay: true,
      today: new Date().toISOString().slice(0, 10)
    };
  }

  futurEventsDisplay = e => {
    this.setState({ futEventsDisplay: true });
  };
  pastEventsDisplay = e => {
    this.setState({ futEventsDisplay: false });
  };

  getFutureEvents = (events, day) => {
    const futureEventsArr = events.filter(event => event.startDate >= day);
    return futureEventsArr;
  };

  getPastEvents = (events, day) => {
    const PastEventsArr = events.filter(event => event.startDate < day);
    return PastEventsArr;
  };

  render() {
    const { futEventsDisplay, today } = this.state;
    const { user } = this.props;
    return (
      <CQuery query={GET_USER_EVENTS} variables={{ id: user }}>
        {({ data: { user } }) => {
          const events = user.events;
          let futureEvents = this.getFutureEvents(events, today);
          let pastEvents = this.getPastEvents(events, today);
          return (
            <Fragment>
              <div className="row m-0 p-0">
                <div className="col-6 p-0 py-0" />
                <div className="col-6 p-0 py-0">
                  <Link
                    to="#"
                    onClick={this.futurEventsDisplay}
                    className="link-menu mr-4"
                  >
                    <small className="d-inline text-uppercase font-weight-bold">
                      Upcoming
                    </small>
                  </Link>
                  <Link
                    to="#"
                    onClick={this.pastEventsDisplay}
                    className="link-menu"
                  >
                    <small className="d-inline text-uppercase font-weight-bold">
                      Past
                    </small>
                  </Link>
                </div>
              </div>
              <div className="row m-0 p-0" />
              <div className="my-2 w-100">
                {futEventsDisplay ? (
                  <HostedEventsDisplay events={futureEvents} />
                ) : (
                  <HostedEventsDisplay events={pastEvents} />
                )}
              </div>
            </Fragment>
          );
        }}
      </CQuery>
    );
  }
}

export default UserHostedEvents;
