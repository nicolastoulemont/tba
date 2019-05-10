import axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from 'react-router-dom';
import { formatFileName } from '../../commons/fileManagers';
import ImgHandler from '../../commons/ImgHandler';
import { InputField, TagsChooser, TextAreaField } from '../../commons/InputComponents';
import { tagsList } from '../../commons/TagsList';
import { UserContext } from '../../contexts';
import { useStateValue } from '../../contexts/InitialState';
import { UPDATE_EVENT } from '../../graphql/event/Mutations';
import {
	GET_EVENT,
	GET_USER_FUTURE_HOSTED_EVENTS,
	GET_USER_PAST_HOSTED_EVENTS
} from '../../graphql/event/Queries';
import { SIGN_S3 } from '../../graphql/s3/Mutation';
import { findErrorInErrorsArr, frontEndEventInputValidation } from '../../commons/ErrorsHandling';

const EditEvent = ({ match, history }) => {
	const [{ stateEvent }, dispatch] = useStateValue();
	const user = useContext(UserContext);

	const [name, setName] = useState(stateEvent.name);
	const [abstract, setAbstract] = useState(stateEvent.abstract);
	const [eventHost, setEventHost] = useState(stateEvent.eventHost);
	const [banner, setBanner] = useState(stateEvent.banner_URL);
	const [description, setDescription] = useState(stateEvent.description);
	const [isPublic, setIsPublic] = useState(stateEvent.isPublic);
	const [showComments, setShowComments] = useState(stateEvent.showComments);
	const [type, setType] = useState(stateEvent.type);
	const [price, setPrice] = useState(stateEvent.price);
	const [city, setCity] = useState(stateEvent.city);
	const [address, setAddress] = useState(stateEvent.address);
	const [start, setStart] = useState(new Date(stateEvent.start));
	const [end, setEnd] = useState(new Date(stateEvent.end));
	const [eventTags, setEventTags] = useState(stateEvent.tags);
	const [tagsGroup, setTagsGroup] = useState(
		tagsList.filter(tag => !stateEvent.tags.includes(tag))
	);

	const [errors, setErrors] = useState([]);

	if (stateEvent.user_ID === null || stateEvent.user_ID !== user.id)
		return <Redirect to={`/home/event/${match.params.id}`} />;

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
		if (e.target.name === 'eventhost') setEventHost(e.target.value);
		if (e.target.name === 'description') setDescription(e.target.value);
		if (e.target.name === 'city') setCity(e.target.value);
		if (e.target.name === 'address') setAddress(e.target.value);
	};

	const editEvent = async (e, updateEvent, signS3) => {
		e.preventDefault();
		const err = frontEndEventInputValidation(
			name,
			abstract,
			eventHost,
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
		if (banner && typeof banner !== 'string') {
			await updateEventWithNewBanner(updateEvent, signS3);
		} else if (typeof banner === 'string' || banner == null) {
			await updateEventWithOutNewBanner(updateEvent);
		}
	};

	const updateEventWithNewBanner = async (updateEvent, signS3) => {
		const response = await signS3({
			variables: {
				filename: formatFileName(banner.name),
				filetype: banner.type
			}
		});
		const { signedRequest, url } = response.data.signS3;
		await uploadToS3(banner, signedRequest);
		const res = await updateEvent({
			variables: {
				_id: stateEvent.id,
				name,
				abstract,
				eventHost,
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
		if (res.data.updateEvent.statusCode === 201) {
			dispatch({ type: 'RESET_EVENT' });
			history.push(`/home/event/${res.data.updateEvent.body.id}`);
		} else {
			setErrors(res.data.updateEvent.errors);
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

	const updateEventWithOutNewBanner = async updateEvent => {
		const res = await updateEvent({
			variables: {
				_id: stateEvent.id,
				name,
				abstract,
				eventHost,
				banner_URL: banner,
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
		if (res.data.updateEvent.statusCode === 201) {
			dispatch({ type: 'RESET_EVENT' });
			history.push(`/home/event/${res.data.updateEvent.body.id}`);
		} else {
			setErrors(res.data.updateEvent.errors);
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
					mutation={UPDATE_EVENT}
					refetchQueries={() => {
						return [refetchCorrectQuery(), { query: GET_EVENT, variables: { id: stateEvent.id } }];
					}}
				>
					{(updateEvent, e) => (
						<form onSubmit={async e => editEvent(e, updateEvent, signS3)} className="mb-4">
							<div className="p-0 m-0">
								<ImgHandler func={setBanner} picture={banner} x={760} y={380} placeholder="event" />
								<h4 className="text-left pt-4 px-4">Edit your Event</h4>
							</div>
							<div className="px-4 py-2">
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
								<InputField
									type="text"
									placeholder="The organisation hosting the event"
									name="eventhost"
									labelText="Event Host"
									value={eventHost}
									onChange={onChange}
									min={1}
									max={70}
									error={findErrorInErrorsArr(errors, 'eventhost')}
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

								<div className="form-row">
									<div className="col-md-6">
										<div className="text-left">
											<p className="p-0 m-0">Event Start</p>
											<DatePicker
												selected={new Date(start)}
												onChange={date => {
													if (errors) setErrors(errors.filter(error => error.path !== 'start'));
													setStart(dayjs(date).format('YYYY-MM-DDTHH:mm'));
												}}
												showTimeSelect
												timeFormat="HH:mm"
												timeIntervals={30}
												dateFormat="YYYY/MM/d HH:mm"
												timeCaption="time"
												className="form-control form-control-sm"
											/>
										</div>
										{findErrorInErrorsArr(errors, 'start') ? (
											<small className="d-block text-danger text-left">
												{findErrorInErrorsArr(errors, 'start').message}
											</small>
										) : null}
									</div>
									<div className="col-md-6">
										<div className="text-left">
											<p className="p-0 m-0">Event End</p>
											<DatePicker
												selected={new Date(end)}
												onChange={date => {
													if (errors) setErrors(errors.filter(error => error.path !== 'start'));
													setEnd(dayjs(date).format('YYYY-MM-DDTHH:mm'));
												}}
												showTimeSelect
												timeFormat="HH:mm"
												timeIntervals={30}
												dateFormat="YYYY/MM/d HH:mm"
												timeCaption="time"
												className="form-control form-control-sm"
											/>
											{findErrorInErrorsArr(errors, 'start') ? (
												<small className="d-block text-danger text-left">
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
									<label className="form-check-label text-left" htmlFor="isInstitutionalCheckBox">
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
											Private events are not referenced and only accessible with a special URL to
											share with your selection of people.
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
									<label className="form-check-label text-left" htmlFor="showCommentsCheckBox">
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
								<input type="submit" className="btn bg-blue text-white btn-block my-4" />
							</div>
						</form>
					)}
				</Mutation>
			)}
		</Mutation>
	);
};

export default EditEvent;
