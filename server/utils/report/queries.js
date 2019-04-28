const findReport = async (args, Report) => {
	try {
		const report = await Report.findById(args.id);
		return {
			statusCode: 200,
			ok: true,
			body: report
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

const findReports = async (args, Report) => {
	try {
		const reports = await Report.find({});
		return {
			statusCode: 200,
			ok: true,
			body: reports
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

const findEventReports = async (args, Report) => {
	try {
		const reports = await Report.find({ event_ID: args.event_ID });
		return {
			statusCode: 200,
			ok: true,
			body: reports
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

const findCommentReports = async (args, Report) => {
	try {
		const reports = await Report.find({ comment_ID: args.comment_ID });
		return {
			statusCode: 200,
			ok: true,
			body: reports
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

const findPollReports = async (args, Report) => {
	try {
		const reports = await Report.find({ poll_ID: args.poll_ID });
		return {
			statusCode: 200,
			ok: true,
			body: reports
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

const findOrganisationReports = async (args, Report) => {
	try {
		const reports = await Report.find({ organisation_ID: args.organisation_ID });
		return {
			statusCode: 200,
			ok: true,
			body: reports
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

const findProfileReports = async (args, Report) => {
	try {
		const reports = await Report.find({ profile_ID: args.profile_ID });
		return {
			statusCode: 200,
			ok: true,
			body: reports
		};
	} catch (err) {
		return {
			statusCode: 404,
			ok: false,
			errors: {
				path: 'Not Found',
				message: 'The server cannot find the requested ressource'
			}
		};
	}
};

module.exports = {
	findReport,
	findReports,
	findEventReports,
	findCommentReports,
	findOrganisationReports,
	findPollReports,
	findProfileReports
};
