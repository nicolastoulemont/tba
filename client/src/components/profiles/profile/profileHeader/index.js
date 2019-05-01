import React, { useContext } from 'react';
import PlaceHolderBanner from '../../../../img/placeholder_event_banner.svg';
import DefaultAvatar from '../../../../img/avatar_default.svg';
import { ProfileContext, UserContext } from '../../../contexts';
import ProfileMenu from './ProfileMenu';

const ProfileHeader = () => {
	const user = useContext(UserContext);
	const profile = useContext(ProfileContext);

	return (
		<div className="px-3 pb-2">
			<div className="row">
				<img src={PlaceHolderBanner} alt="Default Profile Banner" />
			</div>
			<div className="row">
				<div className="col-md-3">
					<div className="">
						{profile.picture_URL ? (
							<img
								className="rounded-circle large-avatar profile-avatar"
								src={profile.picture_URL}
								alt="User Avatar"
							/>
						) : (
							<img
								src={DefaultAvatar}
								className="rounded-circle large-avatar profile-avatar"
								alt="Default Profile Banner"
							/>
						)}
					</div>
				</div>
				<div className="col-md-9">
					<div className="row">
						<div className="col-md-10 pl-0">
							<div className="text-center text-md-left mt-2">
								<h4 className="d-inline font-weight-bold text-uppercase">{profile.name}</h4>
								<h5 className="text-muted">{profile.position}</h5>
							</div>
						</div>
						<div className="col-md-2 mt-2">
							{user.id === profile.user_ID ? <ProfileMenu /> : null}
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-3">
					{profile.twitter_URL ? (
						<a className="pr-2" href={profile.twitter_URL} target="#" aria-label="twitter">
							<i className="fab fa-twitter" />
						</a>
					) : null}
					{profile.linkedin_URL ? (
						<a className="px-2" href={profile.linkedin_URL} target="#" aria-label="linkedin">
							<i className="fab fa-linkedin" />
						</a>
					) : null}
					{profile.website_URL ? (
						<a
							className="pl-2"
							href={profile.website_URL}
							target="#"
							aria-label="user organisation website"
						>
							<i className="fas fa-globe" />
						</a>
					) : null}
				</div>
				<div className="col-md-9 pl-0">
					{profile.bio ? <p className="text-center text-md-left">{profile.bio}</p> : null}
					{profile.tags ? (
						<div className="text-center text-md-left pl-0">
							{profile.tags.map(tag => (
								<span
									className="badge badge-pill tag"
									key={Math.random()
										.toString(36)
										.substring(2, 7)}
								>
									{tag}
								</span>
							))}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default React.memo(ProfileHeader);
