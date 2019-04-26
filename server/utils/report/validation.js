const { Report } = require('../../models');
const { isEmpty } = require('../general');
const Validator = require('validator');

const ValidateAddReport = async data => {
	let errors = [];

	data.text = !isEmpty(data.text) ? data.text : '';

	if (!Validator.isLength(data.text, { min: 5, max: 500 })) {
		let reportTextError = {
			path: 'text',
			message: 'The report  must be between 5 and 500 characters'
		};
		errors.push(reportTextError);
	}

	if (data.event_ID) {
		const EventReported = await Report.findOne({
			event_ID: data.event_ID,
			user_ID: data.user_ID
		});
		if (EventReported) {
			let EventReportedError = {
				path: 'event',
				message: 'You already reported this event'
			};
			errors.push(EventReportedError);
		}
	}

	if (data.comment_ID) {
		const CommentReported = await Report.findOne({
			comment_ID: data.comment_ID,
			user_ID: data.user_ID
		});
		if (CommentReported) {
			let CommentReportedError = {
				path: 'comment',
				message: 'You already reported this comment'
			};
			errors.push(CommentReportedError);
		}
	}

	if (data.organisationId) {
		const OrganisationReported = await Report.findOne({
			organisationId: data.organisationId,
			user_ID: data.user_ID
		});
		if (OrganisationReported) {
			let OrganisationReportedError = {
				path: 'organisation',
				message: 'You already reported this organisation'
			};
			errors.push(OrganisationReportedError);
		}
	}

	if (data.poll_ID) {
		const PollReported = await Report.findOne({
			poll_ID: data.poll_ID,
			user_ID: data.user_ID
		});
		if (PollReported) {
			let PollReportedError = {
				path: 'poll',
				message: 'You already reported this poll'
			};
			errors.push(PollReportedError);
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { ValidateAddReport };
