import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LikeComment, UnLikeComment } from './LikesActions';
import CQuery from '../../commons/CustomQueryComponent';
import { GET_COMMENT_LIKES } from '../../graphql/like/Queries';
import { UserContext, CommentContext } from '../../contexts';

const LikesFeed = () => {
	const user = useContext(UserContext);
	const comment = useContext(CommentContext);

	const getUserLikeId = (commentLikes, user) => {
		return commentLikes.find(like => like.user_ID === user.id);
	};

	return (
		<Fragment>
			<CQuery query={GET_COMMENT_LIKES} variables={{ comment_ID: comment.id }}>
				{({ data, refetch }) => {
					const commentLikes = data.commentLikes.body;
					let userLike = getUserLikeId(commentLikes, user);
					return (
						<Fragment>
							{typeof userLike === 'undefined' ? (
								<LikeComment user={user} comment_ID={comment.id} refetch={refetch} />
							) : (
								<Link
									to="#"
									className="mr-2"
									data-togggle="tooltip"
									data-placement="bottom"
									title="You already liked it"
								>
									<i className="text-blue fa fa-thumbs-up" />
								</Link>
							)}
							{commentLikes.length !== 0 ? (
								<span className="mx-1">{commentLikes.length}</span>
							) : null}
							{typeof userLike !== 'undefined' ? (
								<UnLikeComment userLike={userLike} refetch={refetch} user={user} />
							) : (
								<Link to="#" className="ml-1">
									<i className="text-secondary far fa-thumbs-down" />
								</Link>
							)}
						</Fragment>
					);
				}}
			</CQuery>
		</Fragment>
	);
};

export default LikesFeed;
