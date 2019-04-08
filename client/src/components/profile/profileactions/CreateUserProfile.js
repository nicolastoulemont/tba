import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { formatFileName, resizeImage } from '../../commons/fileManagers';
import {
	InputField,
	TextAreaField,
	DropProfileImage,
	TagsChooser
} from '../../commons/InputComponents';
import { tagsList } from '../../commons/tagsList';
import { Mutation } from 'react-apollo';
import { CREATE_PROFILE } from '../../graphql/profile/Mutations';
import { SIGN_S3 } from '../../graphql/s3/Mutation';

export default function CreateUserProfile(props) {
	const [name, setName] = useState('');
	const [position, setPosition] = useState('');
	const [bio, setBio] = useState('');
	const [picture, setPicture] = useState(null);
	const [twitter_URL, setTwitter_URL] = useState('');
	const [linkedin_URL, setLinkedin_URL] = useState('');
	const [hideSocial, setHideSocial] = useState(false);
	const [privateProfile, setprivateProfile] = useState(false);
	const [userTopics, setUserTopics] = useState([]);
	const [topicsPool, setTopicsPool] = useState(tagsList);

	const addTopic = topic => {
		setUserTopics([...userTopics, topic]);
		setTopicsPool(topicsPool.filter(item => item !== topic));
	};

	const deleteTopic = topic => {
		setTopicsPool([...topicsPool, topic]);
		setUserTopics(userTopics.filter(item => item !== topic));
	};

	const addImage = file => {
		resizeImage(file, 200, 200, setPicture);
	};

	const uploadToS3 = async (picture, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': picture.type
			}
		};
		await axios
			.put(signedRequest, picture, options)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	const createProfile = async (
		e,
		targetUser,
		addProfile,
		signS3,
		name,
		position,
		bio,
		picture,
		twitter_URL,
		linkedin_URL,
		hideSocial,
		privateProfile
	) => {
		e.preventDefault();
		if (picture) {
			const response = await signS3({
				variables: {
					filename: formatFileName(picture.name),
					filetype: picture.type
				}
			});
			const { signedRequest, url } = response.data.signS3;
			await uploadToS3(picture, signedRequest);
			await addProfile({
				variables: {
					user_ID: targetUser,
					organisation_ID: 'aazeazea',
					name,
					position,
					bio,
					twitter_URL,
					linkedin_URL,
					picture_URL: url,
					hideSocial,
					privateProfile,
					tags: userTopics
				}
			});
		} else if (!picture) {
			await addProfile({
				variables: {
					user_ID: targetUser,
					organisation_ID: 'aazeazea',
					name,
					position,
					bio,
					twitter_URL,
					linkedin_URL,
					hideSocial,
					privateProfile,
					tags: userTopics
				}
			});
		}
	};

	const currentUser = props.currentUser;
	const targetUser = props.match.params.id;
	if (currentUser !== targetUser) return <Redirect to="/error" />;
	return (
		<Fragment key={props.currentUser}>
			<div className="mx-auto p-4">
				<h6 className="text-left">Create your profile</h6>
				<Mutation mutation={SIGN_S3}>
					{(signS3, e) => (
						<Mutation mutation={CREATE_PROFILE}>
							{(addProfile, e) => (
								<form
									onSubmit={async e =>
										createProfile(
											e,
											targetUser,
											addProfile,
											signS3,
											name,
											position,
											bio,
											picture,
											twitter_URL,
											linkedin_URL,
											hideSocial,
											privateProfile,
											userTopics
										)
									}
									className="p-4"
								>
									<div className="form-row mb-2">
										<div className="col-8">
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
										</div>
										<div className="col-4">
											<DropProfileImage picture={picture} addImage={addImage} />
										</div>
									</div>
									{/* <div>Organisation selection AREA</div> */}
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

									<TagsChooser
										topicsPool={topicsPool}
										addTopic={addTopic}
										userTopics={userTopics}
										deleteTopic={deleteTopic}
									/>

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
												Hide your social activities &#40; registrations, comments, likes &#41; from
												your profile page
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
							)}
						</Mutation>
					)}
				</Mutation>
			</div>
		</Fragment>
	);
}
