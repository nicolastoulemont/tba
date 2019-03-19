import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import EventFeed from '../events/EventFeed';
import NewsFeed from '../news/NewsFeed';

class HomeFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newsDisplay: true
		};
	}

	eventDisplay = e => {
		this.setState({ newsDisplay: false });
	};
	newsDisplay = e => {
		this.setState({ newsDisplay: true });
	};

	render() {
		const { user, interestOne, interestTwo, interestThree } = this.props;
		const { newsDisplay } = this.state;
		return (
			<Fragment>
				<div className="row m-0 p-0">
					<div className="col border-right p-0 py-2">
						<Link to="#" onClick={this.newsDisplay} className="link-menu">
							<i className="d-inline far fa-paper-plane mr-2" />
							<h6 className="d-inline font-weight-bold text-uppercase">NEWS</h6>
						</Link>
					</div>
					<div className="col p-0 py-2">
						<Link to="#" onClick={this.eventDisplay} className="align-middle link-menu">
							<i className="d-inline far fa-calendar mr-2" />
							<h6 className="d-inline font-weight-bold text-uppercase">EVENTS</h6>
						</Link>
					</div>
				</div>
				<div className="row  m-0 p-0">
					<div className="mb-2 mt-2 w-100">
						{newsDisplay ? (
							<NewsFeed user={user} />
						) : (
							<EventFeed
								user={user}
								interestOne={interestOne}
								interestTwo={interestTwo}
								interestThree={interestThree}
							/>
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default HomeFeed;
