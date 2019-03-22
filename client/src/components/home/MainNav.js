import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function MainNav() {
	const today = new Date();
	return (
		<div className="row m-0 p-0">
			<div className="col border-right p-0 py-2">
				<Link to="/home/news" className="link-menu">
					<i className="d-inline far fa-paper-plane mr-2" />
					<h6 className="d-inline font-weight-bold text-uppercase">NEWS</h6>
				</Link>
			</div>
			<div className="col p-0 py-2">
				<Link
					to={`/home/events/${dayjs(today).format('YYYY-MM-DD')}`}
					className="align-middle link-menu"
				>
					<i className="d-inline far fa-calendar mr-2" />
					<h6 className="d-inline font-weight-bold text-uppercase">EVENTS</h6>
				</Link>
			</div>
		</div>
	);
}
