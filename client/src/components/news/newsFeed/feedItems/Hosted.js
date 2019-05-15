import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../../../../img/default_avatar.svg';

const HostedItem = ({ post }) => {
	dayjs.extend(relativeTime);
	return (
		<div className="media my-2  border-bottom">
			<Link to={`/home/profile/${post.user_ID}`}>
				{post.creator[0].profile[0].picture_URL ? (
					<img
						src={post.creator[0].profile[0].picture_URL}
						className="small-avatar rounded-circle mr-2"
						alt="User Avatar"
					/>
				) : (
					<img src={DefaultAvatar} className="small-avatar rounded-circle mr-2" alt="User Avatar" />
				)}
			</Link>
			<div className="media-body">
				<h6 className="text-left mb-0">
					<Link to={`/home/post/${post.id}`}> {post.name} </Link> -{' '}
					{post.type === 'institutional' ? (
						<i
							data-togggle="tooltip"
							data-placement="bottom"
							title="Institutional Event"
							className="fas fa-university mx-2"
						/>
					) : null}
					{post.createdAt !== post.updatedAt ? (
						<small className="font-italic">edited {dayjs(post.updatedAt).fromNow()}</small>
					) : (
						<small className="font-italic">{dayjs(post.createdAt).fromNow()}</small>
					)}
				</h6>
				<p className="text-left p-0 my-2">
					{post.tags.map(tag => (
						<span
							className="badge tag"
							key={Math.random()
								.toString(36)
								.substring(2, 7)}
						>
							{tag}
						</span>
					))}
				</p>
				<p className="text-left">{post.abstract}</p>
				<p className="float-left">
					<small>
						by{' '}
						<Link to={{ pathname: `/home/profile/${post.user_ID}` }} className="font-weight-bold">
							{post.creator[0].profile[0].name}
						</Link>
					</small>
				</p>
			</div>
		</div>
	);
};

export default HostedItem;
