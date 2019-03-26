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
					<form action="">
						<div className="form-row">
							<div className="col-8">
								<InputField
									type="text"
									placeholder="e.g. Frederic Von Brexit"
									name="name"
									labelText="Name"
									input_ID="inputUserName"
									value={name}
									onChange={this.onChange}
								/>
								<InputField
									type="text"
									placeholder="e.g. Policy Officer / Citizen"
									name="position"
									labelText="Position"
									input_ID="inputUserPosition"
									value={position}
									onChange={this.onChange}
								/>
							</div>
							<div className="col-4">
								<div className="row">
									<div className="col mt-2 pt-2">
										<button type="button" className="btn btn-outline-dark p-4">
											<i className="far fa-image mr-2" />
											<small>Add a profil picture</small>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col">
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
							</div>
							<div className="col">Organisation selection AREA</div>
						</div>
						<TextAreaField
							type="text"
							placeholder="Bio"
							name="bio"
							value={bio}
							onChange={this.onChange}
						/>
					</form>
				</div>
			</Fragment>
		);
	}
}
