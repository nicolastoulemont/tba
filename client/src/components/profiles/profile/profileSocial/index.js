import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProfileEventsFeed from './eventsFeed';
import ProfileCommentsFeed from './commentsFeed';
import ProfileLikesFeed from './likesFeed';

export default class ProfileSocial extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eventsDisplay: true,
			newsDisplay: false,
			commentsDisplay: false,
			likesDisplay: false
		};
	}

	newsDisplay = e => {
		this.setState({
			eventsDisplay: false,
			newsDisplay: true,
			commentsDisplay: false,
			likesDisplay: false
		});
	};

	eventsDisplay = e => {
		this.setState({
			eventsDisplay: true,
			newsDisplay: false,
			commentsDisplay: false,
			likesDisplay: false
		});
	};

	commentsDisplay = e => {
		this.setState({
			eventsDisplay: false,
			newsDisplay: false,
			commentsDisplay: true,
			likesDisplay: false
		});
	};

	likesDisplay = e => {
		this.setState({
			eventsDisplay: false,
			newsDisplay: false,
			commentsDisplay: false,
			likesDisplay: true
		});
	};

	render() {
		const { user, name } = this.props;
		const { eventsDisplay, newsDisplay, commentsDisplay, likesDisplay } = this.state;

		return (
			<Fragment>
				<div className="py-2">
					<div className="row">
						<div className="col px-0">
							<Link to="#" onClick={this.eventsDisplay}>
								<i className="d-inline far fa-calendar mr-2" />
								<h6 className="d-none d-md-inline font-weight-bold text-uppercase">EVENTS</h6>
							</Link>
						</div>
						<div className="col px-0">
							<Link to="#" onClick={this.newsDisplay}>
								<i className="d-inline far fa-paper-plane mr-2" />
								<h6 className="d-none d-md-inline font-weight-bold text-uppercase">NEWS</h6>
							</Link>
						</div>
						<div className="col px-0">
							<Link to="#" onClick={this.commentsDisplay}>
								<i className="d-inline far fa-comment mr-2" />
								<h6 className="d-none d-md-inline font-weight-bold text-uppercase">COMMENTS</h6>
							</Link>
						</div>
						<div className="col px-0">
							<Link to="#" onClick={this.likesDisplay}>
								<i className="d-inline far fa-thumbs-up mr-2" />
								<h6 className="d-none d-md-inline font-weight-bold text-uppercase">LIKES</h6>
							</Link>
						</div>
					</div>
				</div>
				<div className="py-2">
					<div className="row">
						<div className="col pb-5">
							{eventsDisplay ? <ProfileEventsFeed user={user} /> : null}
							{newsDisplay ? <div>news</div> : null}
							{commentsDisplay ? <ProfileCommentsFeed user={user} name={name} /> : null}
							{likesDisplay ? <ProfileLikesFeed user={user} name={name} /> : null}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
