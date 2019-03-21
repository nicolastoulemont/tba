import React, { Fragment, Component } from 'react';
import CQuery from '../../commons/CustomQueryComponent';

import { LOGGED_USER } from '../../graphql/user/Queries';

class CreateUserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			position: '',
			bio: '',
			twitter_URL: '',
			linkedin_URL: ''
		};
	}

	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		const targetUser = this.props.match.params.id;
		return (
			<Fragment>
				<CQuery query={LOGGED_USER}>
					{({ data }) => {
						const loggedInUser = data.currentUser;
						return (
							<Fragment key={loggedInUser.id}>
								<div className="mt-2 text-center">
									<div className="row justify-content-center">
										<main className="col-12 bg-white px-0">Create User Profile</main>
									</div>
								</div>
							</Fragment>
						);
					}}
				</CQuery>
			</Fragment>
		);
	}
}

// const CreateUserProfile = ({ match }) => {
//   const user = match.params.id;
//   return (
//     <Fragment>
//       <CQuery query={LOGGED_USER}>
//         {({ data }) => {
//           const loggedInUser = data.currentUser;
//           return (
//             <Fragment key={loggedInUser.id}>
//               <div className="mt-2 text-center">
//                 <div className="row justify-content-center">
//                   <main className="col-sm-12 col-lg-8 bg-white px-0">
//                     <CQuery
//                       query={GET_USER_FULL_PROFILE}
//                       variables={{ id: user }}
//                     >
//                       {({ data: { user } }) => {
//                         const profile = user.profile;
//                         return (
//                           <Fragment key={profile.id}>
//                             <ProfileHeader
//                               user_ID={user.id}
//                               loggedInUser={loggedInUser.id}
//                               profile_ID={profile.id}
//                               avatar={user.avatar}
//                               name={profile.name}
//                               position={profile.position}
//                               organisation={profile.organisation}
//                               interestOne={profile.interestOne}
//                               interestTwo={profile.interestTwo}
//                               interestThree={profile.interestThree}
//                               bio={profile.bio}
//                               twitter_URL={profile.twitter_URL}
//                               linkedin_URL={profile.linkedin_URL}
//                             />
//                             <ProfileSocial user={user.id} name={profile.name} />
//                           </Fragment>
//                         );
//                       }}
//                     </CQuery>
//                   </main>
//                   <div className="d-none d-lg-block col-lg-4 text-center">
//                     <SideBarUserProfile
//                       avatar={loggedInUser.avatar}
//                       name={loggedInUser.profile.name}
//                       user={loggedInUser.id}
//                     />
//                     <div className="row">
//                       <SideBarUserEvents user={loggedInUser.id} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Fragment>
//           );
//         }}
//       </CQuery>
//     </Fragment>
//   );
// };

export default CreateUserProfile;
