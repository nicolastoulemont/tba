import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import DefaultAvatar from '../../img/default_avatar.svg';
import DefaultEvent from '../../img/default_event.svg';

const ImgHandler = ({ func, picture, x, y, placeholder, setErrors, errors, error }) => {
	const resizeImage = (file, x, y, func) => {
		if (file) {
			setErrors(errors.filter(error => error.path !== 'imgHandler'));
			const fileName = file.name;
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = event => {
				const img = new Image();
				img.src = event.target.result;
				img.onload = () => {
					const elem = document.createElement('canvas');
					const ctx = elem.getContext('2d');
					elem.width = x;
					elem.height = y;
					ctx.drawImage(img, 0, 0, x, y);
					ctx.canvas.toBlob(
						blob => {
							const file = new File([blob], fileName, {
								type: 'image/auto',
								lastModified: Date.now()
							});
							func(file);
						},
						'image/auto',
						0.6
					);
				};
				reader.onerror = error => console.log(error);
			};
		} else {
			setErrors([{ path: 'imgHandler', message: 'The file size must be under 2 MB' }]);
			return null;
		}
	};

	const placeholderAlternator = placeholder => {
		if (placeholder === 'avatar') {
			return (
				<Fragment>
					{!picture ? (
						<img
							src={DefaultAvatar}
							className="large-avatar rounded-circle profile-avatar"
							alt="Default avatar"
						/>
					) : typeof picture !== 'string' ? (
						<img
							src={URL.createObjectURL(picture)}
							className="large-avatar rounded-circle profile-avatar"
							alt="avatar"
						/>
					) : (
						<img
							src={picture}
							className="large-avatar rounded-circle profile-avatar"
							alt="avatar"
						/>
					)}
				</Fragment>
			);
		}
		if (placeholder === 'event') {
			return (
				<Fragment>
					{!picture ? (
						<img src={DefaultEvent} alt="Default Event banner" />
					) : typeof picture !== 'string' ? (
						<img src={URL.createObjectURL(picture)} alt="avatar" />
					) : (
						<img src={picture} alt="Event banner" />
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
				<section>
					<div {...getRootProps()} className="h-100">
						<div>
							{placeholderAlternator(placeholder)}
							{error ? <small className="text-danger">{error.message}</small> : null}
							<input {...getInputProps()} />
						</div>
					</div>
				</section>
			)}
		</Dropzone>
	);
};

export default ImgHandler;
