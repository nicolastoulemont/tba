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
						<div className="row p-4 mt-2 bg-white">
							<div className="px-4">
								<h4 className="text-left">
									About <span className="font-weight-bold text-blue">MyEU</span>
								</h4>
							</div>
						</div>
						<div className="row bg-white px-4 py-2">
							<div className="d-block px-4">
								<h5>
									Who <i class="fas fa-male ml-2 text-blue" />
								</h5>
								<p className="text-justify">
									I am Nicolas, founder of MyEU - I am passionate about European public affairs and
									tech and love to build tools to improve how we work and save time.
								</p>
							</div>
							<div className="d-block px-4">
								<h5>
									Why <i class="fas fa-lightbulb ml-2 text-blue" />
								</h5>
								<p className="text-justify">
									As a European public affairs professional I became increasingly frustrated with
									how repetitive and time-consuming monitoring is. I also knew that technology could
									enhance the monitoring experience. That why I built{' '}
									<span className="font-weight-bold text-blue">MyEU</span> - to help professionals
									and EU citizens to be easily informed of the latest developments in European
									public affairs and <span className="font-weight-bold text-blue">save time</span>.
								</p>
							</div>
							<div className="d-block px-4">
								<h5>
									How <i class="fas fa-cogs  ml-2 text-blue" />
								</h5>
								<p className="text-justify">
									MyEU monitor thousands of carefully selected institutional and stakeholders
									sources and use our algorithm to appropriately categorize information and events
									to{' '}
									<span className="font-weight-bold text-blue">
										transform hours worth of tedious monitoring into minutes of easily accessible
										informations
									</span>
									. Our monitoring and information processing is carried out{' '}
									<span className="font-weight-bold text-blue">in real time</span>, allowing you to
									access relevant informations at{' '}
									<span className="font-weight-bold text-blue">at your convenience</span>.
								</p>
								<p className="text-justify p-0 m-0">
									MyEU also allow you to{' '}
									<span className="font-weight-bold text-blue">publish your events</span> on our
									platform for you to :
								</p>
								<ul>
									<li>
										{' '}
										- <span className="font-weight-bold text-blue">Gain</span> more visibilty
									</li>
									<li>
										{' '}
										- <span className="font-weight-bold text-blue">Enjoy</span> a quick and easy
										registration process. Set up your profile{' '}
										<span className="font-weight-bold text-blue">once</span>, and register to any
										events in <span className="font-weight-bold text-blue">one click</span>.
									</li>
									<li>
										{' '}
										- <span className="font-weight-bold text-blue">Easily</span> manage your event
										registrations and Q&A without the burden of tracking your registrations. Just
										download the participants list{' '}
										<span className="font-weight-bold text-blue">at any time</span>.
									</li>
								</ul>
								<p className="text-justify p-0 m-0">Our principles :</p>
								<ul>
									<li>
										{' '}
										- <span className="font-weight-bold text-blue">Neutrality</span> : we do not
										select or filter any of the informations gathered.{' '}
									</li>
									<li>
										{' '}
										- <span className="font-weight-bold text-blue">Swiftness</span> : we give our
										best efforts to ensure that informations are aggretated on platform as soon as
										possible after their publication, keeping you as up to date as possible.
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
