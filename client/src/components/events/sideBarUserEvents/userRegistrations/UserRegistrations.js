import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import RegistrationsDisplay from './registrationsDisplay';

import CQuery from '../../../commons/CustomQueryComponent';
import { GET_USER_REGISTRATIONS } from '../../../graphql/user/Queries';

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

  getFutureRegistrations = (registrations, day) => {
    const futureRegArr = registrations.filter(
      registration => registration.event.startDate >= day
    );
    return futureRegArr;
  };

  getPastRegistrations = (registrations, day) => {
    const PastRegArr = registrations.filter(
      registration => registration.event.startDate < day
    );
    return PastRegArr;
  };

  render() {
    const { futRegDisplay, today } = this.state;
    const { user } = this.props;
    return (
      <CQuery query={GET_USER_REGISTRATIONS} variables={{ id: user }}>
        {({ data: { user } }) => {
          const registrations = user.registrations;
          let futureRegis = this.getFutureRegistrations(registrations, today);
          let pastRegis = this.getPastRegistrations(registrations, today);
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
                  <Link
                    to="#"
                    onClick={this.pastRegDisplay}
                    className="link-menu"
                  >
                    <small className="d-inline text-uppercase font-weight-bold">
                      Past
                    </small>
                  </Link>
                </div>
                <div className="col-6 p-0 py-0" />
              </div>
              <div className="row m-0 p-0" />
              <div className="my-2 w-100">
                {futRegDisplay ? (
                  <RegistrationsDisplay registrations={futureRegis} />
                ) : (
                  <RegistrationsDisplay registrations={pastRegis} />
                )}
              </div>
            </Fragment>
          );
        }}
      </CQuery>
    );
  }
}

export default UserRegistrations;
