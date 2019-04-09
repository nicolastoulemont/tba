import React, { Fragment } from 'react';
import { InputField, TextAreaField } from '../../../commons/InputComponents';

export default function CRProfileHeader({ name, setName, position, setPosition, bio, setBio }) {
	return (
		<Fragment>
			<InputField
				type="text"
				placeholder="e.g. Frederic Von Brexit"
				name="name"
				labelText="Name"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<InputField
				type="text"
				placeholder="e.g. Policy Officer / Citizen"
				name="position"
				labelText="Position"
				value={position}
				onChange={e => setPosition(e.target.value)}
			/>
			<TextAreaField
				type="text"
				placeholder="e.g. I'm an EU affairs professional in EU digital policies"
				name="bio"
				labelText="Bio"
				value={bio}
				onChange={e => setBio(e.target.value)}
				optional={true}
			/>
		</Fragment>
	);
}
