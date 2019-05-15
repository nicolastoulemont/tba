import React from 'react';
import ScrapedItem from './Scraped';
import HostedItem from './Hosted';

const NewsFeedItem = ({ post }) => {
	if (post.scraped) return <ScrapedItem post={post} />;
	if (!post.scraped) return <HostedItem post={post} />;
};

export default React.memo(NewsFeedItem);
