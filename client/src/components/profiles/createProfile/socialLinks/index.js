import React, { Fragment } from 'react';
export default function CRProfileSocial({
	twitter_URL,
	setTwitter_URL,
	linkedin_URL,
	setLinkedin_URL
}) {
	return (
		<Fragment>
			<div className="input-group input-group-sm mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text" id="twitter_input">
						<i className="fab fa-twitter" />
					</span>
				</div>
				<input
					type="text"
					value={twitter_URL}
					onChange={e => setTwitter_URL(e.target.value)}
					className="form-control"
					placeholder="e.g. https://twitter.com/yourprofile"
					aria-describedby="twitter_input"
				/>
			</div>
			<div className="input-group input-group-sm mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text" id="linkedin_input">
						<i className="fab fa-linkedin-in" />
					</span>
				</div>
				<input
					type="text"
					value={linkedin_URL}
					onChange={e => setLinkedin_URL(e.target.value)}
					className="form-control"
					placeholder="e.g. https://www.linkedin.com/in/yourprofile"
					aria-describedby="linkedin_input"
				/>
			</div>
		</Fragment>
	);
}
