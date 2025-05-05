const User = require('./user')
const Note = require('./Note')


User.hasMany(Note, {foreignKey: 'userId'})
Note.belongsTo(User, {foreignKey: 'userId'})


module.exports = {Note, User}