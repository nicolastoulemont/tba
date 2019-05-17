import React from 'react';
import UserNav from '../navs/userNav';
import Footer from './Footer';

const About = () => {
	return (
		<div>
			<UserNav />
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="row mt-2 bg-white">
							<div className="col">
								<h3 className="text-muted brand">About MyEU</h3>
							</div>
							<div className="col" />
						</div>
            <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            </div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default About;
