const {Sequelize} = require('sequelize')
require('dotenv').config(); //loads .env file data in process.env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialact: 'mysql',
        logging: false
    }
)

module.exports = sequelize