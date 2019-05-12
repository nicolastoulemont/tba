const buildProfile = async (args, Profile) => {
	try {
		let profile = await new Profile({
			user_ID: args.user_ID,
			name: args.name,
			position: args.position,
			organisation: args.organisation,
			hideSocial: args.hideSocial,
			bio: args.bio,
			twitter_URL: args.twitter_URL,
			linkedin_URL: args.linkedin_URL,
			website_URL: args.website_URL,
			picture_URL: args.picture_URL,
			createdAt: new Date(),
			updatedAt: new Date(),
			tags: args.tags
		}).save();

		return {
			statusCode: 201,
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

const updateProfile = async (args, Profile) => {
	try {
		let updateProfile = {};
		if (args.name) updateProfile.name = args.name;
		if (args.position) updateProfile.position = args.position;
		if (args.organisation) updateProfile.organisation = args.organisation;
		if (typeof args.hideSocial !== null) updateProfile.hideSocial = args.hideSocial;
		if (args.bio) updateProfile.bio = args.bio;
		if (args.twitter_URL) updateProfile.twitter_URL = args.twitter_URL;
		if (args.linkedin_URL) updateProfile.linkedin_URL = args.linkedin_URL;
		if (args.website_URL) updateProfile.website_URL = args.website_URL;
		if (args.picture_URL) updateProfile.picture_URL = args.picture_URL;
		if (args.tags) updateProfile.tags = args.tags;
		updateProfile.updatedAt = new Date();

		const newProfile = await Profile.findOneAndUpdate({ _id: args._id }, updateProfile, {
			new: true
		});

		return {
			statusCode: 201,
			ok: true,
			errors: null,
			body: newProfile
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

const deleteProfile = async (args, Profile) => {
	try {
		await Profile.findByIdAndDelete(args._id);
		return {
			statusCode: 200,
			ok: true
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

module.exports = { buildProfile, updateProfile, deleteProfile };
