import React, { useContext } from 'react';
import { ProfileContext, UserContext } from '../../../contexts';
import ProfileMenu from '../profileMenu/index';

const ProfileHeader = () => {
	const user = useContext(UserContext);
	const profile = useContext(ProfileContext);
	return (
		<div className="py-4 px-4 mb-2 bg-darkblue text-white">
			<div className="row">
				<div className="col-md-4">
					<div className="mx-auto">
						{profile.picture_URL ? (
							<img
								className="rounded-circle large-avatar mt-2 ml-2"
								src={profile.picture_URL}
								alt="User Avatar"
							/>
						) : (
							<i className="fas fa-user-astronaut fa-4x" />
						)}
					</div>
				</div>
				<div className="col-md-8">
					<div className="row">
						<div className="col-md-10 pl-0">
							<div className="text-center text-md-left mt-2">
								<p className="d-inline font-weight-bold text-uppercase">{profile.name}</p>
								<p className="my-1">
									{profile.position}
									<span> at {profile.organisation_ID}</span>
								</p>
								<p className="my-1">
									{profile.tags.map(tag => (
										<small
											key={Math.random()
												.toString(36)
												.substring(2, 7)}
										>
											{tag}
											{` | `}
										</small>
									))}
								</p>
								<small className="my-1">{profile.bio}</small>
								<p className="my-1">
									<a
										className="text-white pr-2"
										href={profile.twitter_URL}
										target="#"
										aria-label="twitter"
									>
										<i className="fab fa-twitter" />
									</a>
									<a
										className="text-white px-2"
										href={profile.linkedin_URL}
										target="#"
										aria-label="linkedin"
									>
										<i className="fab fa-linkedin" />
									</a>
									<a
										className="text-white pl-2"
										href="user-organisationwebsite-url"
										target="_blank"
										aria-label="user organisation website"
									>
										<i className="fas fa-globe" />
									</a>
								</p>
							</div>
						</div>
						<div className="col-md-2">{user.id === profile.user_ID ? <ProfileMenu /> : null}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
