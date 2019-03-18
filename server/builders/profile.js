const { isAuthorized } = require('../validation/isAuthorized');

const buildProfile = async (args, Profile) => {
	try {
		let profile = new Profile({
			userId: args.userId,
			name: args.name,
			organisation: args.organisation,
			position: args.position,
			interestOne: args.interestOne,
			interestTwo: args.interestTwo,
			interestThree: args.interestThree,
			bio: args.bio,
			twitter: args.twitter,
			linkedin: args.linkedin
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
		if (args.name) updateProfile.name = args.name;
		if (args.organisation) updateProfile.organisation = args.organisation;
		if (args.position) updateProfile.position = args.position;
		if (args.interestOne) updateProfile.interestOne = args.interestOne;
		if (args.interestTwo) updateProfile.interestTwo = args.interestTwo;
		if (args.interestThree) updateProfile.interestThree = args.interestThree;
		if (args.bio) updateProfile.bio = args.bio;
		if (args.twitter) updateProfile.twitter = args.twitter;
		if (args.linkedin) updateProfile.linkedin = args.linkedin;

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
