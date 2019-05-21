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
							<h4 className="text-left brand">
								About <span className="font-weight-bold text-blue">MyEU</span>
							</h4>
						</div>
						<div className="row bg-white px-4 py-2">
							<h5>
								Who <i class="fas fa-male ml-2 text-blue" />
							</h5>
							<p className="text-justify">
								We are David and Dan, founders of EU Insider - we have years of lobbying and tech
								experience and love to build new things to help us work better. We started writing a
								weekly health policy newsletter in 2015 which quickly became very successful and
								proved to us that there is a strong demand for well crafted, curated policy news
								reports.
							</p>

							<h5>
								Why <i class="fas fa-lightbulb ml-2 text-blue" />
							</h5>
							<p className="text-justify">
								As policy consultants we became increasingly frustrated with monitoring. It’s an
								essential part of our work but it’s also very dull and time-consuming. We also feel
								that the sector needs a shake-up and embrace new technology. That’s why we built EU
								Insider - to help policy professionals like us to save time and ensure they are
								up-to-date with the latest developments in their sector.
							</p>
							<div className="d-block">
								<h5>
									How <i class="fas fa-cogs  ml-2 text-blue" />
								</h5>
								<ul>
									<li>
										{' '}
										- <span className="font-weight-bold text-blue">Neutrality</span> : we make no
										selection or filtering to any of the events and information gathered.{' '}
									</li>
									<li>
										- <span className="font-weight-bold text-blue">Completeness</span> : we strive
										for ensuring the widest range of events relevant to our mission.{' '}
									</li>
									<li>
										{' '}
										- <span className="font-weight-bold text-blue">Timeliness</span> : we apply our
										best efforts to upload and promote the events with a reasonable advance.
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default About;
