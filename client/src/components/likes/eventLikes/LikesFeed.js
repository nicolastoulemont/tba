import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../../commons/CustomQueryComponent';
import { EventContext, UserContext } from '../../contexts';
import { GET_EVENT_LIKES } from '../../graphql/like/Queries';
import { LikeEvent, UnLikeEvent } from './LikeActions';

const LikesFeed = ({ likesCount }) => {
	const { id } = useContext(UserContext);
	const event = useContext(EventContext);

	const getUserLikeId = (likes, id) => {
		return likes.find(like => like.user_ID === id);
	};

	return (
		<CQuery query={GET_EVENT_LIKES} variables={{ event_ID: event.id }}>
			{({ data }) => {
				const likes = data.eventLikes.body;
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
								<i className="text-blue fa fa-thumbs-up" />
							</Link>
						)}
						{likes.length !== 0 ? <span className="mx-1">{likesCount}</span> : null}
						{typeof userLike !== 'undefined' ? (
							<UnLikeEvent userLike={userLike} />
						) : (
							<Link to="#" className="ml-2">
								<i className="text-secondary far fa-thumbs-down" />
							</Link>
						)}
					</Fragment>
				);
			}}
		</CQuery>
	);
};

export default React.memo(LikesFeed);
