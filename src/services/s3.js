import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// key is the location of the file in the s3 bucket
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });


const bucketName = process.env.AWS_S3_BUCKET_NAME;
async function createPresignedPost( key, contentType ) {
    console.log('inside presignedpost');
    const command = new PutObjectCommand({ Bucket: bucketName, Key: key, ContentType: contentType, });
    const fileLink = `https://${bucketName}.s3.amazonaws.com/${key}`;
    const signedUrl = await getSignedUrl(s3, command, {expiresIn: 5 * 60 });
    const data = {signedRequest: signedUrl, url:fileLink};
    return data
};

export default createPresignedPost;