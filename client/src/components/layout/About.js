import React from 'react';
import DefaultNav from '../navs/DefaultNav';
import Footer from './Footer';

const About = () => {
	return (
		<div>
			<DefaultNav />
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="row mt-2 bg-white">
							<h3 className="text-muted text-left brand">About MyEU</h3>
						</div>
						<div className="row bg-white">
							<div className="col" />
							<div className="col" />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default About;
