import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LikeEvent, UnLikeEvent } from './LikeActions';
import CQuery from '../../commons/CustomQueryComponent';
import { GET_EVENT_LIKES } from '../../graphql/like/Queries';

import { UserContext, EventContext } from '../../contexts';

const LikesFeed = () => {
	const { id } = useContext(UserContext);
	const event = useContext(EventContext);

	const getUserLikeId = (likes, id) => {
		let userLikeObj = likes.find(like => like.user_ID === id);
		return userLikeObj;
	};

	return (
		<Fragment>
			<CQuery query={GET_EVENT_LIKES} variables={{ id: event.id }}>
				{({
					data: {
						event: { likes }
					},
					refetch
				}) => {
					let userLike = getUserLikeId(likes, id);
					return (
						<Fragment>
							<div>
								{typeof userLike === 'undefined' ? (
									<LikeEvent refetch={refetch} />
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
									<UnLikeEvent userLike={userLike} refetch={refetch} />
								) : (
									<Link to="#" className="ml-2">
										<i className="text-secondary far fa-thumbs-down" />
									</Link>
								)}
							</div>
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default LikesFeed;
