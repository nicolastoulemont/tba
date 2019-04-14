import React, { Fragment, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import { FetchError } from '../../../../commons/UserActionsComponents';
import { ProfileContext } from '../../../../contexts';
import { GET_USER_LIKES } from '../../../../graphql/user/Queries';

const ProfileLikesFeed = () => {
	const profile = useContext(ProfileContext);
	const { data, error } = useQuery(GET_USER_LIKES, {
		variables: { id: profile.user_ID },
		suspend: true
	});
	if (error) return <FetchError />;
	const likes = data.user.likes;
	if (likes.length === 0)
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
};

export default ProfileLikesFeed;
