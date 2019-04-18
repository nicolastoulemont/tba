import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import DefaultNav from './defNav';
import UNav from './uNav';

const UserNav = () => {
	const Auth = useContext(AuthContext);

	return (
		<div className="d-none d-md-block">
			<nav className="navbar sticky-top navbar-expand-sm bg-white py-1">
				<div className="container px-0">
					<Link className="navbar-brand text-black align-middle" to="/">
						EU-WATCHER
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>
					{Auth() ? <UNav /> : <DefaultNav />}
				</div>
			</nav>
		</div>
	);
};

export default UserNav;
