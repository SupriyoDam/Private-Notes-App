const {s3client, GetObjectCommand, HeadObjectCommand, DeleteObjectCommand, DeleteObjectsCommand}  = require("../utils/s3");
const { getSignedUrl }= require('@aws-sdk/s3-request-presigner')
const{Note, NoteFile} = require("../model");


exports.postNoteCreate = (req, res, next) => {
    const {title, content} = req.body;
    const userId = req.user.userId
    // const filekey = req.file ? req.file.key : null;
    

    Note.create({title, content, userId})
        .then(note => {
            
            const fileArray = req.files || []
            for (const file of fileArray){
                NoteFile.create({
                    noteId: note.id,
                    key: file.key
                })
            }

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

    //finds note 
    Note.findOne({where: {id: noteId, userId: userId}, include: NoteFile})
        .then(note => {
            if (!note) return res.status(404).json({ message: 'Note not found' });
            return Promise.all(note.NoteFiles.map(file => {
                 return getSignedUrl(s3client, new GetObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: file.key,
                    ResponseContentDisposition: 'inline'
                    })).then(signed=>{
                        console.log('|||||||||Fetched URL: ',signed,' |||||||||||||||')
                        return {
                            id: file.id,
                            key: file.key,
                            url: signed
                        }
                    })
            })).then(fileWithUrls => {
                res.json({
                    id: note.id,
                    title: note.title,
                    content: note.content,
                    files: fileWithUrls
                })
            })
        })
        .catch(err => {
            console.log('Note fetching issue')
            res.status(401).json({message: 'Note fetching issue', error: err.message})
        })

        // getSignedUrl(s3client, new GetObjectCommand({
        //     Bucket: process.env.S3_BUCKET_NAME,
        //     Key: key,
        //     ResponseContentDisposition: 'inline'
        //     }),
        //     {expiresIn: 600})
}


exports.putUpdateNote = (req, res, next) => {
    const userId = req.user.userId
    const noteId = req.params.noteId
    const { title, content } = req.body;
    
    Note.findOne({where: {userId: userId, id: noteId}, include: NoteFile})
        .then(note => {
            if (!note){
                return res.status(500).json({ message: 'Note not found'});
            }

            note.content = content
            note.title = title
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

    Note.findOne({where: {userId: userId, id: noteId}, include: NoteFile})
        .then(note => {
            if(!note) 
                return res.status(501).json({message: 'Note does not exist'});

            const fileKeys = note.NoteFiles.map(file => ({Key: file.key}))

            // console.log('filekeys: ', fileKeys)

            if(fileKeys.length > 0){
                const delCommand = new DeleteObjectsCommand(
                    {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Delete: {Objects: fileKeys}
                    }
                )
                return s3client.send(delCommand)
                    .then(()=> note.destroy())
                    .then(()=>{res.json({message: 'Note Deleetd with its associated files.'})})

            }
            else{ // when file is not attatched || filekey is null
                return note.destroy()
                    .then(data => {
                        res.status(201).json({message: 'Note deleted, no files were attatched.', data})
                    })
            }
        }).catch(err => {
            res.status(501).json({message: 'Note deletion failed.', error: err.message})
        })
}

// add controller for adding attatchment to the existing note
exports.addAttachmentToNote = (req, res, next)=>{
    const noteId = req.params.noteId
    const userId = req.user.userId

    //find the Note
    Note.findOne({where: {id: noteId, userId: userId}})
        .then(note => {
            // if note not fetched through query
            if(!note) return res.status(404).json({message: 'Note not found.'});

            // where no files selected for upload
            if(!req.files || req.files.length === 0) return res.status(400).json({message:'No files selected'});

            const fileRecords = req.files.map(file => ({
                Key: file.key,
                noteId: note.id
            }))

            return NoteFile.bulkCreate(fileRecords)
                .then(()=> res.status(201).json({message: 'Attatchment added successfully'}))

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Error addding attachments', error: err.message})
        })
}