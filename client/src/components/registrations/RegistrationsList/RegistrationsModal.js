import React, { useState } from 'react';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import RegistrationsWordList from './RegistrationsWordList';
import RegistrationsExcelTable from './RegistrationsExcelTable';

const RegistrationsModal = ({ event, registrations }) => {
	const [showWord, setShowWord] = useState(true);
	const [showExcel, setShowExcel] = useState(false);

	const displayExcel = () => {
		setShowExcel(true);
		setShowWord(false);
	};
	const displayWord = () => {
		setShowExcel(false);
		setShowWord(true);
	};

	const HTMLtoWord = () => {
		const header =
			"<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
			"xmlns:w='urn:schemas-microsoft-com:office:word' " +
			"xmlns='http://www.w3.org/TR/REC-html40'>" +
			"<head><meta charset='utf-8'><title>Event full participants list</title></head><body>";
		const footer = '</body></html>';
		const sourceHTML = header + document.getElementById('download-word-list').innerHTML + footer;

		const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
		const fileDownload = document.createElement('a');
		document.body.appendChild(fileDownload);
		fileDownload.href = source;
		fileDownload.download = `${event.name}-fullparticipantslist.doc`;
		fileDownload.click();
		document.body.removeChild(fileDownload);
	};

	const HTMLtoExcel = () => {
		const wb = XLSX.utils.table_to_book(document.getElementById('download-excel-list'), {
			sheet: 'Event-Participants-List'
		});
		const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

		const s2ab = s => {
			const buf = new ArrayBuffer(s.length);
			const view = new Uint8Array(buf);
			for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
			return buf;
		};

		saveAs(
			new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
			'Event-participants-list.xlsx'
		);
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
							{showExcel ? (
								<Link to="#" className="badge bg-blue text-white p-2 mr-2" onClick={displayWord}>
									Show <i className="far fa-file-word" />
								</Link>
							) : null}
							{showWord ? (
								<Link
									to="#"
									className="badge bg-excel-green text-white p-2 mr-2"
									onClick={displayExcel}
								>
									Show <i className="far fa-file-excel" />
								</Link>
							) : null}
							{showWord ? (
								<Link to="#" className="badge bg-blue text-white p-2 mr-2" onClick={HTMLtoWord}>
									Download <i className="far fa-file-word" />
								</Link>
							) : null}
							{showExcel ? (
								<Link
									to="#"
									className="badge bg-excel-green text-white p-2 mr-2"
									id="excel-dl"
									onClick={HTMLtoExcel}
								>
									Download <i className="far fa-file-excel" />
								</Link>
							) : null}

							<Link to="#" data-dismiss="modal">
								<i className="fas fa-times ml-2" />
							</Link>
						</div>
					</div>
					<div className="modal-title" />
					<div className="modal-body">
						{showWord && <RegistrationsWordList registrations={registrations} />}
						{showExcel && <RegistrationsExcelTable registrations={registrations} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegistrationsModal;
