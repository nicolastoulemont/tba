import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { EventContext, UserContext } from '../contexts';
import { ADD_COMMENT } from '../graphql/comment/Mutations';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';

const EventCommentFeedInput = () => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);
	const [text, setText] = useState('');

	const createComment = (e, text, addComment) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			addComment({
				variables: { user_ID: user.id, event_ID: event.id, text }
			}).then(res => {
				setText('');
			});
		}
	};

	return (
		<Fragment>
			<Mutation
				mutation={ADD_COMMENT}
				refetchQueries={() => {
					return [{ query: GET_EVENT_COMMENTS, variables: { id: event.id } }];
				}}
			>
				{(addComment, e) => (
					<div className="input-group input-group-sm py-2 px-4">
						<input
							type="text"
							className="form-control mx-0"
							placeholder="Comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => createComment(e, text, addComment)}
						/>
						<div className="input-group-append">
							<Link
								to="#"
								className="btn bg-darkblue"
								onClick={e => createComment(e, text, addComment)}
							>
								<i className="fa fa-paper-plane text-white" aria-hidden="true" />
							</Link>
						</div>
					</div>
				)}
			</Mutation>
		</Fragment>
	);
};

export default EventCommentFeedInput;
