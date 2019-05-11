import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts';
import { useStateValue } from '../contexts/InitialState';
import classNames from 'classnames';

const FeedSearch = ({
	date,
	setSearch,
	sort,
	setSort,
	type,
	setType,
	price,
	setPrice,
	setDisplayRegistrations,
	displayRegistrations,
	tags,
	setTags,
	errors,
	setErrors
}) => {
	const [{ userSearchPref }, dispatch] = useStateValue();
	const user = useContext(UserContext);
	const handleSearch = e => {
		if (errors.length !== 0) setErrors([]);
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
			setTags(user.profile[0].tags);
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

	const path = window.location.pathname;

	return (
		<div className="mx-auto py-0 px-2">
			<h6 className="text-left"> {date}</h6>
			<div className="input-group input-group-sm mb-3">
				<input
					className={classNames('form-control form-control-lg rounded-pill', {
						'is-invalid': errors.length !== 0
					})}
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
					{path.includes('news') || path.includes('events') ? (
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
					) : null}

					{user.profile[0] &&
					user.profile[0].tags &&
					user.profile[0].tags.length !== 0 &&
					!path.includes('activities') ? (
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

					{path.includes('events') ? (
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
					{path.includes('activities') ? (
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Show your events"
							onClick={e => setDisplayRegistrations(false)}
						>
							{' '}
							{!displayRegistrations ? (
								<i className="far fa-calendar text-blue mx-2 mt-2" />
							) : (
								<i className="far fa-calendar mx-2 mt-2" />
							)}
						</Link>
					) : null}
					{path.includes('activities') ? (
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Show your registrations"
							onClick={e => setDisplayRegistrations(true)}
						>
							{' '}
							{displayRegistrations ? (
								<i className="fas fa-bookmark text-blue mx-2 mt-2" />
							) : (
								<i className="fas fa-bookmark mx-2 mt-2" />
							)}
						</Link>
					) : null}
				</div>
				{errors.length !== 0 ? (
					<Fragment>
						{errors.map(error => (
							<small
								className="invalid-feedback text-left"
								key={Math.random()
									.toString(36)
									.substring(2, 7)}
							>
								{error.message}
							</small>
						))}
					</Fragment>
				) : null}
			</div>
		</div>
	);
};

export default FeedSearch;
