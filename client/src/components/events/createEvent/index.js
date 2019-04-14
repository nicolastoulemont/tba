import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatFileName } from '../../commons/fileManagers';
import ImgHandler from '../../commons/ImgHandler';
import { InputField, TagsChooser, TextAreaField } from '../../commons/InputComponents';
import { tagsList } from '../../commons/TagsList';
import { UserContext } from '../../contexts';
import { CREATE_EVENT } from '../../graphql/event/Mutations';
import { SIGN_S3 } from '../../graphql/s3/Mutation';

const CreateEvent = () => {
	const user = useContext(UserContext);
	const [name, setName] = useState('');
	const [abstract, setAbstract] = useState('');
	const [banner, setBanner] = useState(null);
	const [description, setDescription] = useState('');
	const [isPublic, setIsPublic] = useState(true);
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

	const uploadToS3 = async (picture, signedRequest) => {
		const options = {
			headers: {
				'Content-Type': picture.type
			}
		};
		await axios.put(signedRequest, picture, options).catch(err => console.log(err));
	};

	const createEvent = async e => {
		e.preventDefault();
		if (banner) {
			const { data } = useMutation(SIGN_S3, {
				variables: {
					filename: formatFileName(banner.name),
					filetype: banner.type
				}
			});
			const { signedRequest, url } = data.signS3;
			await uploadToS3(banner, signedRequest);
			useMutation(CREATE_EVENT, {
				variables: {
					user_ID: user.id,
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
		} else if (!banner) {
			useMutation(CREATE_EVENT, {
				variables: {
					user_ID: user.id,
					name,
					abstract,
					description,
					isPublic,
					city,
					address,
					start,
					end,
					tags: eventTags
				}
			});
		}
	};

	return (
		<form onSubmit={async e => createEvent(e)} className="mb-4">
			<div className="p-0 m-0">
				<ImgHandler func={setBanner} picture={banner} x={760} y={380} placeholder="event" />
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
							<p className="p-0 m-0">Starting Date</p>
							<DatePicker
								onChange={date => setStart(date.toISOString().slice(0, 19))}
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={30}
								dateFormat="YYYY/MM/d HH:mm"
								timeCaption="time"
								placeholderText="Click to select a date"
								className="form-control form-control-sm"
							/>
						</div>
						<div className="mt-2 pt-2">
							<p className="p-0 m-0">Ending Date</p>
							<DatePicker
								onChange={date => setEnd(date.toISOString().slice(0, 19))}
								showTimeSelect
								timeFormat="HH:mm"
								timeIntervals={30}
								dateFormat="YYYY/MM/d HH:mm"
								timeCaption="time"
								placeholderText="Click to select a date"
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
							&#40;Private events are not referenced and only accessible with a special URL to share
							with your selections of persons&#41;
						</small>
					</label>
				</div>
				<input type="submit" className="btn btn-darkblue btn-block my-4" />
			</div>
		</form>
	);
};

export default CreateEvent;
