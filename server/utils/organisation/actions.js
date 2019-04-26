const buildOrganisation = async (args, Organisation) => {
	try {
		let organisation = await new Organisation({
			user_ID: args.user_ID,
			name: args.name,
			address: args.address,
			description: args.description,
			type: args.type,
			registryId: args.registryId
		}).save();
		return { success: true, organisation };
	} catch (e) {
		console.log(e);
	}
};

const updateOrganisation = async (args, Organisation) => {
	let updateOrg = {};
	if (args.name) updateOrg.name = args.name;
	if (args.description) updateOrg.description = args.description;
	if (args.address) updateOrg.address = args.address;
	if (args.type) updateOrg.type = args.type;
	if (args.registryId) updateOrg.registryId = args.registryId;

	try {
		const newOrg = await Organisation.findByIdAndUpdate(args._id, updateOrg, {
			new: true
		});
		return { success: true, newOrg };
	} catch (err) {
		console.log(err);
		return {
			success: false,
			errors: { path: 'save', message: 'Something went wrong' }
		};
	}
};

const deleteOrganisation = async (args, Organisation) => {
	try {
		const deleteOrganisation = await Organisation.findByIdAndDelete(args._id);
		if (deleteOrganisation) return { success: true };
	} catch (e) {
		console.log(e);
		return { success: false, error };
	}
};

module.exports = { buildOrganisation, updateOrganisation, deleteOrganisation };
