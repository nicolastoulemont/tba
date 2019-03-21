import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_REPORT } from '../../graphql/report/Mutations';
class CommentReport extends Component {
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
    const { comment_ID, user } = this.props;
    const { text } = this.state;
    return (
      <Fragment>
        <Mutation mutation={ADD_REPORT}>
          {(addReport, e) => (
            <div className="input-group input-group-sm py-2">
              <input
                type="text"
                className="form-control"
                placeholder="Report this comment"
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
                    addReport({
                      variables: { user_ID: user, text, comment_ID }
                    }).then(res => {
                      this.setState({ text: 'Your report has been submitted' });
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

export default CommentReport;
