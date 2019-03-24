import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { LikeEvent, UnLikeEvent } from './LikeActions';
import CQuery from '../../commons/CustomQueryComponent';
import { GET_EVENT_LIKES } from '../../graphql/like/Queries';

class LikesFeed extends Component {
	getUserLikeId = (likes, user) => {
		let userLikeObj = likes.find(like => like.user_ID === user);
		return userLikeObj;
	};
	render() {
		const { user, event_ID } = this.props;
		return (
			<Fragment>
				<CQuery query={GET_EVENT_LIKES} variables={{ id: event_ID }}>
					{({
						data: {
							event: { likes }
						},
						refetch
					}) => {
						let userLike = this.getUserLikeId(likes, user);
						return (
							<Fragment>
								<div>
									{typeof userLike === 'undefined' ? (
										<LikeEvent user={user} event_ID={event_ID} refetch={refetch} />
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
										<UnLikeEvent userLike={userLike} refetch={refetch} user={user} />
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
	}
}

export default LikesFeed;
