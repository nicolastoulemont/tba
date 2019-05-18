import React from 'react';

const RegistrationsExcelTable = ({ registrations }) => {
	return (
		<table className="table" id="download-excel-list">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Position</th>
					<th scope="col">Organisation</th>
				</tr>
			</thead>
			<tbody>
				{registrations.map(registration => (
					<tr key={registration.id}>
						<th scope="col" className="text-muted">
							{registration.creator[0].profile[0].name}
						</th>
						<th scope="col" className="text-muted">
							{registration.creator[0].profile[0].position}
						</th>
						<th scope="col" className="text-muted">
							{registration.creator[0].profile[0].organisation}
						</th>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default RegistrationsExcelTable;
