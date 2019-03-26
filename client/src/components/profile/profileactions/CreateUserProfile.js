import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import { InputField, TextAreaField, FileInput } from '../../commons/InputComponents';
export default class CreateUserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			position: '',
			bio: '',
			twitter_URL: '',
			linkedin_URL: '',
			pictureFile: '',
			hideSocial: false,
			privateProfile: false
		};
	}

	onChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	onCheck = e => {
		const { name } = e.target;
		if (name === 'privateProfile') {
			this.setState({ privateProfile: !this.state.privateProfile });
		}
		if (name === 'hideSocial') {
			this.setState({ hideSocial: !this.state.hideSocial });
		}
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
		const {
			name,
			position,
			bio,
			twitter_URL,
			linkedin_URL,
			pictureFile,
			hideSocial,
			privateProfile
		} = this.state;

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
						<FileInput
							type="file"
							placeholder="Add a picture"
							name="pictureFile"
							labelText="Profile picture"
							value={pictureFile}
							onChange={this.onChange}
						/>
						<div>Organisation selection AREA</div>
						<div className="form-row mt-2">
							<div className="col">
								<TextAreaField
									type="text"
									placeholder="e.g. I'm an EU affairs professional in EU digital policies"
									name="bio"
									labelText="Bio"
									value={bio}
									onChange={this.onChange}
									rows={6}
								/>
							</div>
							<div className="col">
								<p className="text-left m-0 p-0">Help people find you online</p>
								<InputField
									type="text"
									placeholder="e.g. https://twitter.com/NicoToulemont"
									name="twitter_URL"
									labelText="Twitter"
									value={twitter_URL}
									onChange={this.onChange}
								/>
								<InputField
									type="text"
									placeholder="e.g. https://www.linkedin.com/in/nicolas-toulemont-a1311083"
									labelText="LinkedIn"
									name="linkedin_URL"
									value={linkedin_URL}
									onChange={this.onChange}
								/>
							</div>
						</div>
						<div className="form-check float-left">
							<input
								className="form-check-input"
								type="checkbox"
								id="hideSocialcheckBox"
								name="hideSocial"
								value={hideSocial}
								checked={hideSocial}
								onChange={this.onCheck}
							/>
							<label className="form-check-label" htmlFor="hideSocialcheckBox">
								<small className="font-italic text-muted">
									Hide your social activities &#40; registrations, comments, likes &#41; from your
									profile page
								</small>
							</label>
						</div>
						<div className="form-check float-left mt-2 mb-4">
							<input
								className="form-check-input"
								type="checkbox"
								id="privateProfilecheckBox"
								value={privateProfile}
								name="privateProfile"
								checked={privateProfile}
								onChange={this.onCheck}
							/>
							<label className="form-check-label" htmlFor="privateProfilecheckBox">
								<small className="font-italic text-muted">
									Hide your profile from the profiles search feed{' '}
								</small>
							</label>
						</div>
						<input type="submit" className="btn btn-darkblue btn-block mt-4" />
					</form>
				</div>
			</Fragment>
		);
	}
}
