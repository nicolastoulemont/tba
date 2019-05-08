import React from 'react';
import ScrapedItem from './Scraped';
import HostedItem from './Hosted';

const EventFeedItem = ({ event }) => {
	if (event.scraped) return <ScrapedItem event={event} />;
	if (!event.scraped) return <HostedItem event={event} />;
};

export default React.memo(EventFeedItem);
