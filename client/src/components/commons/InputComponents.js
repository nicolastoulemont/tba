import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const InputField = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	labelText,
	optional,
	min,
	max,
	error
}) => (
	<div className={classNames('form-group', { 'my-4': optional })}>
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
				className={classNames('form-control form-control-sm my-1', { 'is-invalid': error })}
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				min={min}
				max={max}
				minLength={min}
				maxLength={max}
			/>
			<small className="invalid-feedback text-left">
				{error && error.message ? error.message : null}
			</small>
			{max && (type === 'text' || type === 'url') && !error ? (
				<small className="float-right text-muted">
					{value.length} / {max}
				</small>
			) : null}
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
				Public Event
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
	optional,
	min,
	max,
	error
}) => (
	<div className={classNames('form-group', { 'my-4': optional })}>
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
				className={classNames('form-control form-control-sm', {
					'is-invalid': error
				})}
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				rows={rows}
				minLength={min}
				maxLength={max}
			/>
		</div>
		{error && error.message ? (
			<small className="float-left text-danger">{error.message}</small>
		) : null}
		{max && !error ? (
			<small className="float-right text-muted">
				{value.length} / {max}
			</small>
		) : null}
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

export const TagsInput = ({ topic, addTopic }) => (
	<Link to="#" onClick={addTopic}>
		<span className="badge tag actiontags">
			{topic} <i className="fas fa-plus ml-1" />
		</span>
	</Link>
);

export const UserTags = ({ topic, deleteTopic }) => (
	<Link to="#" onClick={deleteTopic}>
		<span className="badge tag actiontags">
			{topic} <i className="fas fa-times ml-1" />
		</span>
	</Link>
);

export const TagsChooser = ({ topicsPool, addTopic, userTopics, deleteTopic, main, secondary }) => (
	<div className="mt-2">
		<div className="text-left">
			<p className="m-0 p-0">{main}</p>
			<small className="font-italic text-muted d-block">{secondary}</small>
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
