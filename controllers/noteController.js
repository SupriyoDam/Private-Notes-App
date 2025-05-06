const {s3client, GetObjectCommand, HeadObjectCommand, DeleteObjectCommand}  = require("../utils/s3");
const { getSignedUrl }= require('@aws-sdk/s3-request-presigner')
const{Note} = require("../model/index");

exports.postNoteCreate = (req, res, next) => {
    const {title, content} = req.body;
    const userId = req.user.userId
    const filekey = req.file ? req.file.key : null;

    Note.create({title, content, userId, filekey})
        .then(note => {
            res.status(201).json({ message: 'Note created', note });
        })
        .catch(err => {
            res.status(500).json({ message: 'Note creation failed', error: err.message });
        })
}


exports.getUserNote = (req, res, next) => {
    const userId = req.user.userId

    Note.findAll({where: {userId: userId}})
        .then(notes => {
            res.status(201).json(notes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Note fetching failed', error: err.message });
        })
}

exports.getNoteById = (req, res, next) => {
    const userId = req.user.userId
    const noteId = req.params.noteId

    Note.findOne({where: {id: noteId, userId: userId}})
        .then(note => {
            const key = note.filekey

            //fetching metadata
            const headCommand = new HeadObjectCommand({
                Bucket:process.env.S3_BUCKET_NAME,
                Key: key
            })

            s3client.send(headCommand)
            .then(data => {
                const cType = data.ContentType || 'application/octet-stream';
                getSignedUrl(s3client, new GetObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: key,
                    ResponseContentDisposition: 'inline',
                    ResponseContentType: cType
                    }),
                    {expiresIn: 600}
                )
                .then(url => {
                    res.status(202).json({note, signedUrl: url})
                })
                .catch(err => {
                    console.log(err)
                    res.status(401).json({message: 'Not Found'})
                }
                )
            })
        })
        .catch(err => {
            console.log('Note fetching issue')
            res.status(401).json({message: 'Note fetching issue'})
        })
}

exports.putUpdateNote = (req, res, next) => {
    const userId = req.user.userId
    const noteId = req.params.noteId
    const { title, content, filepath } = req.body;
    
    Note.findOne({where: {userId: userId, id: noteId}})
        .then(note => {
            if (!note){
                return res.status(500).json({ message: 'Note not found'});
            }

            note.content = content
            note.title = title
            note.filepath = filepath
            note.save()
                .then(note => {
                    res.status(201).json({message: 'Note updated successfully', note})
                })
                .catch(err => {
                    res.status(501).json({message: 'Update failed', error: err.message})
                })

        })
}


exports.deleteNote = (req, res, next) => {
    const userId = req.user.userId
    const noteId = req.params.noteId

    Note.findOne({where: {userId: userId, id: noteId}})
        .then(note => {
            if(!note) return res.status(501).json({message: 'Nots not exist'});

            if(note.filekey){
                const delCommand = new DeleteObjectCommand(
                    {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: note.filekey
                    }
                )
                s3client.send(delCommand).then(()=>{
                    note.destroy()
                    .then(data => {
                        res.status(201).json({message: 'Note deleted', data})
                    })
                    .catch(err => {
                        res.status(501).json({message: 'Note deletion failed.', error: err.message})
                    })
                    // res.status(301).json({message: 'File has been deleted.'});
                })
            }
            else{ // when file is not attatched || filekey is null
                note.destroy()
                    .then(data => {
                        res.status(201).json({message: 'Note deleted', data})
                    })
                    .catch(err => {
                        res.status(501).json({message: 'Note deletion failed.', error: err.message})
                    })
            }
        })
}