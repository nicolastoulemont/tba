import axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { Mutation } from 'react-apollo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Spring } from 'react-spring/renderprops';
import { formatFileName } from '../../commons/fileManagers';
import ImgHandler from '../../commons/ImgHandler';
import { InputField, TagsChooser, TextAreaField } from '../../commons/InputComponents';
import { tagsList } from '../../commons/TagsList';
import { UserContext } from '../../contexts';
import { CREATE_EVENT } from '../../graphql/event/Mutations';
import { GET_USER_FUTURE_HOSTED_EVENTS } from '../../graphql/event/Queries';
import { SIGN_S3 } from '../../graphql/s3/Mutation';

const CreateEvent = ({ history }) => {
	const user = useContext(UserContext);
	const today = dayjs().format('YYYY-MM-DD');

	const [name, setName] = useState('');
	const [abstract, setAbstract] = useState('');
	const [banner, setBanner] = useState(null);
	const [description, setDescription] = useState('');
	const [isPublic, setIsPublic] = useState(true);
	const [type, setType] = useState('');
	const [price, setPrice] = useState(0);
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [start, setStart] = useState(new Date());
	const [end, setEnd] = useState(new Date());
	const [eventTags, setEventTags] = useState([]);
	const [tagsGroup, setTagsGroup] = useState(tagsList);

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

	const uploadToS3 = async (banner, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': banner.type
			}
		};
		await axios.put(signedRequest, banner, options).catch(err => console.log(err));
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
				type,
				price: parseInt(price),
				city,
				address,
				start,
				end,
				tags: eventTags
			}
		});
		history.push(`/home/event/${res.data.addEvent.event.id}`);
	};

	const addEventWithOutBanner = async addEvent => {
		const res = await addEvent({
			variables: {
				user_ID: user.id,
				name,
				abstract,
				description,
				isPublic,
				type,
				price: parseInt(price),
				city,
				address,
				start,
				end,
				tags: eventTags
			}
		});
		history.push(`/home/event/${res.data.addEvent.event.id}`);
	};

	const createEvent = async (e, addEvent, signS3) => {
		e.preventDefault();
		if (banner) {
			await addEventWithBanner(addEvent, signS3);
		} else if (!banner) {
			await addEventWithOutBanner(addEvent);
		}
	};
	return (
		<Mutation mutation={SIGN_S3}>
			{(signS3, e) => (
				<Mutation
					mutation={CREATE_EVENT}
					refetchQueries={() => {
						return [
							{ query: GET_USER_FUTURE_HOSTED_EVENTS, variables: { user_ID: user.id, date: today } }
						];
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
										<div className="px-4 py-2">
											<InputField
												type="text"
												placeholder="e.g. EU Digital communications with europeans citizens in the next MFF"
												name="name"
												labelText="Event Name"
												value={name}
												onChange={e => setName(e.target.value)}
											/>
											<TextAreaField
												type="text"
												placeholder="A short abstract of your event"
												name="abstract"
												labelText="Abstract"
												value={abstract}
												onChange={e => setAbstract(e.target.value)}
											/>
											<TextAreaField
												type="text"
												placeholder="Describe your event"
												name="description"
												labelText="Description"
												value={description}
												rows={8}
												onChange={e => setDescription(e.target.value)}
											/>
											<div className="form-row">
												<div className="col-md-6">
													<InputField
														type="text"
														placeholder="e.g. Brussels"
														name="city"
														labelText="Event City"
														value={city}
														onChange={e => setCity(e.target.value)}
													/>
													<InputField
														type="text"
														placeholder="e.g. Rond-point Robert Schuman"
														name="address"
														labelText="Event Address"
														value={address}
														onChange={e => setAddress(e.target.value)}
													/>
												</div>
												<div className="col-md-6 text-left">
													<div className="mb-2">
														<p className="p-0 m-0">Event Start</p>
														<DatePicker
															selected={new Date(start)}
															onChange={date => setStart(dayjs(date).format('YYYY-MM-DDTHH:mm'))}
															showTimeSelect
															timeFormat="HH:mm"
															timeIntervals={30}
															dateFormat="YYYY/MM/d HH:mm"
															timeCaption="time"
															className="form-control form-control-sm"
														/>
													</div>
													<div className="mt-2 pt-2">
														<p className="p-0 m-0">Event End</p>
														<DatePicker
															selected={new Date(end)}
															onChange={date => setEnd(dayjs(date).format('YYYY-MM-DDTHH:mm'))}
															showTimeSelect
															timeFormat="HH:mm"
															timeIntervals={30}
															dateFormat="YYYY/MM/d HH:mm"
															timeCaption="time"
															className="form-control form-control-sm"
														/>
													</div>
												</div>
											</div>
										</div>

										<div className="px-4 py-2">
											<TagsChooser
												topicsPool={tagsGroup}
												addTopic={addTag}
												userTopics={eventTags}
												deleteTopic={deleteTag}
												main="Add tags to your event"
												secondary="It will make it easier to find for users"
											/>
											<InputField
												type="number"
												labelText="Price in €"
												value={price}
												onChange={e => setPrice(e.target.value)}
												min={0}
												max={10000}
											/>
											<div className="form-check float-left mt-2">
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
													<small className="font-italic text-muted ml-2">
														&#40;Private events are not referenced and only accessible with a
														special URL to share with your selection of people&#41;
													</small>
												</label>
											</div>
											<div className="form-check float-left mt-2 mb-4">
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
													<small className="font-italic text-muted ml-2">
														&#40;Institutionals Events are the ones organized by or hosted by the EU
														institutions&#41;
													</small>
												</label>
											</div>

											<input type="submit" className="btn btn-darkblue btn-block my-4" />
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

export default CreateEvent;
