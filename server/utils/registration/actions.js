const buildRegistration = async (args, Registration) => {
	try {
		let newRegistration = await new Registration({
			user_ID: args.user_ID,
			event_ID: args.event_ID,
			eventName: args.eventName,
			eventCity: args.eventCity,
			eventAddress: args.eventAddress,
			eventStart: new Date(args.eventStart),
			eventEnd: new Date(args.eventEnd),
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();
		return { success: true, newRegistration };
	} catch (err) {
		console.log(err);
		return { success: false, error };
	}
};

const deleteRegistration = async (args, Registration) => {
	try {
		return await Registration.findByIdAndDelete(args._id);
	} catch (err) {
		console.log(err);
	}
};

module.exports = { buildRegistration, deleteRegistration };
