import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CQuery from '../commons/CustomQueryComponent';
import { LOGGED_USER } from '../graphql/user/Queries';
import HomeFeed from './HomeFeed';
import SideBarUserProfile from '../profile/SideBarUserProfile';
import SideBarUserEvents from '../events/sideBarUserEvents/SideBarUserEvents';

const Home = () => {
	const userHasProfile = user => {
		return (
			<Fragment>
				<div className="mt-2 text-center">
					<div className="row">
						<main className="col-sm-12 col-lg-8 bg-white">
							<HomeFeed
								user={user.id}
								interestOne={user.profile.interestOne}
								interestTwo={user.profile.interestTwo}
								interestThree={user.profile.interestThree}
							/>
						</main>
						<div className="d-none d-lg-block col-lg-4 text-center">
							<SideBarUserProfile
								user={user.id}
								avatar={user.profile.picture_URL}
								name={user.profile.name}
							/>
							<div className="row">
								<SideBarUserEvents user={user.id} />
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	};

	const userHasNoProfile = user => {
		return (
			<Fragment>
				<div className="mt-2 text-center">
					<div className="row">
						<div className="col">
							<h6>You need a Profile to continue</h6>
							<p>
								<Link to={`/profile/create/${user.id}`}>Create your Profile</Link>
							</p>
						</div>
					</div>
				</div>
			</Fragment>
		);
	};

	return (
		<Fragment>
			<CQuery query={LOGGED_USER}>
				{({ data }) => {
					const user = data.currentUser;
					if (user.profile) return userHasProfile(user);
					if (!user.profile) return userHasNoProfile(user);
				}}
			</CQuery>
		</Fragment>
	);
};

export default Home;
