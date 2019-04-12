import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_LIKE, DELETE_LIKE } from '../../graphql/like/Mutations';
import { UserContext, EventContext } from '../../contexts';

export const LikeEvent = ({ refetch }) => {
	const { id } = useContext(UserContext);
	const value = useContext(EventContext);
	return (
		<Fragment>
			<Mutation mutation={ADD_LIKE}>
				{(addLike, e) => (
					<Link
						to="#"
						className="mr-2"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Like this event"
						onClick={e => {
							e.preventDefault();
							addLike({
								variables: {
									user_ID: id,
									event_ID: value.id
								}
							}).then(res => {
								refetch();
							});
						}}
					>
						<i className="text-secondary far fa-thumbs-up" />
					</Link>
				)}
			</Mutation>
		</Fragment>
	);
};

export const UnLikeEvent = ({ userLike, refetch }) => {
	const { id } = useContext(UserContext);
	return (
		<Fragment>
			<Mutation mutation={DELETE_LIKE}>
				{(deleteLike, e) => (
					<Link
						to="#"
						className="ml-2"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Unlike this event"
						onClick={e => {
							e.preventDefault();
							deleteLike({
								variables: {
									_id: userLike.id,
									user_ID: id
								}
							}).then(res => {
								refetch();
							});
						}}
					>
						<i className="text-secondary  far fa-thumbs-down" />
					</Link>
				)}
			</Mutation>
		</Fragment>
	);
};
