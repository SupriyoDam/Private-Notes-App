const User = require('./user')
const Note = require('./Note')
const NoteFile = require('./NoteFile')


User.hasMany(Note, {foreignKey: 'userId'})
Note.belongsTo(User, {foreignKey: 'userId'})


Note.hasMany(NoteFile, {foreignKey: 'noteId', onDelete: 'CASCADE'})
NoteFile.belongsTo(Note, {foreignKey: 'noteId'})

module.exports = {Note, User, NoteFile}