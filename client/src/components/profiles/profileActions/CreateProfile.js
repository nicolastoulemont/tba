import React, { Fragment, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PlaceHolderBanner from '../../../img/placeholder_event_banner.svg';
import axios from 'axios';
import { formatFileName } from '../../commons/fileManagers';
import { TagsChooser } from '../../commons/InputComponents';
import ImgHandler from '../../commons/ImgHandler';
import { InputField, TextAreaField } from '../../commons/InputComponents';
import { tagsList } from '../../commons/TagsList';
import { Mutation } from 'react-apollo';
import { CREATE_PROFILE } from '../../graphql/profile/Mutations';
import { SIGN_S3 } from '../../graphql/s3/Mutation';
import { LOGGED_USER } from '../../graphql/user/Queries';
import { UserContext } from '../../contexts';
import { findErrorInErrorsArr, frontEndProfileInputValidation } from '../../commons/ErrorsHandling';

const CreateProfile = ({
	match: {
		params: { id }
	},
	history
}) => {
	const user = useContext(UserContext);
	const [name, setName] = useState('');
	const [position, setPosition] = useState('');
	const [organisation, setOrganisation] = useState('');
	const [bio, setBio] = useState('');
	const [picture, setPicture] = useState(null);
	const [twitter_URL, setTwitter_URL] = useState('');
	const [linkedin_URL, setLinkedin_URL] = useState('');
	const [website_URL, setWebsite_URL] = useState('');
	const [hideSocial, setHideSocial] = useState(false);
	const [userTopics, setUserTopics] = useState([]);
	const [topicsPool, setTopicsPool] = useState(tagsList);

	const [errors, setErrors] = useState([]);

	const addTopic = topic => {
		setUserTopics([...userTopics, topic]);
		setTopicsPool(topicsPool.filter(item => item !== topic));
	};

	const deleteTopic = topic => {
		setTopicsPool([...topicsPool, topic]);
		setUserTopics(userTopics.filter(item => item !== topic));
	};

	if (user.id !== id) return <Redirect to="/error" />;

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'name') setName(e.target.value);
		if (e.target.name === 'position') setPosition(e.target.value);
		if (e.target.name === 'organisation') setOrganisation(e.target.value);
		if (e.target.name === 'bio') setBio(e.target.value);
		if (e.target.name === 'twitter_URL') setTwitter_URL(e.target.value);
		if (e.target.name === 'linkedin_URL') setLinkedin_URL(e.target.value);
		if (e.target.name === 'website_URL') setWebsite_URL(e.target.value);
	};

	const createProfile = async (e, addProfile, signS3) => {
		e.preventDefault();
		const err = frontEndProfileInputValidation(
			name,
			position,
			organisation,
			bio,
			twitter_URL,
			linkedin_URL,
			website_URL
		);
		if (err.length !== 0) {
			setErrors(err);
			return null;
		}
		if (picture) {
			await addProfileWithBanner(addProfile, signS3);
		} else if (!picture) {
			await addProfileWithOutBanner(addProfile);
		}
	};

	const addProfileWithBanner = async (addProfile, signS3) => {
		const response = await signS3({
			variables: {
				filename: formatFileName(picture.name),
				filetype: picture.type
			}
		});
		const { signedRequest, url } = response.data.signS3;
		await uploadToS3(picture, signedRequest);
		const res = await addProfile({
			variables: {
				user_ID: id,
				name,
				position,
				organisation,
				bio,
				twitter_URL,
				linkedin_URL,
				website_URL,
				picture_URL: url,
				hideSocial,
				tags: userTopics
			}
		});

		if (res.data.addProfile.statusCode === 201) {
			history.push(`/home/profile/${user.id}`);
		} else {
			setErrors(res.data.addProfile.errors);
			return null;
		}
	};

	const uploadToS3 = async (picture, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': picture.type
			}
		};
		await axios.put(signedRequest, picture, options).catch(err => console.log(err));
	};

	const addProfileWithOutBanner = async addProfile => {
		const res = await addProfile({
			variables: {
				user_ID: id,
				name,
				position,
				organisation,
				bio,
				twitter_URL,
				linkedin_URL,
				website_URL,
				hideSocial,
				tags: userTopics
			}
		});

		if (res.data.addProfile.statusCode === 201) {
			history.push(`/home/profile/${user.id}`);
		} else {
			setErrors(res.data.addProfile.errors);
			return null;
		}
	};

	return (
		<Fragment>
			<Mutation mutation={SIGN_S3}>
				{(signS3, e) => (
					<Mutation
						mutation={CREATE_PROFILE}
						refetchQueries={() => {
							return [{ query: LOGGED_USER }];
						}}
					>
						{(addProfile, e) => (
							<form onSubmit={async e => createProfile(e, addProfile, signS3)}>
								<div className="px-3 pb-2 m-0">
									<div className="row">
										<img src={PlaceHolderBanner} alt="Default Profile Banner" />
									</div>
									<div className="row">
										<div className="col-md-3">
											<ImgHandler
												func={setPicture}
												picture={picture}
												x={150}
												y={150}
												placeholder="avatar"
											/>
										</div>
										<div className="col-md-9">
											<h4 className="text-left">Create your profile</h4>
											<InputField
												type="text"
												placeholder="e.g. Frederic Von Brexit"
												name="name"
												labelText="Name"
												value={name}
												onChange={onChange}
												error={findErrorInErrorsArr(errors, 'name')}
												min={1}
												max={70}
											/>
										</div>
									</div>
									<InputField
										type="text"
										placeholder="e.g. Policy Officer / Citizen"
										name="position"
										labelText="Position"
										value={position}
										onChange={onChange}
										error={findErrorInErrorsArr(errors, 'position')}
										max={70}
									/>
									<InputField
										type="text"
										name="organisation"
										placeholder="Your employer"
										labelText="Organisation"
										value={organisation}
										onChange={onChange}
										optional={true}
										error={findErrorInErrorsArr(errors, 'organisation')}
										max={70}
									/>
									<TextAreaField
										type="text"
										placeholder="e.g. I'm an EU affairs professional in EU digital policies"
										name="bio"
										labelText="Bio"
										value={bio}
										onChange={onChange}
										error={findErrorInErrorsArr(errors, 'bio')}
										optional={true}
										max={280}
									/>
									<InputField
										type="url"
										placeholder="e.g. https://twitter.com/yourprofile"
										name="twitter_URL"
										labelText="Twitter"
										value={twitter_URL}
										onChange={onChange}
										error={findErrorInErrorsArr(errors, 'twitter_URL')}
										optional={true}
										max={140}
									/>
									<InputField
										type="url"
										placeholder="e.g. https://www.linkedin.com/in/yourprofile"
										name="linkedin_URL"
										labelText="LinkedIn"
										value={linkedin_URL}
										onChange={onChange}
										error={findErrorInErrorsArr(errors, 'linkedin_URL')}
										optional={true}
										max={140}
									/>

									<InputField
										type="url"
										placeholder="e.g. https://www.myeu.eu"
										name="website_URL"
										labelText="Your organisation website"
										value={website_URL}
										onChange={onChange}
										error={findErrorInErrorsArr(errors, 'website_URL')}
										optional={true}
										max={140}
									/>

									<div className="form-check text-left mt-2">
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
												Hide your activities &#40; events, comments, likes &#41; from your profile
												page
											</small>
										</label>
									</div>

									<div className="py-2 text-left">
										<TagsChooser
											topicsPool={topicsPool}
											addTopic={addTopic}
											userTopics={userTopics}
											deleteTopic={deleteTopic}
											main="Choose the topics your are interested in"
											secondary="Will allow you to quickly find the informations you are interested in"
										/>

										<input type="submit" className="btn bg-blue text-white btn-block mt-4 mb-2" />
									</div>
								</div>
							</form>
						)}
					</Mutation>
				)}
			</Mutation>
		</Fragment>
	);
};

export default CreateProfile;
