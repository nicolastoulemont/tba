import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { EventContext, UserContext } from '../contexts';
import { ADD_COMMENT } from '../graphql/comment/Mutations';
import { GET_EVENT_COMMENTS } from '../graphql/comment/Queries';
import classNames from 'classnames';

const EventCommentFeedInput = () => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);
	const [text, setText] = useState('');
	const [errors, setErrors] = useState([]);

	const createComment = async (e, text, addComment) => {
		setErrors([]);
		if (e.type === 'keydown' && e.keyCode === 13) {
			e.preventDefault();
			const response = await addComment({
				variables: { user_ID: user.id, event_ID: event.id, text }
			});
			const { ok, errors } = response.data.addComment;
			if (!ok) setErrors(errors);
			if (ok) setText('');
		}
	};
	return (
		<Fragment>
			<Mutation
				mutation={ADD_COMMENT}
				refetchQueries={() => {
					return [{ query: GET_EVENT_COMMENTS, variables: { event_ID: event.id } }];
				}}
			>
				{(addComment, e) => (
					<div className="input-group input-group-sm py-2 px-4">
						<input
							type="text"
							className={classNames('form-control rounded-pill', {
								'is-invalid': errors.length !== 0
							})}
							placeholder="Comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => createComment(e, text, addComment)}
							maxLength={250}
							minLength={1}
						/>
						{errors.length !== 0 ? (
							<Fragment>
								{errors.map(error => (
									<small
										className="invalid-feedback text-left"
										key={Math.random()
											.toString(36)
											.substring(2, 7)}
									>
										{error.message}
									</small>
								))}
							</Fragment>
						) : null}
					</div>
				)}
			</Mutation>
		</Fragment>
	);
};

export default React.memo(EventCommentFeedInput);
