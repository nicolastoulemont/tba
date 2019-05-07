import React, { Fragment, useContext } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import { EventContext, UserContext } from '../../contexts';
import { ADD_LIKE, DELETE_LIKE } from '../../graphql/like/Mutations';
import { GET_EVENT_LIKES } from '../../graphql/like/Queries';

export const LikeEvent = () => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);

	const addLike = useMutation(ADD_LIKE, {
		variables: {
			user_ID: user.id,
			event_ID: event.id
		},
		refetchQueries: () => {
			return [{ query: GET_EVENT_LIKES, variables: { event_ID: event.id } }];
		}
	});
	return (
		<Fragment>
			<Link
				to="#"
				className="mr-2"
				data-togggle="tooltip"
				data-placement="bottom"
				title="Like this event"
				onClick={e => {
					e.preventDefault();
					addLike(e);
				}}
			>
				<i className="text-secondary far fa-thumbs-up" />
			</Link>
		</Fragment>
	);
};

export const UnLikeEvent = ({ userLike }) => {
	const user = useContext(UserContext);
	const event = useContext(EventContext);
	const deleteLike = useMutation(DELETE_LIKE, {
		variables: {
			_id: userLike.id,
			user_ID: user.id,
			event_ID: event.id
		},
		refetchQueries: () => {
			return [{ query: GET_EVENT_LIKES, variables: { event_ID: event.id } }];
		}
	});
	return (
		<Fragment>
			<Link
				to="#"
				className="ml-2"
				data-togggle="tooltip"
				data-placement="bottom"
				title="Unlike this event"
				onClick={e => {
					e.preventDefault();
					deleteLike(e);
				}}
			>
				<i className="text-secondary  far fa-thumbs-down" />
			</Link>
		</Fragment>
	);
};
