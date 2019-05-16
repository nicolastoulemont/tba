import dayjs from 'dayjs';
import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import { Waypoint } from 'react-waypoint';
import { DateUrlValidation } from '../../commons/DateUrlValidation';
import CQuery from '../../commons/CustomQueryComponent';
import FeedSearch from '../../commons/FeedSearch';
import { useStateValue } from '../../contexts/InitialState';
import { SEARCH_DAILY_POSTS } from '../../graphql/post/Queries';
import NewsFeedItem from './feedItems';
import Spinner from '../../commons/Spinner';

const NewsFeed = ({ match }) => {
	const [{ userSearchPref }] = useStateValue();
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState(userSearchPref.sort);
	const [type, setType] = useState(userSearchPref.type);
	const [tags, setTags] = useState(userSearchPref.tags);
	const [errors, setErrors] = useState([]);

	const day = match.params.day;

	const displayDay = () => {
		if (!day.includes('+')) {
			const date = `News on ${dayjs(day).format('dddd')} `;
			return date;
		}
		if (day.includes('+')) {
			const firstDay = day.split('+')[0];
			const lastDay = day.split('+')[1];
			const days = `News from ${dayjs(firstDay).format('dddd')}, ${dayjs(firstDay).format(
				'DD'
			)} to ${dayjs(lastDay).format('dddd')}, ${dayjs(lastDay).format('DD')}`;
			return days;
		}
	};

	if (!DateUrlValidation(day))
		return <Redirect to={`/home/events/${dayjs().format('YYYY-MM-DD')}`} />;
	return (
		<Fragment>
			<div className="row m-0 px-2">
				<div className="w-100 mt-2 mb-4 pb-4">
					<FeedSearch
						date={displayDay()}
						page="News"
						setSearch={setSearch}
						sort={sort}
						setSort={setSort}
						type={type}
						setType={setType}
						tags={tags}
						setTags={setTags}
						errors={errors}
						setErrors={setErrors}
					/>
					<div className="border-top">
						<CQuery
							query={SEARCH_DAILY_POSTS}
							variables={{
								date: day,
								search,
								offset: 0,
								limit: 10,
								sort,
								type,
								tags
							}}
						>
							{({ data, fetchMore, networkStatus }) => {
								if (data.searchDailyPosts.ok) {
									const posts = data.searchDailyPosts.body;
									return (
										<Fragment>
											{posts.length === 0 ? (
												<div className="mt-4 pl-4 font-italic ">No {displayDay()}</div>
											) : (
												<Fragment>
													{data.searchDailyPosts.body.map((post, i) => (
														<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={post.id}>
															{props => (
																<div style={props}>
																	<NewsFeedItem key={post.id} post={post} />
																	{}
																	{i === data.searchDailyPosts.body.length - 2 && (
																		<Waypoint
																			onEnter={() =>
																				fetchMore({
																					variables: {
																						date: day,
																						search,
																						offset: data.searchDailyPosts.body.length,
																						limit: 10,
																						sort,
																						type,
																						tags
																					},
																					updateQuery: (prev, { fetchMoreResult }) => {
																						if (!fetchMoreResult) return prev;
																						return {
																							searchDailyPosts: {
																								__typename: 'PostsResponse',
																								statusCode:
																									fetchMoreResult.searchDailyPosts.statusCode,
																								ok: fetchMoreResult.searchDailyPosts.ok,
																								errors: fetchMoreResult.searchDailyPosts.errors,
																								body: [
																									...prev.searchDailyPosts.body,
																									...fetchMoreResult.searchDailyPosts.body
																								]
																							}
																						};
																					}
																				})
																			}
																		/>
																	)}
																</div>
															)}
														</Spring>
													))}
													{networkStatus === 3 && <Spinner />}
												</Fragment>
											)}
										</Fragment>
									);
								} else if (!data.searchDailyPosts.ok) {
									setErrors(data.searchDailyPosts.errors);
									return null;
								}
							}}
						</CQuery>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default React.memo(NewsFeed);
