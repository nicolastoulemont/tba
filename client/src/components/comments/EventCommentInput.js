import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_COMMENT } from '../graphql/comment/Mutations';

class CommentEventInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { user, eventId, refetch } = this.props;
    const { text } = this.state;
    return (
      <Fragment>
        <Mutation mutation={ADD_COMMENT}>
          {(addComment, e) => (
            <div className="input-group input-group-sm py-2 px-4">
              <input
                type="text"
                className="form-control mx-0"
                placeholder="Comment..."
                onChange={this.onChange}
                name="text"
                value={text}
              />
              <div className="input-group-append">
                <Link
                  to="#"
                  className="btn bg-darkblue"
                  onClick={e => {
                    e.preventDefault();
                    addComment({
                      variables: { userId: user, eventId, text }
                    }).then(res => {
                      refetch();
                      this.setState({ text: '' });
                    });
                  }}
                >
                  <i
                    className="fa fa-paper-plane text-white"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

export default CommentEventInput;
