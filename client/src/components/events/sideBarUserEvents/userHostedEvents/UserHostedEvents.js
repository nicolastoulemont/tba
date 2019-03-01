import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import PastHostedEvents from './pastHostedEvents';
import FutureHostedEvents from './futureHostedEvents';

class UserHostedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      futHostedEventsDisplay: true,
      today: new Date().toISOString().slice(0, 10)
    };
  }

  futurHostedEventsDisplay = e => {
    this.setState({ futHostedEventsDisplay: true });
  };
  pastHostedEventsDisplay = e => {
    this.setState({ futHostedEventsDisplay: false });
  };

  render() {
    const { futHostedEventsDisplay, today } = this.state;
    const { user } = this.props;
    return (
      <Fragment>
        <div className="row m-0 p-0">
          <div className="col-6 p-0 py-0" />
          <div className="col-6 p-0 py-0">
            <Link
              to="#"
              onClick={this.futurHostedEventsDisplay}
              className="link-menu mr-4"
            >
              <small className="d-inline text-uppercase font-weight-bold">
                Upcoming
              </small>
            </Link>
            <Link
              to="#"
              onClick={this.pastHostedEventsDisplay}
              className="link-menu"
            >
              <small className="d-inline text-uppercase font-weight-bold">
                Past
              </small>
            </Link>
          </div>
        </div>
        <div className="row m-0 p-0">
          <div className="my-2 w-100">
            {futHostedEventsDisplay ? (
              <FutureHostedEvents user={user} day={today} />
            ) : (
              <PastHostedEvents user={user} day={today} />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserHostedEvents;
