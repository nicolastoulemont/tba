const findRegistration = async (args, Registration) => {
	try {
		const registration = await Registration.findById(args.id);
		return {
			statusCode: 200,
			ok: true,
			body: registration
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
const findRegistrations = async (args, Registration) => {
	try {
		const registrations = await Registration.find({});
		return {
			statusCode: 200,
			ok: true,
			body: registrations
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

const searchUserRegistrations = async (date, dayafter, args, Registration) => {
	try {
		const registrations = await Registration.find({
			user_ID: args.user_ID,
			eventStart: { $gte: date, $lte: dayafter },
			eventName: { $regex: new RegExp(args.search, 'i') }
		})
			.sort({ start: args.sort })
			.limit(args.limit);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: registrations
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

const findUserFutureRegistrations = async (args, Registration) => {
	const date = new Date(args.date);
	try {
		const registrations = await Registration.find({
			user_ID: args.user_ID,
			eventStart: { $gte: date }
		});
		return {
			statusCode: 200,
			ok: true,
			body: registrations
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
const findUserPastRegistrations = async (args, Registration) => {
	const date = new Date(args.date);
	try {
		const registrations = await Registration.find({
			user_ID: args.user_ID,
			eventStart: { $lte: date }
		}).sort({ eventStart: 'descending' });
		return {
			statusCode: 200,
			ok: true,
			body: registrations
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

const findEventRegistrations = async (args, Registration) => {
	try {
		const registrations = await Registration.find({ event_ID: args.event_ID });
		return {
			statusCode: 200,
			ok: true,
			body: registrations
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
	findRegistration,
	findRegistrations,
	searchUserRegistrations,
	findUserFutureRegistrations,
	findUserPastRegistrations,
	findEventRegistrations
};
