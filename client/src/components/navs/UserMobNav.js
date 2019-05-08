import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DatesPicker from '../sidebar/DatesPicker';
import DefaultAvatar from '../../img/avatar_default.svg';
import { UserContext } from '../contexts';
import { useStateValue } from '../contexts/InitialState';

const UserMobNav = ({ history }) => {
	const user = useContext(UserContext);
	const [
		{
			userSearchPref: { dateString }
		}
	] = useStateValue();

	const [showDatePicker, setShowDatePicker] = useState(false);

	const logOut = e => {
		localStorage.removeItem('token');
		localStorage.removeItem('uuid');
	};

	const path = window.location.pathname;
	return (
		<Fragment>
			<div className="justify-text-center">
				<div className="mobileNav d-block d-lg-none">
					<div className="row">
						<div className="col px-0 text-center pl-1">
							<Link
								className="nav-link"
								to={`/home/news/${dayjs().format('YYYY-MM-DD')}`}
								data-togggle="tooltip"
								data-placement="bottom"
								title="Find out about all the EU affairs news"
							>
								<i className="d-inline fas fa-home" />
							</Link>
						</div>
						<div className="col px-0 text-center">
							<Link
								className="nav-link"
								to={`/home/events/${dateString}`}
								data-togggle="tooltip"
								data-placement="bottom"
								title="Find all the EU related events"
							>
								<i className="d-inline far fa-calendar" />
							</Link>
						</div>
						<div className="col px-0 text-center pr-2">
							{user && user.profile ? (
								<Link
									className="nav-link"
									to={`/home/activities/${user.id}`}
									data-togggle="tooltip"
									data-placement="bottom"
									title="Monitor your events and registrations in depth"
								>
									<i className="d-inline fas fa-clipboard" />
								</Link>
							) : null}
						</div>
						{path.includes('news') || path.includes('activities') || path.includes('events') ? (
							<div className="col px-0 text-center pr-2">
								<Link
									className="nav-link"
									to="#"
									onClick={e => setShowDatePicker(!showDatePicker)}
									data-togggle="tooltip"
									data-placement="bottom"
									title="Select a date or a range of dates"
								>
									<i className="d-inline fas fa-calendar-day" />
								</Link>
							</div>
						) : null}
						<div className="col px-0 text-center pr-2">
							<li className="nav-item dropup">
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
									<i className="fas fa-bars" />
								</Link>
								<div className="dropdown-menu dropdown-menu-right text-right">
									{user.profile && user.profile.picture_URL ? (
										<Link
											to={`/home/profile/${user.id}`}
											className="dropdown-item py-2 px-4 drop-link"
										>
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
									{user.profile ? (
										<Link
											to={`/home/event/create/${user.id}`}
											className="dropdown-item py-2 px-4 drop-link"
										>
											<i className="d-inline align-middle fas fa-plus" />
											<h6 className="d-inline align-middle ml-2">Host an Event</h6>
										</Link>
									) : null}
									<Link
										to={`/home/account/${user.id}`}
										className="dropdown-item py-2 px-4 drop-link"
									>
										<i className="d-inline align-middle fas fa-cog" />
										<h6 className="d-inline align-middle ml-2">User settings</h6>
									</Link>
									<Link to="#" onClick={logOut} className="dropdown-item py-2 px-4 drop-link">
										<i className="d-inline align-middle fas fa-sign-out-alt" />
										<h6 className="d-inline align-middle ml-2">Log Out</h6>
									</Link>
								</div>
							</li>
						</div>
					</div>
				</div>
			</div>
			{showDatePicker ? (
				<div className="d-block d-lg-none show-datepicker text-center">
					<DatesPicker history={history} setShowDatePicker={setShowDatePicker} mobile={true} />
				</div>
			) : null}
		</Fragment>
	);
};

export default UserMobNav;
