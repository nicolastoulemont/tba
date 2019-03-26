import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { InputField, TextAreaField } from '../../commons/InputComponents';
export default class CreateUserProfile extends Component {
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

	userCheck = props => {
		const currentUser = props.currentUser;
		const targetUser = props.match.params.id;
		if (currentUser !== targetUser) return false;
		return true;
	};

	render() {
		const correctUser = this.userCheck(this.props);
		const currentUser = this.props.currentUser;
		const { name, position, bio, twitter_URL, linkedin_URL } = this.state;
		if (!correctUser) return <Redirect to="/error" />;
		return (
			<Fragment key={currentUser}>
				<div className="mx-auto p-4">
					<h6 className="text-left">Create your profile</h6>
					<form action="" className="p-4">
						<InputField
							type="text"
							placeholder="e.g. Frederic Von Brexit"
							name="name"
							labelText="Name"
							value={name}
							onChange={this.onChange}
						/>
						<InputField
							type="text"
							placeholder="e.g. Policy Officer / Citizen"
							name="position"
							labelText="Position"
							value={position}
							onChange={this.onChange}
						/>
						<p className="text-left m-0 p-0">Profile picture</p>
						<div className="custom-file my-2">
							<input type="file" className="custom-file-input" id="profilePictureFile" />
							<label className="custom-file-label text-left" htmlFor="profilePictureFile">
								<small>Add a picture</small>
							</label>
						</div>
						<div>Organisation selection AREA</div>
						<TextAreaField
							type="text"
							placeholder="e.g. I'm an EU affairs professional in EU digital policies"
							name="bio"
							labelText="Bio"
							value={bio}
							onChange={this.onChange}
						/>
						<InputField
							type="text"
							placeholder="Twitter account url"
							name="twitter_URL"
							value={twitter_URL}
							onChange={this.onChange}
						/>
						<InputField
							type="text"
							placeholder="LinkedIn account url"
							name="linkedin_URL"
							value={linkedin_URL}
							onChange={this.onChange}
						/>
					</form>
				</div>
			</Fragment>
		);
	}
}
