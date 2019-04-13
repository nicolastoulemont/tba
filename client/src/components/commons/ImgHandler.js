import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import DefaultAvatar from '../../img/default_avatar.svg';
import DefaultEvent from '../../img/default_event.svg';

const ImgHandler = ({ func, picture, x, y, placeholder }) => {
	const resizeImage = (file, x, y, func) => {
		const width = x;
		const height = y;
		const fileName = file.name;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = event => {
			const img = new Image();
			img.src = event.target.result;
			img.onload = () => {
				const elem = document.createElement('canvas');
				elem.width = width;
				elem.height = height;
				const ctx = elem.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);
				ctx.canvas.toBlob(
					blob => {
						const file = new File([blob], fileName, {
							type: 'image/jpeg',
							lastModified: Date.now()
						});
						func(file);
					},
					'image/jpeg',
					1
				);
			};
			reader.onerror = error => console.log(error);
		};
	};

	const placeholderAlternator = placeholder => {
		if (placeholder === 'avatar') {
			return (
				<Fragment>
					{!picture ? (
						<img
							src={DefaultAvatar}
							className="extra-large-avatar rounded-circle"
							alt="Default avatar"
						/>
					) : typeof picture !== 'string' ? (
						<img
							src={URL.createObjectURL(picture)}
							className="extra-large-avatar rounded-circle"
							alt="avatar"
						/>
					) : (
						<img src={picture} className="extra-large-avatar rounded-circle" alt="avatar" />
					)}
				</Fragment>
			);
		}
		if (placeholder === 'event') {
			return (
				<Fragment>
					{!picture ? (
						<img src={DefaultEvent} className="event-banner" alt="Default Event banner" />
					) : typeof picture !== 'string' ? (
						<img src={URL.createObjectURL(picture)} className="event-banner" alt="avatar" />
					) : (
						<img src={picture} className="event-banner" alt="Event banner" />
					)}
				</Fragment>
			);
		}
		return null;
	};

	return (
		<Dropzone
			accept={'image/*'}
			multiple={false}
			maxSize={2097152}
			onDrop={acceptedFiles => resizeImage(acceptedFiles[0], x, y, func)}
		>
			{({ getRootProps, getInputProps }) => (
				<section className="mt-2">
					<div {...getRootProps()} className="h-100">
						<div>
							{placeholderAlternator(placeholder)}
							<input {...getInputProps()} />
						</div>
					</div>
				</section>
			)}
		</Dropzone>
	);
};

export default ImgHandler;
