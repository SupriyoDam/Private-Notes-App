const User = require("../model/user")


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