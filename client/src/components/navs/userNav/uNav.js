import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '../../../img/avatar_default.svg';
import { UserContext } from '../../contexts/index';

const UNav = () => {
	const user = useContext(UserContext);

	const logOut = e => {
		localStorage.removeItem('token');
		localStorage.removeItem('uuid');
	};
	const today = new Date().toISOString().slice(0, 10);

	return (
		<div className="collapse navbar-collapse" id="mobile-nav">
			<ul className="navbar-nav ml-auto">
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link"
						to={`/home/news/${today}`}
						data-togggle="tooltip"
						data-placement="bottom"
						title="Find out about all the EU affairs news"
					>
						<i className="d-inline fas fa-home" />
						<h6 className="d-inline ml-2">Home</h6>
					</Link>
				</li>
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link"
						to={`/home/events/${today}`}
						data-togggle="tooltip"
						data-placement="bottom"
						title="Find all the EU related events"
					>
						<i className="d-inline far fa-calendar" />
						<h6 className="d-inline ml-2">Events</h6>
					</Link>
				</li>
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link"
						to="/home/profiles"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Find the people your looking for"
					>
						<i className="d-inline fas fa-users" />
						<h6 className="d-inline ml-2">Profiles</h6>
					</Link>
				</li>
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link "
						to="/home/organisations"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Find all the EU related organisations (EU institutions, political parties, associations, etc)"
					>
						<i className="d-inline fas fa-building" />
						<h6 className="d-inline ml-2">Organisations</h6>
					</Link>
				</li>
				<li className="nav-item dropdown">
					<Link
						className="nav-link"
						to="#"
						data-toggle="dropdown"
						href="#"
						role="button"
						aria-haspopup="true"
						aria-expanded="false"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Menu"
					>
						{user.profile && user.profile.picture_URL ? (
							<img
								className="rounded-circle ultra-small-avatar"
								src={user.profile.picture_URL}
								alt="User Avatar"
							/>
						) : (
							<img
								className="rounded-circle ultra-small-avatar"
								src={DefaultAvatar}
								alt="User Avatar"
							/>
						)}
						<p className="d-inline text-left font-weight-bold align-middle ml-2">
							{user.profile && user.profile.name ? user.profile.name : <span>Menu</span>}
						</p>
						<i className="fas fa-chevron-down align-middle ml-4" />
					</Link>
					<div className="dropdown-menu dropdown-menu-right text-right">
						{user.profile && user.profile.picture_URL ? (
							<Link to={`/home/profile/${user.id}`} className="dropdown-item py-2 px-4 drop-link">
								<img
									className="rounded-circle ultra-small-avatar"
									src={user.profile.picture_URL}
									alt="User Avatar"
								/>
								<h6 className="d-inline align-middle ml-2">Your Profile</h6>
							</Link>
						) : (
							<Link
								to={`/home/profile/create/${user.id}`}
								className="dropdown-item py-2 px-4 drop-link"
							>
								<img
									className="rounded-circle ultra-small-avatar"
									src={DefaultAvatar}
									alt="User Avatar"
								/>{' '}
								<h6 className="d-inline align-middle ml-2">Create your Profile</h6>
							</Link>
						)}
						<Link to="#" className="dropdown-item py-2 px-4 drop-link">
							<i className="d-inline align-middle far fa-user" />
							<h6 className="d-inline align-middle ml-2">Your Account</h6>
						</Link>
						<Link
							to={`/home/event/create/${user.id}`}
							className="dropdown-item py-2 px-4 drop-link"
						>
							<i className="d-inline align-middle fas fa-plus" />
							<h6 className="d-inline align-middle ml-2">Add an Event</h6>
						</Link>

						<Link to="#" onClick={logOut} className="dropdown-item py-2 px-4 drop-link">
							<i className="d-inline align-middle fas fa-sign-out-alt" />
							<h6 className="d-inline align-middle ml-2">Log Out</h6>
						</Link>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default UNav;
