import React from 'react';
import ProfileMenu from './ProfileMenu';

export default function ProfileHeader({
	user_ID,
	loggedInUser,
	profile: {
		id,
		picture_URL,
		name,
		position,
		organisation_ID,
		tags,
		bio,
		twitter_URL,
		linkedin_URL
	},
	profile
}) {
	return (
		<div className="py-4 px-4 bg-darkblue text-white mb-2">
			<div className="row">
				<div className="col-md-4">
					<div className="mx-auto">
						{picture_URL ? (
							<img
								className="rounded-circle border-avatar large-avatar mt-2 ml-2"
								src={picture_URL}
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
								<p className="d-inline font-weight-bold text-uppercase">{name}</p>
								<p className="my-1">
									{position}
									<span> at {organisation_ID}</span>
								</p>
								<p className="my-1">
									{tags[0]}
									{' | '}
									{tags[1]}
									{' | '}
									{tags[2]}
								</p>
								<small className="my-1">{bio}</small>
								<p className="my-1">
									<a className="text-white pr-2" href={twitter_URL} target="#" aria-label="twitter">
										<i className="fab fa-twitter" />
									</a>
									<a
										className="text-white px-2"
										href={linkedin_URL}
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
						<div className="col-md-2">
							{loggedInUser === user_ID ? <ProfileMenu profile={profile} /> : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
