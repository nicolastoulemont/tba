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
