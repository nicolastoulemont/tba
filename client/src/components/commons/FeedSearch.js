import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../contexts/InitialState';

const FeedSearch = ({ date, page, setSearch, sort, setSort, type, setType, price, setPrice }) => {
	const [{ userSearchPref }, dispatch] = useStateValue();

	const handleAscending = () => {
		dispatch({
			type: 'SET_SORT',
			newSort: {
				sort: 'ascending',
				type: userSearchPref.type,
				price: userSearchPref.price
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
				price: userSearchPref.price
			}
		});
		setSort('descending');
	};

	const handlePrice = () => {
		if (price === 0) {
			dispatch({
				type: 'SET_PRICE',
				newPrice: {
					sort: userSearchPref.sort,
					type: userSearchPref.type,
					price: 10000
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
					price: 0
				}
			});
			setPrice(0);
		}
	};

	const handleType = () => {
		if (type === '') {
			dispatch({
				type: 'SET_TYPE',
				newType: {
					sort: userSearchPref.sort,
					type: 'institutional',
					price: userSearchPref.price
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
					price: userSearchPref.price
				}
			});
			setType('');
		}
	};

	return (
		<div className="mx-auto py-0 px-2">
			<h6 className="text-left">
				{' '}
				{date}'s {page}
			</h6>
			<div className="input-group input-group-sm mb-3">
				<input
					className="form-control form-control-lg rounded-pill"
					type="text"
					placeholder="Search..."
					onChange={e => setSearch(e.target.value)}
				/>
				<div className="input-group-append">
					<Link
						to="#"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Sort from earliest to lastest"
						onClick={e => handleAscending(e)}
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
						onClick={e => handleDescending(e)}
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
						onClick={e => handleType(e)}
					>
						{' '}
						{type === 'institutional' ? (
							<i className="fas fa-university text-blue mx-2 mt-2" />
						) : (
							<i className="fas fa-university mx-2 mt-2" />
						)}
					</Link>
					{window.location.pathname.includes('events') ? (
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Only show free events"
							onClick={e => handlePrice(e)}
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
