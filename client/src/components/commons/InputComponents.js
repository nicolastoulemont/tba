import React from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import DefaultAvatar from '../../img/default_user_avatar.png';

export const InputField = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	labelText,
	usageExpl,
	optional
}) => (
	<div className="form-group">
		{labelText ? (
			<div className="d-block">
				{' '}
				<p className="float-left m-0 p-0">{labelText}</p>{' '}
				{optional ? (
					<p className="float-right m-0 p-0">
						<small>Optional</small>
					</p>
				) : null}
			</div>
		) : null}
		<div className="d-block">
			<input
				className="text-secondary form-control form-control-sm my-1"
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
		{usageExpl ? (
			<div className="d-block text-left p-0 m-0">
				{' '}
				<small className="text-secondary m-0 p-0 font-italic">{usageExpl}</small>{' '}
			</div>
		) : null}
	</div>
);

export const FileInput = ({ type, name, placeholder, value, onChange, labelText }) => (
	<div className="form-group">
		{labelText ? (
			<div className="d-block">
				{' '}
				<p className="text-left m-0 p-0">{labelText}</p>{' '}
			</div>
		) : null}
		<div className="custom-file my-2">
			<input
				type={type}
				className="custom-file-input"
				name={name}
				value={value}
				onChange={onChange}
				id="profilePictureFile"
			/>
			<label className="custom-file-label text-left" htmlFor="profilePictureFile">
				<small>{placeholder}</small>
			</label>
		</div>
	</div>
);

export const InputCheck = ({ type, name, id, value, checked, onChange }) => (
	<div className="form-group">
		<div className="form-check">
			<input
				className="form-check-input"
				type={type}
				name={name}
				id={id}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<label className="text-secondary form-check-label" htmlFor="iseventpublic">
				Pubic Event
			</label>
		</div>
	</div>
);

export const TextAreaField = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	labelText,
	rows,
	optional
}) => (
	<div className="form-group">
		{labelText ? (
			<div className="d-block">
				{' '}
				<p className="float-left m-0 p-0">{labelText}</p>{' '}
				{optional ? (
					<p className="float-right m-0 p-0">
						<small>Optional</small>
					</p>
				) : null}
			</div>
		) : null}
		<div className="d-block">
			<textarea
				className="text-secondary form-control form-control-sm"
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				rows={rows}
			/>
		</div>
	</div>
);

export const SelectListGroup = ({ name, options, value, onChange }) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));

	return (
		<div className="form-group">
			<select
				className="form-control form-control-sm"
				name={name}
				value={value}
				onChange={onChange}
			>
				{selectOptions}
			</select>
		</div>
	);
};

export const InputGroup = ({ type, name, placeholder, value, icon, onChange }) => (
	<div className="mx-auto py-2 px-4">
		<div className="input-group input-group-sm mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input
				className="form-control form-control-lg"
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
			/>
		</div>
	</div>
);

export const TagsInput = ({ topic, addTopic }) => (
	<Link to="#" onClick={addTopic}>
		<span className="badge badge-pill border-grey m-1">
			{topic} <i className="fas fa-plus ml-1" />
		</span>
	</Link>
);

export const UserTags = ({ topic, deleteTopic }) => (
	<Link to="#" onClick={deleteTopic}>
		<span className="badge badge-pill border-grey  m-1">
			{topic} <i className="fas fa-times ml-1" />
		</span>
	</Link>
);

export const DropProfileImage = ({ picture, addImage }) => (
	<Dropzone
		accept={'image/*'}
		multiple={false}
		maxSize={2097152}
		onDrop={acceptedFiles => addImage(acceptedFiles[0])}
	>
		{({ getRootProps, getInputProps }) => (
			<section className="mt-2">
				<div {...getRootProps()} className="h-100">
					<div>
						{!picture ? (
							<img
								src={DefaultAvatar}
								className="extra-large-avatar rounded-circle"
								alt="Default avatar"
							/>
						) : (
							<img
								src={URL.createObjectURL(picture)}
								className="extra-large-avatar rounded-circle"
								alt="avatar"
							/>
						)}
						<input {...getInputProps()} />
					</div>
				</div>
			</section>
		)}
	</Dropzone>
);

export const TagsChooser = ({ topicsPool, addTopic, userTopics, deleteTopic }) => (
	<div>
		<div>
			<p className="m-0 p-0">Choose the topics your are interested in </p>
			<p>
				<small className="font-italic">
					Optional but advised given the large quantity of news and events myEU aggregate
				</small>
			</p>
		</div>

		<div className="form-row my-2">
			<div className="col-md-6">
				<div className="border rounded text-left p-2">
					{topicsPool.map(topic => {
						return (
							<TagsInput
								topic={topic}
								addTopic={e => addTopic(topic)}
								key={Math.random()
									.toString(36)
									.substring(2, 7)}
							/>
						);
					})}
				</div>
			</div>
			<div className="col-md-6">
				<div className="border rounded text-left h-100 p-2">
					{userTopics.map(topic => {
						return (
							<UserTags
								topic={topic}
								deleteTopic={e => deleteTopic(topic)}
								key={Math.random()
									.toString(36)
									.substring(2, 7)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	</div>
);
