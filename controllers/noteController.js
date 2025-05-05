const{Note} = require("../model/index");

exports.postNoteCreate = (req, res, next) => {
    const {title, content} = req.body;
    const userId = req.user.userId
    const filepath = req.file ? req.file.location : "n/a";

    Note.create({title, content, userId, filepath})
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
            if(!note) return res.status(501).json({message: 'Note does not exist'});

            note.destroy()
                .then(data => {
                    res.status(201).json({message: 'Note deleted', data})
                })
                .catch(err => {
                    res.status(501).json({message: 'Note deletion failed.', error: err.message})
                })
        })
}