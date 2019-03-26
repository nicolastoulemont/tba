const gravatar = require('gravatar');
const { isAuthorized } = require('../validation/isAuthorized');

const buildProfile = async (args, User, Profile) => {
	try {
		const user = User.findById(args.user_ID);
		const picture_URL = gravatar.url(user.email, { s: '200', r: 'pg', d: 'mm' });

		let profile = await new Profile({
			user_ID: args.user_ID,
			organisation_ID: args.organisation_ID,
			name: args.name,
			position: args.position,
			showSocial: args.showSocial,
			privateProfile: args.privateProfile,
			bio: args.bio,
			twitter_URL: args.twitter_URL,
			linkedin_URL: args.linkedin_URL,
			picture_URL: picture_URL,
			interestOne: args.interestOne,
			interestTwo: args.interestTwo,
			interestThree: args.interestThree,
			createdAt: new Date(),
			updatedAt: new Date()
		}).save();
		return { success: true, profile };
	} catch (err) {
		console.log(err);
		return { success: false, error: err };
	}
};

const updateProfile = async (args, user, User, Profile) => {
	try {
		if (!(await isAuthorized(args, user, User))) return new Error('You cannot perform this action');

		let updateProfile = {};
		if (args.organisation_ID) updateProfile.organisation_ID = args.organisation_ID;
		if (args.name) updateProfile.name = args.name;
		if (args.position) updateProfile.position = args.position;
		if (args.showSocial) updateProfile.showSocial = args.showSocial;
		if (args.privateProfile) updateProfile.privateProfile = args.privateProfile;
		if (args.bio) updateProfile.bio = args.bio;
		if (args.twitter_URL) updateProfile.twitter_URL = args.twitter_URL;
		if (args.linkedin_URL) updateProfile.linkedin_URL = args.linkedin_URL;
		if (args.picture_URL) updateProfile.picture_URL = args.picture_URL;
		if (args.interestOne) updateProfile.interestOne = args.interestOne;
		if (args.interestTwo) updateProfile.interestTwo = args.interestTwo;
		if (args.interestThree) updateProfile.interestThree = args.interestThree;
		updateProfile.updatedAt = new Date();
		return {
			success: true,
			profile: await Profile.findByIdAndUpdate(args._id, updateProfile, {
				new: true
			})
		};
	} catch (err) {
		console.log(err);
		return { success: false, error: err };
	}
};

const deleteProfile = async (args, user, User, Profile) => {
	try {
		if (!(await isAuthorized(args, user, User))) return new Error('You cannot perform this action');

		return {
			success: true,
			deleteProfile: await Profile.findByIdAndDelete(args._id)
		};
	} catch (err) {
		console.log(err);
		return { success: false, error: err };
	}
};

module.exports = { buildProfile, updateProfile, deleteProfile };
