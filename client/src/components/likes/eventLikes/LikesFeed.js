import React, { Fragment, useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import { FetchError } from '../../commons/UserActionsComponents';
import { EventContext, UserContext } from '../../contexts';
import { GET_EVENT_LIKES } from '../../graphql/like/Queries';
import { LikeEvent, UnLikeEvent } from './LikeActions';

const LikesFeed = () => {
	const { id } = useContext(UserContext);
	const event = useContext(EventContext);

	const getUserLikeId = (likes, id) => {
		let userLikeObj = likes.find(like => like.user_ID === id);
		return userLikeObj;
	};

	const { data, error } = useQuery(GET_EVENT_LIKES, {
		variables: { id: event.id },
		suspend: true
	});
	if (error) return <FetchError />;
	const likes = data.event.likes;
	const userLike = getUserLikeId(likes, id);
	return (
		<Fragment>
			{typeof userLike === 'undefined' ? (
				<LikeEvent />
			) : (
				<Link
					to="#"
					className="mr-1"
					data-togggle="tooltip"
					data-placement="bottom"
					title="You already liked it"
				>
					<i className="text-darkblue fa fa-thumbs-up" />
				</Link>
			)}
			{likes.length !== 0 ? <span className="mx-1">{likes.length}</span> : null}
			{typeof userLike !== 'undefined' ? (
				<UnLikeEvent userLike={userLike} />
			) : (
				<Link to="#" className="ml-2">
					<i className="text-secondary far fa-thumbs-down" />
				</Link>
			)}
		</Fragment>
	);
};

export default LikesFeed;
