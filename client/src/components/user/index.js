import React, { useContext } from 'react';
import { UserContext } from '../contexts';
import ManageEmail from './ManageEmail';
import ManagePassword from './ManagePassword';
import DeleteAccount from './DeleteAccount';

const ManageAccount = ({ history }) => {
	const user = useContext(UserContext);
	return (
		<div className="p-4">
			<h5 className="text-left border-bottom pb-2">Account Settings</h5>
			<ManageEmail user={user} />
			<ManagePassword user={user} />
			<DeleteAccount user={user} history={history} />
		</div>
	);
};

export default ManageAccount;
