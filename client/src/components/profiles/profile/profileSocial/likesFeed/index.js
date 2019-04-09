import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../../commons/CustomQueryComponent';
import { GET_USER_LIKES } from '../../../../graphql/user/Queries';

const ProfileLikesFeed = ({ user, name }) => {
	return (
		<CQuery query={GET_USER_LIKES} variables={{ id: user }}>
			{({ data: { user } }) => {
				const likes = user.likes;
				if (likes.length === 0)
					return (
						<div className="text-left px-3 py-2 border-top">
							<small>{name} did not like anything yet</small>
						</div>
					);
				return (
					<Fragment>
						{likes.map(like => {
							if (like.event) {
								if (!like.event.isPublic) {
									return null;
								} else {
									return (
										<div className="text-left px-3 py-2 border-top" key={like.id}>
											<small>
												{name} liked the event{' '}
												<Link
													to={{
														pathname: `/home/event/${like.event.id}`
													}}
													className="font-weight-bold"
												>
													{like.event.name}
												</Link>{' '}
											</small>
										</div>
									);
								}
							} else if (like.comment) {
								return (
									<div className="text-left px-3 py-2 border-top" key={like.id}>
										<small>
											{name} liked a comment by
											<Link
												to={{
													pathname: `/home/profile/${like.comment.user_ID}`
												}}
												className="font-weight-bold"
											>
												{' '}
												{like.comment.creator.profile.name}
											</Link>{' '}
										</small>
									</div>
								);
							} else return null;
						})}
					</Fragment>
				);
			}}
		</CQuery>
	);
};

export default ProfileLikesFeed;
