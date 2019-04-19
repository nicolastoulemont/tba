import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts';
import { useStateValue } from '../contexts/InitialState';

const FeedSearch = ({
	date,
	page,
	setSearch,
	sort,
	setSort,
	type,
	setType,
	price,
	setPrice,
	tags,
	setTags
}) => {
	const [{ userSearchPref }, dispatch] = useStateValue();
	const user = useContext(UserContext);

	const handleSearch = e => {
		if (e.keyCode === 13) setSearch(e.target.value);
		if (e.target.value.length === 0) setSearch('');
	};

	const handleAscending = () => {
		dispatch({
			type: 'SET_SORT',
			newSort: {
				sort: 'ascending',
				type: userSearchPref.type,
				price: userSearchPref.price,
				tags: userSearchPref.tags
			}
		});
		setSort('ascending');
	};

	const handleDescending = () => {
		dispatch({
			type: 'SET_SORT',
			newSort: {
				sort: 'descending',
				type: userSearchPref.type,
				price: userSearchPref.price,
				tags: userSearchPref.tags
			}
		});
		setSort('descending');
	};

	const handleType = () => {
		if (type === '') {
			dispatch({
				type: 'SET_TYPE',
				newType: {
					sort: userSearchPref.sort,
					type: 'institutional',
					price: userSearchPref.price,
					tags: userSearchPref.tags
				}
			});
			setType('institutional');
		}
		if (type === 'institutional') {
			dispatch({
				type: 'SET_TYPE',
				newType: {
					sort: userSearchPref.sort,
					type: '',
					price: userSearchPref.price,
					tags: userSearchPref.tags
				}
			});
			setType('');
		}
	};

	const handleTags = () => {
		if (tags.length === 0) {
			dispatch({
				type: 'SET_TAGS',
				newTags: {
					sort: userSearchPref.sort,
					type: userSearchPref.type,
					price: userSearchPref.price,
					tags: user.profile.tags
				}
			});
			setTags(user.profile.tags);
		}
		if (tags.length !== 0) {
			dispatch({
				type: 'SET_TAGS',
				newTags: {
					sort: userSearchPref.sort,
					type: userSearchPref.type,
					price: userSearchPref.price,
					tags: []
				}
			});
			setTags([]);
		}
	};

	const handlePrice = () => {
		if (price === 0) {
			dispatch({
				type: 'SET_PRICE',
				newPrice: {
					sort: userSearchPref.sort,
					type: userSearchPref.type,
					price: 10000,
					tags: userSearchPref.tags
				}
			});
			setPrice(10000);
		}
		if (price === 10000) {
			dispatch({
				type: 'SET_PRICE',
				newPrice: {
					sort: userSearchPref.sort,
					type: userSearchPref.type,
					price: 0,
					tags: userSearchPref.tags
				}
			});
			setPrice(0);
		}
	};

	return (
		<div className="mx-auto py-0 px-2">
			<h6 className="text-left"> {date}</h6>
			<div className="input-group input-group-sm mb-3">
				<input
					className="form-control form-control-lg rounded-pill"
					type="text"
					placeholder="Search..."
					onKeyUp={e => handleSearch(e)}
				/>
				<div className="input-group-append">
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Sort from earliest to lastest"
						onClick={handleAscending}
					>
						{' '}
						{sort === 'ascending' ? (
							<i className="fas fa-sort-amount-down text-blue mx-2 mt-2" />
						) : (
							<i className="fas fa-sort-amount-down mx-2 mt-2" />
						)}
					</Link>
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Sort from lastest to earliest"
						onClick={handleDescending}
					>
						{' '}
						{sort === 'descending' ? (
							<i className="fas fa-sort-amount-up text-blue mx-2 mt-2" />
						) : (
							<i className="fas fa-sort-amount-up mx-2 mt-2" />
						)}
					</Link>
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Only show institutional events"
						onClick={handleType}
					>
						{' '}
						{type === 'institutional' ? (
							<i className="fas fa-university text-blue mx-2 mt-2" />
						) : (
							<i className="fas fa-university mx-2 mt-2" />
						)}
					</Link>
					{user.profile.tags.length !== 0 ? (
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Filter with your Profile topics"
							onClick={handleTags}
						>
							{' '}
							{tags.length === 0 ? (
								<i className="fas fa-tags mx-2 mt-2" />
							) : (
								<i className="fas fa-tags text-blue mx-2 mt-2" />
							)}
						</Link>
					) : null}

					{window.location.pathname.includes('events') ? (
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Only show free events"
							onClick={handlePrice}
						>
							{' '}
							{price === 0 ? (
								<i className="fab fa-creative-commons-nc-eu text-blue mx-2 mt-2" />
							) : (
								<i className="fab fa-creative-commons-nc-eu mx-2 mt-2" />
							)}
						</Link>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default FeedSearch;
