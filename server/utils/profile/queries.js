const findProfile = async (args, Profile) => {
	try {
		const profile = await Profile.findById(args.id);
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: profile
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

const findProfiles = async (args, Profile) => {
	try {
		const profiles = await Profile.find({});
		return {
			statusCode: 200,
			ok: true,
			body: profiles
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

const findProfilesByNames = async (args, Profile) => {
	try {
		const profiles = await Profile.find({
			name: { $regex: new RegExp(args.search) }
		})
			.limit(args.limit)
			.sort({ name: 1 });
		return {
			statusCode: 200,
			ok: true,
			errors: null,
			body: profiles
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

const findUserProfile = async (args, Profile) => {
	try {
		const profile = await Profile.findOne({
			user_ID: args.user_ID
		});
		return {
			statusCode: 200,
			ok: true,
			body: profile
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

module.exports = { findProfile, findProfiles, findProfilesByNames, findUserProfile };
