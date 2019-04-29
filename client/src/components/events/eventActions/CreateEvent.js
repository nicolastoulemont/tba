import axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Spring } from 'react-spring/renderprops';
import classNames from 'classnames';
import { formatFileName } from '../../commons/fileManagers';
import ImgHandler from '../../commons/ImgHandler';
import { InputField, TagsChooser, TextAreaField } from '../../commons/InputComponents';
import { tagsList } from '../../commons/TagsList';
import { UserContext } from '../../contexts';
import { CREATE_EVENT } from '../../graphql/event/Mutations';
import {
	GET_USER_FUTURE_HOSTED_EVENTS,
	GET_USER_PAST_HOSTED_EVENTS
} from '../../graphql/event/Queries';
import { SIGN_S3 } from '../../graphql/s3/Mutation';
import { findErrorInErrorsArr, frontEndEventInputValidation } from '../../commons/ErrorsHandling';

const CreateEvent = ({ history }) => {
	const user = useContext(UserContext);

	const [name, setName] = useState('');
	const [abstract, setAbstract] = useState('');
	const [banner, setBanner] = useState(null);
	const [description, setDescription] = useState('');
	const [isPublic, setIsPublic] = useState(true);
	const [showComments, setShowComments] = useState(true);
	const [type, setType] = useState('');
	const [price, setPrice] = useState(0);
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const [eventTags, setEventTags] = useState([]);
	const [tagsGroup, setTagsGroup] = useState(tagsList);

	const [errors, setErrors] = useState([]);

	const addTag = tag => {
		setEventTags([...eventTags, tag]);
		setTagsGroup(tagsGroup.filter(item => item !== tag));
	};

	const deleteTag = tag => {
		setTagsGroup([...tagsGroup, tag]);
		setEventTags(eventTags.filter(item => item !== tag));
	};

	const handleType = () => {
		if (type === '') setType('institutional');
		if (type === 'institutional') setType('');
	};

	const setTypeCheckBox = () => {
		if (type === '') return false;
		if (type === 'institutional') return true;
	};

	const onChange = e => {
		if (errors) setErrors(errors.filter(error => error.path !== e.target.name));
		if (e.target.name === 'name') setName(e.target.value);
		if (e.target.name === 'abstract') setAbstract(e.target.value);
		if (e.target.name === 'description') setDescription(e.target.value);
		if (e.target.name === 'city') setCity(e.target.value);
		if (e.target.name === 'address') setAddress(e.target.value);
	};

	const createEvent = async (e, addEvent, signS3) => {
		e.preventDefault();
		const err = frontEndEventInputValidation(
			name,
			abstract,
			description,
			city,
			address,
			start,
			end
		);
		if (typeof price === 'string') setPrice(0);
		if (err.length !== 0) {
			setErrors(err);
			return null;
		}
		if (banner) {
			await addEventWithBanner(addEvent, signS3);
		} else if (!banner) {
			await addEventWithOutBanner(addEvent);
		}
	};

	const addEventWithBanner = async (addEvent, signS3) => {
		const response = await signS3({
			variables: {
				filename: formatFileName(banner.name),
				filetype: banner.type
			}
		});
		const { signedRequest, url } = response.data.signS3;
		await uploadToS3(banner, signedRequest);
		const res = await addEvent({
			variables: {
				user_ID: user.id,
				name,
				abstract,
				banner_URL: url,
				description,
				isPublic,
				showComments,
				type,
				price: parseInt(price),
				city,
				address,
				start,
				end,
				tags: eventTags
			}
		});
		if (res.data.addEvent.statusCode === 201) {
			history.push(`/home/event/${res.data.addEvent.body.id}`);
		} else {
			setErrors(res.data.addEvent.errors);
			return null;
		}
	};

	const uploadToS3 = async (banner, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': banner.type
			}
		};
		await axios.put(signedRequest, banner, options).catch(err => console.log(err));
	};

	const addEventWithOutBanner = async addEvent => {
		const res = await addEvent({
			variables: {
				user_ID: user.id,
				name,
				abstract,
				description,
				isPublic,
				showComments,
				type,
				price: parseInt(price),
				city,
				address,
				start,
				end,
				tags: eventTags
			}
		});
		if (res.data.addEvent.statusCode === 201) {
			history.push(`/home/event/${res.data.addEvent.body.id}`);
		} else {
			setErrors(res.data.addEvent.errors);
			return null;
		}
	};

	const refetchCorrectQuery = () => {
		const today = new Date().toISOString().slice(0, 10);
		if (dayjs(start).isBefore(dayjs(today))) {
			return { query: GET_USER_PAST_HOSTED_EVENTS, variables: { user_ID: user.id, date: today } };
		} else if (dayjs(start).isAfter(dayjs(today))) {
			return { query: GET_USER_FUTURE_HOSTED_EVENTS, variables: { user_ID: user.id, date: today } };
		}
	};

	return (
		<Mutation mutation={SIGN_S3}>
			{(signS3, e) => (
				<Mutation
					mutation={CREATE_EVENT}
					refetchQueries={() => {
						return [refetchCorrectQuery()];
					}}
				>
					{(addEvent, e) => (
						<Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ delay: 300 }}>
							{props => (
								<div style={props}>
									<form onSubmit={async e => createEvent(e, addEvent, signS3)} className="mb-4">
										<div className="p-0 m-0">
											<ImgHandler
												func={setBanner}
												picture={banner}
												x={760}
												y={380}
												placeholder="event"
											/>
											<h4 className="text-left pt-4 px-4">Create an Event</h4>
										</div>
										<div className="px-4 py-2 text-left">
											<InputField
												type="text"
												placeholder="e.g. EU Digital communications with europeans citizens in the next MFF"
												name="name"
												labelText="Event Name"
												value={name}
												onChange={onChange}
												min={5}
												max={140}
												error={findErrorInErrorsArr(errors, 'name')}
											/>
											<TextAreaField
												type="text"
												placeholder="A short abstract of your event"
												name="abstract"
												labelText="Abstract"
												value={abstract}
												onChange={onChange}
												min={5}
												max={280}
												error={findErrorInErrorsArr(errors, 'abstract')}
											/>
											<TextAreaField
												type="text"
												placeholder="Describe your event"
												name="description"
												labelText="Description"
												value={description}
												rows={8}
												onChange={onChange}
												min={5}
												max={2000}
												error={findErrorInErrorsArr(errors, 'description')}
											/>
											<div className="form-row">
												<div className="col-md-6">
													<InputField
														type="text"
														placeholder="e.g. Brussels"
														name="city"
														labelText="Event City"
														value={city}
														onChange={onChange}
														min={1}
														max={30}
														error={findErrorInErrorsArr(errors, 'city')}
													/>
													<InputField
														type="text"
														placeholder="e.g. Rond-point Robert Schuman"
														name="address"
														labelText="Event Address"
														value={address}
														onChange={onChange}
														min={5}
														max={70}
														error={findErrorInErrorsArr(errors, 'address')}
													/>
												</div>
												<div className="col-md-6 text-left">
													<div className="mb-2">
														<p className="p-0 m-0">Event Start</p>
														<DatePicker
															selected={new Date(start)}
															onChange={date => {
																if (errors)
																	setErrors(errors.filter(error => error.path !== 'start'));
																setStart(dayjs(date).format('YYYY-MM-DDTHH:mm'));
															}}
															showTimeSelect
															timeFormat="HH:mm"
															timeIntervals={30}
															dateFormat="YYYY/MM/d HH:mm"
															timeCaption="time"
															className={classNames('form-control form-control-sm', {
																'is-invalid': findErrorInErrorsArr(errors, 'start')
															})}
														/>
														{findErrorInErrorsArr(errors, 'start') ? (
															<small className="d-block text-danger">
																{findErrorInErrorsArr(errors, 'start').message}
															</small>
														) : null}
													</div>
													<div className="mt-2 pt-2">
														<p className="p-0 m-0">Event End</p>
														<DatePicker
															selected={new Date(end)}
															onChange={date => {
																if (errors)
																	setErrors(errors.filter(error => error.path !== 'start'));
																setEnd(dayjs(date).format('YYYY-MM-DDTHH:mm'));
															}}
															showTimeSelect
															timeFormat="HH:mm"
															timeIntervals={30}
															dateFormat="YYYY/MM/d HH:mm"
															timeCaption="time"
															className={classNames('form-control form-control-sm', {
																'is-invalid': findErrorInErrorsArr(errors, 'start')
															})}
														/>
														{findErrorInErrorsArr(errors, 'start') ? (
															<small className="d-block text-danger">
																{findErrorInErrorsArr(errors, 'start').message}
															</small>
														) : null}
													</div>
												</div>
											</div>
										</div>

										<div className="px-4 pb-2">
											<InputField
												type="number"
												labelText="Price in €"
												value={price}
												onChange={e => setPrice(e.target.value)}
												min={0}
												max={10000}
											/>

											<div className="form-check text-left">
												<input
													className="form-check-input"
													type="checkbox"
													id="isInstitutionalCheckBox"
													name="institutional"
													value={setTypeCheckBox(type)}
													checked={setTypeCheckBox(type)}
													onChange={e => handleType(e)}
												/>
												<label
													className="form-check-label text-left"
													htmlFor="isInstitutionalCheckBox"
												>
													Institutional Event
													<small className="font-italic text-muted d-block">
														Institutionals Events are the ones organized by or hosted by the EU
														institutions.
													</small>
												</label>
											</div>

											<div className="form-check text-left">
												<input
													className="form-check-input"
													type="checkbox"
													id="isPublicCheckBox"
													name="isPublic"
													value={isPublic}
													checked={isPublic}
													onChange={e => setIsPublic(!isPublic)}
												/>
												<label className="form-check-label text-left" htmlFor="isPublicCheckBox">
													Public event
													<small className="font-italic text-muted d-block">
														Private events are not referenced and only accessible with a special URL
														to share with your selection of people.
													</small>
												</label>
											</div>

											<div className="form-check text-left">
												<input
													className="form-check-input"
													type="checkbox"
													id="showCommentsCheckBox"
													name="showComments"
													value={showComments}
													checked={showComments}
													onChange={e => setShowComments(!showComments)}
												/>
												<label
													className="form-check-label text-left"
													htmlFor="showCommentsCheckBox"
												>
													Allow comments
												</label>
											</div>

											<TagsChooser
												topicsPool={tagsGroup}
												addTopic={addTag}
												userTopics={eventTags}
												deleteTopic={deleteTag}
												main="Tag your event"
												secondary="It will make it easier to find by users and increase participation"
											/>

											<input type="submit" className="btn btn-blue btn-block my-4" />
										</div>
									</form>
								</div>
							)}
						</Spring>
					)}
				</Mutation>
			)}
		</Mutation>
	);
};

export default React.memo(CreateEvent);
