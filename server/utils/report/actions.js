const buildReport = async (args, Report) => {
	try {
		const report = await new Report({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			poll_ID: args.poll_ID,
			comment_ID: args.comment_ID,
			organisation_ID: args.organisation_ID,
			profile_ID: args.profile_ID,
			text: args.text
		}).save();
		return {
			statusCode: 201,
			ok: true,
			errors: null,
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

const deleteReport = async (args, Report) => {
	try {
		await Report.findByIdAndDelete(args._id);
		return {
			statusCode: 200,
			ok: true
		};
	} catch {
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

module.exports = { buildReport, deleteReport };
