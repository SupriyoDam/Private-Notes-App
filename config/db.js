const fs = require('fs')
const {Sequelize} = require('sequelize')
require('dotenv').config(); //loads .env file data in process.env

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
              ca: fs.readFileSync('./cert/ca.pem'),
              rejectUnauthorized: true
            }
        }
    }
)

module.exports = sequelize