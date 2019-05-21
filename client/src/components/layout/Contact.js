import React, { useState } from 'react';
import DefaultNav from '../navs/DefaultNav';
import Footer from './Footer';
import { findErrorInErrorsArr } from '../commons/ErrorsHandling';
import { InputField, TextAreaField } from '../commons/InputComponents';

const Contact = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState([]);

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'message') setMessage(e.target.value);
		if (e.target.name === 'name') setName(e.target.value);
		if (e.target.name === 'subject') setSubject(e.target.value);
		if (e.target.name === 'email') setEmail(e.target.value.toLowerCase());
	};

	return (
		<div>
			<DefaultNav />
			<div className="container">
				<div className="row">
					<div className="col mt-2 bg-white">
						<div className="p-4">
							<h4 className="text-left">
								Contact <span className="font-weight-bold text-blue">Us</span>
							</h4>
							<form className="p-4">
								<div className="form-row">
									<div className="col">
										<InputField
											type="text"
											placeholder="Name"
											name="name"
											value={name}
											onChange={onChange}
											error={findErrorInErrorsArr(errors, 'name')}
										/>
									</div>
									<div className="col">
										<InputField
											type="text"
											placeholder="Email"
											name="email"
											value={email}
											onChange={onChange}
											error={findErrorInErrorsArr(errors, 'email')}
										/>
									</div>
								</div>
								<InputField
									type="text"
									placeholder="Subject"
									name="subject"
									value={subject}
									onChange={onChange}
									error={findErrorInErrorsArr(errors, 'subject')}
								/>
								<TextAreaField
									type="text"
									name="message"
									placeholder="Message"
									value={message}
									onChange={onChange}
									error={findErrorInErrorsArr(errors, 'message')}
									max={1000}
									rows={10}
								/>
								<input type="submit" className="btn bg-blue text-white btn-block mt-4 mb-2" />
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Contact;
