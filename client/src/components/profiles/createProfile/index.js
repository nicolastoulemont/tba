import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { formatFileName } from '../../commons/fileManagers';
import { TagsChooser } from '../../commons/InputComponents';
import ImgHandler from '../../commons/ImgHandler';
import CRProfileHeader from './header';
import CRProfileSocial from './socialLinks';

import { tagsList } from '../../commons/TagsList';
import { Mutation } from 'react-apollo';
import { CREATE_PROFILE } from '../../graphql/profile/Mutations';
import { SIGN_S3 } from '../../graphql/s3/Mutation';
import { LOGGED_USER } from '../../graphql/user/Queries';

export default function CreateProfile(props) {
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

	const uploadToS3 = async (picture, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': picture.type
			}
		};
		await axios.put(signedRequest, picture, options).catch(err => console.log(err));
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

			props.history.push('/home/news');
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
			props.history.push('/home/news');
		}
	};

	const currentUser = props.currentUser;
	const targetUser = props.match.params.id;
	if (currentUser !== targetUser) return <Redirect to="/error" />;
	return (
		<Fragment key={props.currentUser}>
			<Mutation mutation={SIGN_S3}>
				{(signS3, e) => (
					<Mutation
						mutation={CREATE_PROFILE}
						refetchQueries={() => {
							return [{ query: LOGGED_USER }];
						}}
					>
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
							>
								<div className="p-0 m-0">
									<h6 className="pt-2">Create your profile</h6>
									<div className="form-row pt-2 px-4">
										<div className="col-md-4">
											<ImgHandler func={setPicture} picture={picture} x={150} y={150} />
										</div>
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
									</div>
								</div>
								<div className="px-4 py-2">
									<TagsChooser
										topicsPool={topicsPool}
										addTopic={addTopic}
										userTopics={userTopics}
										deleteTopic={deleteTopic}
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
}
