import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_REPORT } from '../../graphql/report/Mutations';

export default function CommentReport({ comment_ID, user }) {
	const [text, setText] = useState('');

	const reportComment = (e, user, comment_ID, text, addReport) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			addReport({
				variables: { user_ID: user, text, comment_ID }
			}).then(res => {
				this.props.hideForms();
			});
		}
	};

	return (
		<Fragment>
			<Mutation mutation={ADD_REPORT}>
				{(addReport, e) => (
					<div className="input-group input-group-sm py-2">
						<input
							type="text"
							className="form-control"
							placeholder="Report this comment"
							onChange={e => setText(e.target.value)}
							name="text"
							value={text}
							onKeyDown={e => reportComment(e, user, comment_ID, text, addReport)}
						/>
						<div className="input-group-append">
							<Link
								to="#"
								className="btn bg-darkblue"
								onClick={e => reportComment(e, user, comment_ID, text, addReport)}
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
