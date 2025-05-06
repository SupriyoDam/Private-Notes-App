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
    filekey: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = Note