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
							<div className="col">
								<InputField
									type="text"
									placeholder="Name"
									name="name"
									value={name}
									onChange={this.onChange}
								/>
								<InputField
									type="text"
									placeholder="Position"
									name="position"
									value={position}
									onChange={this.onChange}
								/>
							</div>
							<div className="col">
								<h6>Picture DROP AREA</h6>
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
