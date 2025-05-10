const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Note = sequelize.define('Note',{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    // not required as we are now storing file key in diffferent table, as we now have multiple file in single notes.
    // filekey: { 
    //     type: DataTypes.TEXT,
    //     allowNull: true
    // }
})

module.exports = Note