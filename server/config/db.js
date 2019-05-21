const mongoose = require('mongoose');

const connectDB = async () => {
	if (process.env.NODE_ENV === 'development') {
		try {
			await mongoose.connect(process.env.DEV_DB_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false
			});
			console.log('Dev DB Connected');
		} catch (err) {
			console.log(err.message);
			// Exit process with failure
			process.exit(1);
		}
	}
	if (process.env.NODE_ENV === 'production') {
		try {
			await mongoose.connect(process.env.PROD_DB_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useFindAndModify: false
			});
			console.log('Prod DB Connected');
		} catch (err) {
			console.log(err.message);
			// Exit process with failure
			process.exit(1);
		}
	}
};

module.exports = connectDB;
