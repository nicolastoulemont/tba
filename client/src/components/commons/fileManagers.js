import dayjs from 'dayjs';

export const formatFileName = filename => {
	const date = dayjs().format('YYYYMMDDTHHMM');
	const randomString = Math.random()
		.toString(36)
		.substring(2, 15);
	const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
	const newFileName = `images/${date}-${randomString}-${cleanFileName}`;
	return newFileName.substring(0, 60);
};

export const resizeImage = (file, x, y, func) => {
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
