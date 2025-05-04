const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const sequelize = require('./config/db')
const User = require('./model/user')
const authRouter = require('./routes/authRoute')
const adminRouter = require('./routes/adminRouter')

const app = express()
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.get('/', (req, res, next) => {
    res.send('Privae Note App is running...')
})

sequelize.sync()
.then(()=> {
    console.log('DB connected succesfully.')
})
.catch((err)=>{
    console.log('DB connection fail, with error message:\n'+ err)
})


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})