import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
	InputField,
	TextAreaField,
	FileInput,
	TagsInput,
	UserTags
} from '../../commons/InputComponents';

export default function CreateUserProfile(props) {
	const [name, setName] = useState('');
	const [position, setPosition] = useState('');
	const [bio, setBio] = useState('');
	const [picture, setPicture] = useState([]);
	const [twitter_URL, setTwitter_URL] = useState('');
	const [linkedin_URL, setLinkedin_URL] = useState('');
	const [hideSocial, setHideSocial] = useState(false);
	const [privateProfile, setprivateProfile] = useState(false);
	const [userTopics, setUserTopics] = useState([]);
	const [topicsPool, setTopicsPool] = useState([
		'Brexit',
		'Environment',
		'Climate Change',
		'Energy',
		'Public Health',
		'Food Safety',
		'Agriculture',
		'Rural Development',
		'Fisheries',
		'Maritime Affairs',
		'Digital',
		'Data Protection',
		'Technology',
		'Cybersecurity',
		'Research Innovation',
		'Education',
		'Culture',
		'Employment and Social Affairs',
		'Legal Affairs',
		'Civil Liberties',
		'Constitutional Affairs',
		'Justice and Home Affairs',
		'Budgets',
		'Budgetary Control',
		'Financial Crimes, Tax Evasion and Tax Avoidance',
		'Migration',
		'Human Rights',
		'Development',
		'Security and Defense',
		'Foreign Affairs',
		'International Trade',
		'Internal Market and Consumer Protection',
		'Industry',
		'Competition',
		'Regional Development',
		'Transport',
		'Tourism',
		'Urban Development'
	]);

	const addTopic = topic => {
		setUserTopics([...userTopics, topic]);
		setTopicsPool(topicsPool.filter(item => item !== topic));
	};

	const deleteTopic = topic => {
		setTopicsPool([...topicsPool, topic]);
		setUserTopics(userTopics.filter(item => item !== topic));
	};

	const currentUser = props.currentUser;
	const targetUser = props.match.params.id;
	console.log(picture);
	if (currentUser !== targetUser) return <Redirect to="/error" />;
	return (
		<Fragment key={props.currentUser}>
			<div className="mx-auto p-4">
				<h6 className="text-left">Create your profile</h6>
				<form action="" className="p-4">
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
					<FileInput
						type="file"
						placeholder="Add a picture"
						name="picture"
						labelText="Profile picture"
						onChange={e => setPicture(e.target.files[0])}
					/>
					<img src={picture} className="rounded-circle border-avatar medium-avatar" alt="avatar" />
					<div>Organisation selection AREA</div>
					<div className="form-row mt-2">
						<div className="col">
							<TextAreaField
								type="text"
								placeholder="e.g. I'm an EU affairs professional in EU digital policies"
								name="bio"
								labelText="Bio"
								value={bio}
								onChange={e => setBio(e.target.value)}
								rows={6}
							/>
						</div>
						<div className="col">
							<p className="text-left m-0 p-0">Help people find you online</p>
							<InputField
								type="text"
								placeholder="e.g. https://twitter.com/NicoToulemont"
								name="twitter_URL"
								labelText="Twitter"
								value={twitter_URL}
								onChange={e => setTwitter_URL(e.target.value)}
							/>
							<InputField
								type="text"
								placeholder="e.g. https://www.linkedin.com/in/nicolas-toulemont-a1311083"
								labelText="LinkedIn"
								name="linkedin_URL"
								value={linkedin_URL}
								onChange={e => setLinkedin_URL(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<div>
							<p className="text-left m-0 p-0">Choose the topics your are interested in </p>
							<p className="text-left">
								<small className="font-italic">
									Optional but advised given the large quantity of news and events myEU aggregate
								</small>
							</p>
						</div>

						<div className="form-row my-2">
							<div className="col">
								<div className="border rounded text-left p-2">
									{topicsPool.map(topic => {
										return (
											<TagsInput
												topic={topic}
												addTopic={e => addTopic(topic)}
												key={
													Math.random()
														.toString(36)
														.substring(2, 15) +
													Math.random()
														.toString(36)
														.substring(2, 15)
												}
											/>
										);
									})}
								</div>
							</div>
							<div className="col">
								<div className="border rounded text-left h-100 p-2">
									{userTopics.map(topic => {
										return (
											<UserTags
												topic={topic}
												deleteTopic={e => deleteTopic(topic)}
												key={
													Math.random()
														.toString(36)
														.substring(2, 15) +
													Math.random()
														.toString(36)
														.substring(2, 15)
												}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>

					<div className="form-check float-left my-2">
						<input
							className="form-check-input"
							type="checkbox"
							id="hideSocialcheckBox"
							name="hideSocial"
							value={hideSocial}
							checked={hideSocial}
							onChange={e => setHideSocial(!hideSocial)}
						/>
						<label className="form-check-label" htmlFor="hideSocialcheckBox">
							<small className="font-italic text-muted">
								Hide your social activities &#40; registrations, comments, likes &#41; from your
								profile page
							</small>
						</label>
					</div>
					<div className="form-check float-left mt-2 mb-4">
						<input
							className="form-check-input"
							type="checkbox"
							id="privateProfilecheckBox"
							value={privateProfile}
							name="privateProfile"
							checked={privateProfile}
							onChange={e => setprivateProfile(!privateProfile)}
						/>
						<label className="form-check-label" htmlFor="privateProfilecheckBox">
							<small className="font-italic text-muted">
								Hide your profile from the profiles search feed{' '}
							</small>
						</label>
					</div>
					<input type="submit" className="btn btn-blue btn-block mt-4" />
				</form>
			</div>
		</Fragment>
	);
}
