import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_COMMENT } from '../../graphql/comment/Mutations';
import { GET_COMMENT_COMMENTS } from '../../graphql/comment/Queries';

class CommentReply extends Component {
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
    const { user, commentId } = this.props;
    const { text } = this.state;
    return (
      <Fragment>
        <Mutation
          mutation={ADD_COMMENT}
          refetchQueries={() => {
            return [
              { query: GET_COMMENT_COMMENTS, variables: { id: commentId } }
            ];
          }}
        >
          {(addComment, e) => (
            <div className="input-group input-group-sm py-2">
              <input
                type="text"
                className="form-control"
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
                      variables: { userId: user, commentId, text }
                    }).then(res => {
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

export default CommentReply;
