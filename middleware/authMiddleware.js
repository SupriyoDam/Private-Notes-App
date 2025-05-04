const jwt = require('jsonwebtoken')
// require('dotenv').config()

const authenticateUser = (req, res, next) => {
  const authHeader = req.header.authorization;
  if(!authHeader) return res.status(401).json({message: 'Token required.'});

  const token = authHeader.split(' ')[1]

  const payload = jwt.verify(token, process.env.JWT_SECRET)
  if (payload) {
    req.user = payload;
    next();
  }
  return res.status(401).json({message: 'Invalid Token'})
}

module.exports = authenticateUser