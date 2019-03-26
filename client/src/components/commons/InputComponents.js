import React from 'react';

export const InputField = ({ type, name, placeholder, value, onChange, labelText, usageExpl }) => {
	return (
		<div className="form-group">
			{labelText ? (
				<div className="d-block">
					{' '}
					<p className="text-left m-0 p-0">{labelText}</p>{' '}
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
};

export const InputCheck = ({ type, name, id, value, checked, onChange }) => {
	return (
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
};

export const TextAreaField = ({ type, name, placeholder, value, onChange, labelText }) => {
	return (
		<div className="form-group">
			{labelText ? (
				<div className="d-block">
					{' '}
					<p className="text-left m-0 p-0">{labelText}</p>{' '}
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
				/>
			</div>
		</div>
	);
};

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

export const InputGroup = ({ type, name, placeholder, value, icon, onChange }) => {
	return (
		<div className="input-group mb-3">
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
	);
};
