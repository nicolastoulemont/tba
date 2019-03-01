import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import PastRegistrations from './pastRegistrations';
import FutureRegistrations from './futureRegistrations';

class UserRegistrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      futRegDisplay: true,
      today: new Date().toISOString().slice(0, 10)
    };
  }

  futurRegDisplay = e => {
    this.setState({ futRegDisplay: true });
  };
  pastRegDisplay = e => {
    this.setState({ futRegDisplay: false });
  };

  render() {
    const { futRegDisplay, today } = this.state;
    const { user } = this.props;
    return (
      <Fragment>
        <div className="row m-0 p-0">
          <div className="col-6 p-0 py-0">
            <Link
              to="#"
              onClick={this.futurRegDisplay}
              className="link-menu mr-4"
            >
              <small className="d-inline text-uppercase font-weight-bold">
                Upcoming
              </small>
            </Link>
            <Link to="#" onClick={this.pastRegDisplay} className="link-menu">
              <small className="d-inline text-uppercase font-weight-bold">
                Past
              </small>
            </Link>
          </div>
          <div className="col-6 p-0 py-0" />
        </div>
        <div className="row m-0 p-0">
          <div className="my-2 w-100">
            {futRegDisplay ? (
              <FutureRegistrations user={user} day={today} />
            ) : (
              <PastRegistrations user={user} day={today} />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserRegistrations;
