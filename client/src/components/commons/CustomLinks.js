import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const RespSmallAvatarLink = ({ id, avatar }) => {
	return (
		<Link to={{ pathname: `/home/profile/${id}` }}>
			{avatar ? (
				<Fragment>
					<img
						className="d-none d-md-block rounded-circle border-avatar small-avatar mx-auto"
						src={avatar}
						alt="User Avatar"
					/>
					<img
						className="d-block d-md-none rounded-circle border-avatar ultra-small-avatar mr-2"
						src={avatar}
						alt="User Avatar"
					/>
				</Fragment>
			) : (
				<i className="fas fa-user-astronaut fa-3x" />
			)}
		</Link>
	);
};

export const UserNameLink = ({ id, name }) => {
	return (
		<Link
			to={{
				pathname: `/profile/${id}`
			}}
			className="d-none d-md-inline-block font-weight-bold text-darkblue"
		>
			{name}
		</Link>
	);
};
