import React from 'react';

const RegistrationsWordList = ({ registrations }) => {
	return (
		<div id="download-word-list">
			{registrations.map(registration => (
				<div className="border-0 text-left px-4 " key={registration.id}>
					<p>
						{registration.creator[0].profile[0].name} -{' '}
						{registration.creator[0].profile[0].position}{' '}
						{registration.creator[0].profile[0].organisation
							? `- ${registration.creator[0].profile[0].organisation}`
							: null}
					</p>
				</div>
			))}
		</div>
	);
};

export default RegistrationsWordList;
