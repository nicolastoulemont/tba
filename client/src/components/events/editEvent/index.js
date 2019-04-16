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
import { GET_EVENT, GET_USER_FUTURE_HOSTED_EVENTS } from '../../graphql/event/Queries';
import { SIGN_S3 } from '../../graphql/s3/Mutation';

const EditEvent = ({ match, history }) => {
	const [{ stateEvent }, dispatch] = useStateValue();
	const user = useContext(UserContext);

	const [name, setName] = useState(stateEvent.name);
	const [abstract, setAbstract] = useState(stateEvent.abstract);
	const [banner, setBanner] = useState(stateEvent.banner_URL);
	const [description, setDescription] = useState(stateEvent.description);
	const [isPublic, setIsPublic] = useState(stateEvent.isPublic);
	const [city, setCity] = useState(stateEvent.city);
	const [address, setAddress] = useState(stateEvent.address);
	const [start, setStart] = useState(new Date(stateEvent.start));
	const [end, setEnd] = useState(new Date(stateEvent.end));
	const [eventTags, setEventTags] = useState(stateEvent.tags);
	const [tagsGroup, setTagsGroup] = useState(
		tagsList.filter(tag => !stateEvent.tags.includes(tag))
	);

	if (stateEvent.user_ID === null || stateEvent.user_ID !== user.id)
		return <Redirect to={`/home/event/${match.params.id}`} />;

	const today = dayjs().format('YYYY-MM-DD');

	const addTag = tag => {
		setEventTags([...eventTags, tag]);
		setTagsGroup(tagsGroup.filter(item => item !== tag));
	};

	const deleteTag = tag => {
		setTagsGroup([...tagsGroup, tag]);
		setEventTags(eventTags.filter(item => item !== tag));
	};

	const uploadToS3 = async (banner, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': banner.type
			}
		};
		await axios.put(signedRequest, banner, options).catch(err => console.log(err));
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
		await updateEvent({
			variables: {
				_id: stateEvent.id,
				name,
				abstract,
				banner_URL: url,
				description,
				isPublic,
				city,
				address,
				start,
				end,
				tags: eventTags
			}
		});

		dispatch({ type: 'RESET_EVENT' });
		history.push(`/home/event/${match.params.id}`);
	};

	const updateEventWithOutNewBanner = async updateEvent => {
		await updateEvent({
			variables: {
				_id: stateEvent.id,
				name,
				abstract,
				banner_URL: banner,
				description,
				isPublic,
				city,
				address,
				start,
				end,
				tags: eventTags
			}
		});

		dispatch({ type: 'RESET_EVENT' });
		history.push(`/home/event/${match.params.id}`);
	};

	const editEvent = async (e, updateEvent, signS3) => {
		e.preventDefault();
		if (banner && typeof banner !== 'string') {
			await updateEventWithNewBanner(updateEvent, signS3);
		} else if (typeof banner !== 'object') {
			await updateEventWithOutNewBanner(updateEvent);
		}
	};

	return (
		<Mutation mutation={SIGN_S3}>
			{(signS3, e) => (
				<Mutation
					mutation={UPDATE_EVENT}
					refetchQueries={() => {
						return [
							{
								query: GET_USER_FUTURE_HOSTED_EVENTS,
								variables: { user_ID: user.id, date: today }
							},
							{ query: GET_EVENT, variables: { id: stateEvent.id } }
						];
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
												selected={new Date(start)}
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

								<div className="form-check float-left my-2">
									<input
										className="form-check-input"
										type="checkbox"
										id="isPublicCheckBox"
										name="isPublic"
										value={isPublic}
										checked={isPublic}
										onChange={e => setIsPublic(!isPublic)}
									/>
									<label className="form-check-label text-left" htmlFor="hideSocialcheckBox">
										Public event
										<small className="font-italic text-muted ml-2">
											&#40;Private events are not referenced and only accessible with a special URL
											to share with your selections of persons&#41;
										</small>
									</label>
								</div>
								<input type="submit" className="btn btn-darkblue btn-block my-4" />
							</div>
						</form>
					)}
				</Mutation>
			)}
		</Mutation>
	);
};

export default EditEvent;
