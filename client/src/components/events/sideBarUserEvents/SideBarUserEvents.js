import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import UserHostedEvents from './userHostedEvents/UserHostedEvents';
import UserRegistrations from './userRegistrations/UserRegistrations';

class SideBarUserEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationsDisplay: true
    };
  }

  registrationsDisplay = e => {
    this.setState({ registrationsDisplay: true });
  };
  userHostedEventsDisplay = e => {
    this.setState({ registrationsDisplay: false });
  };

  render() {
    const { user } = this.props;
    const { registrationsDisplay } = this.state;
    return (
      <Fragment>
        <div className="col pr-0">
          <div className="ml-2 bg-white">
            <div className="row m-0 p-0">
              <div className="col border-right p-0 pt-1">
                <Link
                  className="link-menu"
                  to="#"
                  onClick={this.registrationsDisplay}
                >
                  <h6 className="d-inline font-weight-bold text-uppercase">
                    Registrations
                  </h6>
                </Link>
              </div>
              <div className="col p-0 pt-1">
                <Link
                  to="#"
                  className="link-menu"
                  onClick={this.userHostedEventsDisplay}
                >
                  <h6 className="d-inline font-weight-bold text-uppercase">
                    Hosted events
                  </h6>
                </Link>
              </div>
            </div>
            <div className="row  m-0 p-0">
              <div className="mt-1 w-100">
                {registrationsDisplay ? (
                  <UserRegistrations user={user} />
                ) : (
                  <UserHostedEvents user={user} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SideBarUserEvents;
