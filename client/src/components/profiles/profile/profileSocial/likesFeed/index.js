import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../../../commons/CustomQueryComponent';
import { ProfileContext } from '../../../../contexts';
import { GET_USER_LIKES } from '../../../../graphql/like/Queries';

const ProfileLikesFeed = () => {
	const profile = useContext(ProfileContext);

	return (
		<CQuery query={GET_USER_LIKES} variables={{ user_ID: profile.user_ID }}>
			{({ data }) => {
				const likes = data.userLikes.body;
				if (likes && likes.length === 0)
					return (
						<div className="text-left px-3 py-2 border-top">
							<small>{profile.name} did not like anything yet</small>
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
												{profile.name} liked the event{' '}
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
											{profile.name} liked a comment by
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
