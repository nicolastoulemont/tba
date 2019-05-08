import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { CommentContext, UserContext } from '../../contexts';
import { ADD_COMMENT } from '../../graphql/comment/Mutations';
import { GET_COMMENT_COMMENTS } from '../../graphql/comment/Queries';
import classNames from 'classnames';

const CommentReply = ({ hideForms }) => {
	const user = useContext(UserContext);
	const comment = useContext(CommentContext);
	const [text, setText] = useState('');
	const [errors, setErrors] = useState([]);

	const commentReply = async (e, text, addComment) => {
		setErrors([]);
		if (e.keyCode === 13) {
			e.preventDefault();
			const response = await addComment({
				variables: { user_ID: user.id, comment_ID: comment.id, text }
			});
			const { ok, errors } = response.data.addComment;
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
				mutation={ADD_COMMENT}
				refetchQueries={() => {
					return [{ query: GET_COMMENT_COMMENTS, variables: { comment_ID: comment.id } }];
				}}
			>
				{(addComment, e) => (
					<div className="input-group input-group-sm py-2">
						<input
							type="text"
							className={classNames('form-control rounded-pill', {
								'is-invalid': errors.length !== 0
							})}
							placeholder="Comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => commentReply(e, text, addComment)}
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

export default CommentReply;
