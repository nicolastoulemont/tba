import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import HEDisplay from './HEDisplay';

export default function HEEventsPanel({ user }) {
	const [target, setTarget] = useState('future');
	return (
		<Fragment>
			<div className="row m-0 p-0">
				<div className="col-6 p-0 py-0" />
				<div className="col-6 p-0 py-0">
					<Link
						to="#"
						className="link-menu mx-4"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Upcoming events"
						onClick={e => setTarget('future')}
					>
						<small className="d-inline font-weight-bold text-muted">Next 5</small>{' '}
					</Link>
					<Link
						to="#"
						className="link-menu mx-4"
						data-togggle="tooltip"
						data-placement="bottom"
						title="Past events"
						onClick={e => setTarget('past')}
					>
						<small className="d-inline font-weight-bold text-muted">Last 5</small>{' '}
					</Link>
				</div>
			</div>
			<div className="my-2 w-100">
				<HEDisplay target={target} />
			</div>
		</Fragment>
	);
}
