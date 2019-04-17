import React, { useContext } from 'react';
import { EventContext } from '../../contexts';
const EventAbout = () => {
	const { description } = useContext(EventContext);
	return (
		<div className="p-4">
			<h5 className="text-left">About</h5>
			<div className="d-flex flex-wrap text-justify align-items-center">
				<p> {description}</p>
			</div>
			<br />
		</div>
	);
};

export default React.memo(EventAbout);
