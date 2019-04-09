import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { EDIT_COMMENT } from '../../graphql/comment/Mutations';

export default function CommentEdit({ comment_ID, refetch }) {
	const [text, setText] = useState('');

	const commentEdit = (e, comment_ID, text, editComment, refetch) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			editComment({
				variables: { _id: comment_ID, text }
			}).then(res => {
				this.props.hideForms();
				refetch();
			});
		}
	};

	return (
		<Fragment>
			<Mutation mutation={EDIT_COMMENT}>
				{(editComment, e) => (
					<div className="input-group input-group-sm py-2">
						<input
							type="text"
							className="form-control"
							placeholder="Edit your comment..."
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => commentEdit(e, comment_ID, text, editComment, refetch)}
						/>
						<div className="input-group-append">
							<Link
								to="#"
								className="btn bg-darkblue"
								onClick={e => commentEdit(e, comment_ID, text, editComment, refetch)}
							>
								<i className="fa fa-paper-plane text-white" aria-hidden="true" />
							</Link>
						</div>
					</div>
				)}
			</Mutation>
		</Fragment>
	);
}
