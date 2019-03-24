import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ADD_LIKE, DELETE_LIKE } from '../../graphql/like/Mutations';

export const LikeComment = ({ user, comment_ID, refetch }) => {
	return (
		<Fragment>
			<Mutation mutation={ADD_LIKE}>
				{(addLike, e) => (
					<Link
						to="#"
						className="mr-2"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Like this comment"
						onClick={e => {
							e.preventDefault();
							addLike({
								variables: {
									user_ID: user,
									comment_ID
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

export const UnLikeComment = ({ userLike, refetch, user }) => {
	return (
		<Fragment>
			<Mutation mutation={DELETE_LIKE}>
				{(deleteLike, e) => (
					<Link
						to="#"
						className="ml-2"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Unlike this comment"
						onClick={e => {
							e.preventDefault();
							deleteLike({
								variables: {
									_id: userLike.id,
									user_ID: user
								}
							}).then(res => {
								refetch();
							});
						}}
					>
						<i className="text-secondary far fa-thumbs-down" />
					</Link>
				)}
			</Mutation>
		</Fragment>
	);
};
