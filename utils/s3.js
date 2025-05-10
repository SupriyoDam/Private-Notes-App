const {S3Client, GetObjectCommand, HeadObjectCommand , DeleteObjectCommand, DeleteObjectsCommand} = require('@aws-sdk/client-s3')
// 

const s3client = new S3Client({
    region: process.env.S3_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

module.exports = {s3client, GetObjectCommand, HeadObjectCommand, DeleteObjectCommand, DeleteObjectsCommand}