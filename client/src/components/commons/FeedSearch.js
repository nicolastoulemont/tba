import React from 'react';
import { Link } from 'react-router-dom';

export default function FeedSearch({
	date,
	page,
	setSearch,
	sort,
	setSort,
	institutional,
	setInstitutional,
	onlyFree,
	setOnlyFree
}) {
	return (
		<div className="mx-auto py-0 px-4">
			<p className="m-0 p-0 text-left">
				<small>
					{' '}
					{date}'s {page}
				</small>
			</p>
			<div className="input-group input-group-sm mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fas fa-search" />
					</span>
				</div>
				<input
					className="form-control form-control-lg"
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
						onClick={e => setSort('ascending')}
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
						onClick={e => setSort('descending')}
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
						onClick={e => setInstitutional(!institutional)}
					>
						{' '}
						{institutional ? (
							<i className="fas fa-university text-blue mx-2 mt-2" />
						) : (
							<i className="fas fa-university mx-2 mt-2" />
						)}
					</Link>
					{page === 'events' ? (
						<Link
							to="#"
							data-togggle="tooltip"
							data-placement="bottom"
							title="Only show free events"
							onClick={e => setOnlyFree(!onlyFree)}
						>
							{' '}
							{onlyFree ? (
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
}
