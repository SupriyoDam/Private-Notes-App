const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) 
		return res.status(401).json({ message: 'Token required.' });

	const token = authHeader.split(' ')[1]
	// console.log("token: ", token)
	const payload = jwt.verify(token, process.env.JWT_SECRET)
	if (payload) {
		req.user = payload;
		// console.log('JWT Payload: ',req.user)
		next();
	}
	else return res.status(401).json({ message: 'Invalid Token'});
}

module.exports = authenticateUser