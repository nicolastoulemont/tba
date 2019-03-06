import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_EVENT } from '../graphql/event/Mutations';

class DeleteEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventDeleted: false,
      errorMsg: ''
    };
  }

  componentDidUpdate() {
    if (this.state.eventDeleted) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    const { eventId, loggedUser } = this.props;
    return (
      <div
        className="modal fade"
        id="DeleteEventModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="DeleteEventModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content text-secondary p-2">
            <div className="modal-header p-2 m-0">
              <h5 className="modal-title" id="DeleteEventModal">
                Do you want to delete this event ?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Mutation mutation={DELETE_EVENT}>
                {(deleteEvent, e) => (
                  <button
                    className="btn btn-info mr-2"
                    data-dismiss="modal"
                    onClick={async e => {
                      e.preventDefault();
                      const response = await deleteEvent({
                        variables: { _id: eventId, userId: loggedUser }
                      });
                      const { success, error } = response.data.deleteEvent;
                      if (success) {
                        this.setState({ eventDeleted: true });
                      }
                      if (error) {
                        this.setState({ errorMsg: error });
                      }
                    }}
                  >
                    Yes
                  </button>
                )}
              </Mutation>
              <button className="btn btn-secondary" data-dismiss="modal">
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteEventModal;
