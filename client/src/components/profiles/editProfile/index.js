import axios from 'axios';
import React, { Fragment, useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { formatFileName } from '../../commons/fileManagers';
import ImgHandler from '../../commons/ImgHandler';
import { TagsChooser } from '../../commons/InputComponents';
import { tagsList } from '../../commons/TagsList';
import { UserContext } from '../../contexts';
import { UPDATE_PROFILE } from '../../graphql/profile/Mutations';
import { SIGN_S3 } from '../../graphql/s3/Mutation';
import { LOGGED_USER } from '../../graphql/user/Queries';
import CRProfileHeader from '../createProfile/header';
import CRProfileSocial from '../createProfile/socialLinks';

const EditProfile = ({ match, history }) => {
	const user = useContext(UserContext);

	const [name, setName] = useState(user.profile.name);
	const [position, setPosition] = useState(user.profile.position);
	const [bio, setBio] = useState(user.profile.bio);
	const [picture, setPicture] = useState(user.profile.picture_URL);
	const [twitter_URL, setTwitter_URL] = useState(user.profile.twitter_URL);
	const [linkedin_URL, setLinkedin_URL] = useState(user.profile.linkedin_URL);
	const [hideSocial, setHideSocial] = useState(user.profile.hideSocial);
	const [privateProfile, setprivateProfile] = useState(user.profile.privateProfile);
	const [userTopics, setUserTopics] = useState(user.profile.tags);
	const [topicsPool, setTopicsPool] = useState(
		tagsList.filter(tag => !user.profile.tags.includes(tag))
	);

	if (user.id !== match.params.id) return <Redirect to="/error" />;

	const addTopic = topic => {
		setUserTopics([...userTopics, topic]);
		setTopicsPool(topicsPool.filter(item => item !== topic));
	};

	const deleteTopic = topic => {
		setTopicsPool([...topicsPool, topic]);
		setUserTopics(userTopics.filter(item => item !== topic));
	};

	const uploadToS3 = async (picture, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': picture.type
			}
		};
		await axios.put(signedRequest, picture, options).catch(err => console.log(err));
	};

	const updateProfileWithNewPicture = async (updateProfile, signS3) => {
		const response = await signS3({
			variables: {
				filename: formatFileName(picture.name),
				filetype: picture.type
			}
		});
		const { signedRequest, url } = response.data.signS3;
		await uploadToS3(picture, signedRequest);
		await updateProfile({
			variables: {
				_id: user.profile.id,
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
		history.push(`/home/profile/${user.id}`);
	};

	const updateProfileWithOutNewPicture = async updateProfile => {
		await updateProfile({
			variables: {
				_id: user.profile.id,
				organisation_ID: 'aazeazea',
				name,
				position,
				bio,
				twitter_URL,
				linkedin_URL,
				picture_URL: user.profile.picture_URL,
				hideSocial,
				privateProfile,
				tags: userTopics
			}
		});
		history.push(`/home/profile/${user.id}`);
	};

	const editProfile = async (e, updateProfile, signS3) => {
		e.preventDefault();
		if (picture !== user.profile.picture_URL) {
			await updateProfileWithNewPicture(updateProfile, signS3);
		} else if (picture === user.profile.picture_URL) {
			await updateProfileWithOutNewPicture(updateProfile);
		}
	};

	return (
		<Fragment>
			<Mutation mutation={SIGN_S3}>
				{(signS3, e) => (
					<Mutation
						mutation={UPDATE_PROFILE}
						refetchQueries={() => {
							return [{ query: LOGGED_USER }];
						}}
					>
						{(updateProfile, e) => (
							<form onSubmit={e => editProfile(e, updateProfile, signS3)}>
								<div className="p-0 m-0">
									<h4 className="text-left pt-4 px-4">Edit your profile</h4>
									<div className="form-row pt-2 px-4">
										<div className="col-md-8">
											<CRProfileHeader
												name={name}
												setName={setName}
												position={position}
												setPosition={setPosition}
												bio={bio}
												setBio={setBio}
											/>
											<CRProfileSocial
												twitter_URL={twitter_URL}
												setTwitter_URL={setTwitter_URL}
												linkedin_URL={linkedin_URL}
												setLinkedin_URL={setLinkedin_URL}
											/>
										</div>
										<div className="col-md-4">
											<ImgHandler
												func={setPicture}
												picture={picture}
												x={150}
												y={150}
												placeholder="avatar"
											/>
										</div>
									</div>
								</div>
								<div className="px-4 py-2">
									<TagsChooser
										topicsPool={topicsPool}
										addTopic={addTopic}
										userTopics={userTopics}
										deleteTopic={deleteTopic}
										main="Choose the topics your are interested in"
										secondary="Optional but advised given the large quantity of news and events myEU aggregate"
									/>

									<div className="form-check float-left mt-2">
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
									<div className="form-check float-left mb-4">
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
									<input type="submit" className="btn btn-darkblue btn-block mt-4 mb-2" />
								</div>
							</form>
						)}
					</Mutation>
				)}
			</Mutation>
		</Fragment>
	);
};

export default EditProfile;
