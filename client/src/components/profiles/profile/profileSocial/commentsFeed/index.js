import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../../commons/CustomQueryComponent';
import { ProfileContext } from '../../../../contexts';
import { GET_USER_COMMENTS } from '../../../../graphql/comment/Queries';

const ProfileCommentsFeed = () => {
	const profile = useContext(ProfileContext);

	return (
		<CQuery query={GET_USER_COMMENTS} variables={{ user_ID: profile.user_ID }}>
			{({ data }) => {
				const comments = data.userComments.body;
				if (comments && comments.length === 0)
					return (
						<div className="text-left px-3 py-2 border-top">
							<small>{profile.name} did not write a comment yet</small>
						</div>
					);
				return (
					<Fragment>
						{comments.map(comment => {
							if (!comment.moderated) {
								return (
									<div className="text-left px-3 py-1 border-top" key={comment.id}>
										<blockquote className="blockquote mb-1">
											<footer className="blockquote-footer">
												<small>{profile.name} commented on </small>

												<cite title={comment.event.name}>
													{' '}
													<Link
														to={{
															pathname: `/home/event/${comment.event.id}`
														}}
													>
														<small className="font-weight-bold">{comment.event.name}</small>
													</Link>
												</cite>
											</footer>
											<small className="py-0 my-0">
												<small>{comment.text.substring(0, 100)}</small>
											</small>
										</blockquote>
									</div>
								);
							}
							return null;
						})}
					</Fragment>
				);
			}}
		</CQuery>
	);
};

export default ProfileCommentsFeed;
