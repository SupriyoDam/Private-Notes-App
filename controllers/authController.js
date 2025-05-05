const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const {User} = require("../model/index")



exports.postRegisterUser = (req, res, next) => {
    const { username, email, password } = req.body
    console.log('📥 Incoming registration:', { username, email })

    User.findOne({where: {email}})
        .then(existing => {
            if(existing) 
                {console.log('⚠️ Email already exists:', email)
                return res.status(400).json({message: 'Email is already in use. Try another one.'});}

            return bcrypt.hash(password, 10)
             .then(hashed_pass => {
                console.log('🔐 Password hashed successfully');
                User.create({username, email, password: hashed_pass})
                .then(user => {
                    console.log('✅ User creation result.\nID: ', user.id);
                    if (!user) {
                        console.log('❌ User creation returned undefined');
                        return res.status(500).json({message: 'user creation failed!'})
                    }
                    res.status(201).json({message: 'User registered', UserID: user.id})
                 })
             })
        })
        .catch(err => {
            console.error('🔥 Error during registration:', err);
            res.status(500).json({message: 'Registration Failed!', Error: err})
        })
}

exports.postLoginUser = (req ,res, next) => {
    const { email, password } = req.body
    console.log('📥 Incoming login:', { email })

    User.findOne({where: {email}})
        .then(user => {
            
            if(!user) {
                console.log('⚠️ Email does not exists:', email)
                return res.status(400).json({message: 'User does not exist.'});}

            return bcrypt.compare(password, user.password)
                .then(match => {
                    if(!match) return res.status(400).json({message: 'Invalid credentials'});

                    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})
                    res.json({message: 'Login Successfull.', token})
                })
        })
        .catch(err => {
            console.log('Error: ' , err)
            res.status(500).json({ message: 'Login failed', error: err.message});
          });
}