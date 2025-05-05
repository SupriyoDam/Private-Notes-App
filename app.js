const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const sequelize = require('./config/db')

const authRouter = require('./routes/authRoute')
const adminRouter = require('./routes/adminRouter')
const noteRouter = require('./routes/noteRouter');
const authenticateUser = require('./middleware/authMiddleware');

const app = express()
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/note',authenticateUser, noteRouter)
app.get('/', (req, res, next) => {
    res.send('Privae Note App is running...')
})


sequelize.sync({force:false})  // Do NOT use 'force: true' in production
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