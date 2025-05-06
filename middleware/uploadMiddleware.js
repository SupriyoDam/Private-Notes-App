const multers3 = require('multer-s3')
const {s3client} = require('../utils/s3')
const multer = require('multer')

const bucket = process.env.S3_BUCKET_NAME

const upload = multer({
    storage: multers3({
        s3: s3client,
        bucket: bucket,
        metadata: (req, file, cb) => {
            cb(null, {fieldname: file.filename})
        },
        key: (req, file, cb) => {
            const filename = `PrivateNote/${Date.now()}-`+file.originalname
            cb(null, filename)
        }
    })
})

module.exports = upload