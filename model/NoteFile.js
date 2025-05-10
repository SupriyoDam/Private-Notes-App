const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const NoteFile = sequelize.define('NoteFile', {
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    noteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = NoteFile