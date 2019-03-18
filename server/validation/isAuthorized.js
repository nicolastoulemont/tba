const isAuthorized = async (args, user, User) => {
	try {
		const reqAuthor = await User.findOne({ _id: user.user.id });
		const reqTarget = await User.findOne({ _id: args._id });
		if (reqAuthor.email == reqTarget.email) return true;
		else return false;
	} catch (err) {
		console.log(err);
		return err;
	}
};

module.exports = { isAuthorized };
