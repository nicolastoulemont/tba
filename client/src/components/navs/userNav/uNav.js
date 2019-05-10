import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DefaultAvatar from '../../../img/avatar_default.svg';
import { UserContext } from '../../contexts/index';
import { useStateValue } from '../../contexts/InitialState';

const UNav = () => {
	const user = useContext(UserContext);
	const [
		{
			userSearchPref: { dateString }
		}
	] = useStateValue();

	const logOut = e => {
		localStorage.removeItem('token');
		localStorage.removeItem('uuid');
	};

	return (
		// <div className="collapse navbar-collapse" id="mobile-nav">
		<ul className="navbar-nav ml-auto">
			<li className="nav-item pr-4 mt-1">
				<Link
					className="nav-link"
					to={`/home/news/${dayjs().format('YYYY-MM-DD')}`}
					data-togggle="tooltip"
					data-placement="bottom"
					title="Find out about all the EU affairs news"
				>
					<i className="d-inline fas fa-home" />
					<h6 className="d-inline ml-2">News</h6>
				</Link>
			</li>
			<li className="nav-item pr-4 mt-1">
				<Link
					className="nav-link"
					to={`/home/events/${dateString}`}
					data-togggle="tooltip"
					data-placement="bottom"
					title="Find all the EU related events"
				>
					<i className="d-inline far fa-calendar" />
					<h6 className="d-inline ml-2">Events</h6>
				</Link>
			</li>
			{user && user.profile[0] ? (
				<li className="nav-item pr-4 mt-1">
					<Link
						className="nav-link"
						to={`/home/activities/${user.id}`}
						data-togggle="tooltip"
						data-placement="bottom"
						title="Monitor your events and registrations in depth"
					>
						<i className="d-inline fas fa-clipboard" />
						<h6 className="d-inline ml-2">My Activities</h6>
					</Link>
				</li>
			) : null}

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
					{user.profile[0] && user.profile[0].picture_URL ? (
						<img
							className="rounded-circle ultra-small-avatar"
							src={user.profile[0].picture_URL}
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
						{user.profile[0] && user.profile[0].name ? user.profile[0].name : <span>Menu</span>}
					</p>
					<i className="fas fa-chevron-down align-middle ml-4" />
				</Link>
				<div className="dropdown-menu dropdown-menu-right text-right">
					{user.profile[0] && user.profile[0].picture_URL ? (
						<Link to={`/home/profile/${user.id}`} className="dropdown-item py-2 px-4 drop-link">
							<img
								className="rounded-circle ultra-small-avatar"
								src={user.profile[0].picture_URL}
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
					{user.profile[0] ? (
						<Link
							to={`/home/event/create/${user.id}`}
							className="dropdown-item py-2 px-4 drop-link"
						>
							<i className="d-inline align-middle fas fa-plus" />
							<h6 className="d-inline align-middle ml-2">Host an Event</h6>
						</Link>
					) : null}
					<Link to={`/home/account/${user.id}`} className="dropdown-item py-2 px-4 drop-link">
						<i className="d-inline align-middle fas fa-cog" />
						<h6 className="d-inline align-middle ml-2">User settings</h6>
					</Link>
					<Link to="#" onClick={logOut} className="dropdown-item py-2 px-4 drop-link">
						<i className="d-inline align-middle fas fa-sign-out-alt" />
						<h6 className="d-inline align-middle ml-2">Log Out</h6>
					</Link>
				</div>
			</li>
		</ul>
		// </div>
	);
};

export default UNav;
