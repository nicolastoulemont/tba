const { gql } = require('apollo-server');
const aws = require('aws-sdk');
module.exports = {
	s3Type: gql`
		type S3PayLoad {
			signedRequest: String!
			url: String!
		}

		extend type Mutation {
			signS3(filename: String!, filetype: String!): S3PayLoad!
		}
	`,
	s3Res: {
		Mutation: {
			signS3: async (parent, { filename, filetype }, { user }) => {
				if (!user) throw new Error('Error : You are not logged in');

				const s3Bucket = process.env.S3BUCKET;
				const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
				const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

				const s3 = new aws.S3({
					// secretAccessKey: AWS_SECRET_ACCESS_KEY,
					// accessKeyId: AWS_ACCESS_KEY_ID,
					signatureVersion: 'v4',
					region: 'eu-west-3'
				});

				const s3Params = {
					Bucket: s3Bucket,
					Key: filename,
					Expires: 60,
					ContentType: filetype,
					ACL: 'public-read'
				};

				const signedRequest = await s3.getSignedUrl('putObject', s3Params);
				const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

				return {
					signedRequest,
					url
				};
			}
		}
	}
};
