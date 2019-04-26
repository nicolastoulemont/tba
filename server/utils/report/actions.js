const buildReport = async (args, Report) => {
	try {
		let report = await new Report({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			poll_ID: args.poll_ID,
			comment_ID: args.comment_ID,
			organisation_ID: args.organisation_ID,
			profile_ID: args.profile_ID,
			text: args.text
		}).save();
		return { success: true, report };
	} catch (err) {
		console.log(err);
		return { success: false, error };
	}
};

const deleteReport = async (args, Report) => {
	try {
		return await Report.findByIdAndDelete(args._id);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { buildReport, deleteReport };
