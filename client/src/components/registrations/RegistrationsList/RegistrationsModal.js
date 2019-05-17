import React from 'react';

import RegistrationList from './RegistrationsList';

const RegistrationsModal = ({ event, registrations }) => {
	const exportHTML = () => {
		var header =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
			"xmlns:w='urn:schemas-microsoft-com:office:word' " +
			"xmlns='http://www.w3.org/TR/REC-html40'>" +
			"<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
		var footer = '</body></html>';
		var sourceHTML = header + document.getElementById('download-list').innerHTML + footer;

		var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
		var fileDownload = document.createElement('a');
		document.body.appendChild(fileDownload);
		fileDownload.href = source;
		fileDownload.download = `${event.name}-fullparticipantslist.doc`;
		fileDownload.click();
		document.body.removeChild(fileDownload);
	};
	return (
		<div
			className="modal fade"
			id="RegistrationsModal"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="RegistrationsModal"
			aria-hidden="true"
		>
			<div className="modal-lg modal-dialog pt-2" role="document">
				<div className="modal-content p-2">
					<div className="modal-header p-2 m-0">
						<h6 className="modal-title" id="RegistrationsModal">
							<span className="d-block">{event.name}</span>
							<span className="d-block text-muted">
								Full registrations list on the {new Date().toLocaleDateString()}
							</span>
						</h6>
						<div className="d-block">
							<small>
								<button type="button" className="btn bg-blue text-white mr-2" onClick={exportHTML}>
									Download List
								</button>
								<button type="button" className="btn btn-secondary" data-dismiss="modal">
									Close
								</button>
							</small>
						</div>
					</div>
					<div className="modal-body" id="download-list">
						<RegistrationList registrations={registrations} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegistrationsModal;
