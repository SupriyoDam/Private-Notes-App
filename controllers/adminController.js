const {User, Note} = require("../model/index")


exports.listUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
        if (!users) return res.status(500).json({message: 'user not found!'});

        res.status(200).json({users: users}) 
    })
    .catch(err => {
        console.log('Users fetcing error' + err.message)
    })
}

exports.listNotes = (req, res, next) => {
    Note.findAll()
    .then(notes => {
        if (!notes) return res.status(500).json({message: 'user not found!'});

        res.status(200).json({Notes: notes}) 
    })
    .catch(err => {
        console.log('Notes fetcing error' + err.message)
    })
}