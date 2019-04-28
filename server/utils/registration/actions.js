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

		return {
			statusCode: 201,
			ok: true,
			body: newRegistration
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

const deleteRegistration = async (args, Registration) => {
	try {
		await Registration.findByIdAndDelete(args._id);
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

module.exports = { buildRegistration, deleteRegistration };
