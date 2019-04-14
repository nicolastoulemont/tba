import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CommentContext, UserContext } from '../../contexts';
import { ADD_REPORT } from '../../graphql/report/Mutations';

const CommentReport = ({ hideForms }) => {
	const user = useContext(UserContext);
	const comment = useContext(CommentContext);
	const [text, setText] = useState('');

	const reportComment = (e, text, addReport) => {
		if (
			(e.type === 'click' && e.target.className === 'fa fa-paper-plane text-white') ||
			(e.type === 'keydown' && e.keyCode === 13)
		) {
			e.preventDefault();
			addReport({
				variables: { user_ID: user.id, text, comment_ID: comment.id }
			}).then(res => {
				hideForms();
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
							onKeyDown={e => reportComment(e, text, addReport)}
						/>
						<div className="input-group-append">
							<Link
								to="#"
								className="btn bg-darkblue"
								onClick={e => reportComment(e, text, addReport)}
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

export default CommentReport;
