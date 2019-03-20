import React from 'react';
import dayjs from 'dayjs';
import { DateLink, WeekAction, MonthActions } from '../commons/UserActionsComponents';

export default function DateSelector({
	match: {
		params: { day }
	}
}) {
	return (
		<div className="m-0">
			<div className="d-block mb-2">
				<div className="row">
					<MonthActions
						string={dayjs(day).format('MMMM')}
						pathOne={`/home/events/${dayjs(day)
							.subtract(1, 'month')
							.format('YYYY-MM-DD')}`}
						pathTwo={`/home/events/${dayjs(day)
							.add(1, 'month')
							.format('YYYY-MM-DD')}`}
					/>
				</div>
			</div>
			<div className="row mx-auto">
				<WeekAction
					icon="fas fa-chevron-left mt-2"
					path={`/home/events/${dayjs(day)
						.subtract(7, 'day')
						.format('YYYY-MM-DD')}`}
				/>
				<DateLink
					string={dayjs(day)
						.subtract(3, 'day')
						.format('ddd')}
					number={dayjs(day)
						.subtract(3, 'day')
						.format('DD')}
					path={`/home/events/${dayjs(day)
						.subtract(3, 'day')
						.format('YYYY-MM-DD')}`}
				/>
				<DateLink
					string={dayjs(day)
						.subtract(2, 'day')
						.format('ddd')}
					number={dayjs(day)
						.subtract(2, 'day')
						.format('DD')}
					path={`/home/events/${dayjs(day)
						.subtract(2, 'day')
						.format('YYYY-MM-DD')}`}
				/>
				<DateLink
					string={dayjs(day)
						.subtract(1, 'day')
						.format('ddd')}
					number={dayjs(day)
						.subtract(1, 'day')
						.format('DD')}
					path={`/home/events/${dayjs(day)
						.subtract(1, 'day')
						.format('YYYY-MM-DD')}`}
				/>
				<div className="col p-0 m-0">
					<h6 className="text-uppercase font-weight-bold">{dayjs(day).format('ddd')}</h6>
					<h6 className="font-weight-bold">{dayjs(day).format('DD')}</h6>
				</div>
				<DateLink
					string={dayjs(day)
						.add(1, 'day')
						.format('ddd')}
					number={dayjs(day)
						.add(1, 'day')
						.format('DD')}
					path={`/home/events/${dayjs(day)
						.add(1, 'day')
						.format('YYYY-MM-DD')}`}
				/>
				<DateLink
					string={dayjs(day)
						.add(2, 'day')
						.format('ddd')}
					number={dayjs(day)
						.add(2, 'day')
						.format('DD')}
					path={`/home/events/${dayjs(day)
						.add(2, 'day')
						.format('YYYY-MM-DD')}`}
				/>
				<DateLink
					string={dayjs(day)
						.add(3, 'day')
						.format('ddd')}
					number={dayjs(day)
						.add(3, 'day')
						.format('DD')}
					path={`/home/events/${dayjs(day)
						.add(3, 'day')
						.format('YYYY-MM-DD')}`}
				/>
				<WeekAction
					icon="fas fa-chevron-right mt-2"
					path={`/home/events/${dayjs(day)
						.add(7, 'day')
						.format('YYYY-MM-DD')}`}
				/>
			</div>
		</div>
	);
}
