import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { CommentContext, EventContext } from '../../contexts';
import { EDIT_COMMENT } from '../../graphql/comment/Mutations';
import { GET_COMMENT_COMMENTS, GET_EVENT_COMMENTS } from '../../graphql/comment/Queries';
import classNames from 'classnames';

const CommentEdit = ({ hideForms }) => {
	const comment = useContext(CommentContext);
	const event = useContext(EventContext);
	const [text, setText] = useState(comment.text);
	const [errors, setErrors] = useState([]);

	const commentEdit = async (e, text, editComment) => {
		setErrors([]);
		if (e.keyCode === 13) {
			e.preventDefault();
			const response = await editComment({
				variables: { _id: comment.id, text }
			});
			const { ok, errors } = response.data.updateComment;
			if (!ok) setErrors(errors);
			if (ok) {
				setText('');
				hideForms();
			}
		}
	};

	return (
		<Fragment>
			<Mutation
				mutation={EDIT_COMMENT}
				refetchQueries={() => {
					return [
						{ query: GET_EVENT_COMMENTS, variables: { event_ID: event.id } },
						{ query: GET_COMMENT_COMMENTS, variables: { comment_ID: comment.id } }
					];
				}}
			>
				{(editComment, e) => (
					<div className="input-group input-group-sm py-2">
						<input
							type="text"
							className={classNames('form-control rounded-pill', {
								'is-invalid': errors.length !== 0
							})}
							placeholder="Edit your comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => commentEdit(e, text, editComment)}
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

export default CommentEdit;
