import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';

const ScrapedItem = ({ post }) => {
	dayjs.extend(relativeTime);
	return (
		<div className="media my-2 border-bottom">
			<a href={post.author_URL}>
				<img
					src={post.authorPicture_URL}
					className="small-avatar rounded-circle mr-2"
					alt="Author Logo"
				/>
			</a>
			<div className="media-body">
				<h6 className="text-left mb-0">
					<a href={post.postOrigin_URL} target="#">
						{post.name} -
					</a>

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
				<p className="text-left text-muted mb-0">
					<small>
						<a className="font-weight-bold" href={post.author_URL} target="#">
							{post.authorName}
						</a>
					</small>
				</p>
				<p className="text-left p-0 mt-0 mb-1">
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
			</div>
		</div>
	);
};

export default ScrapedItem;
