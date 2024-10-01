const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes'); 

const authenticator = (req, res, next) => {
    const { authorization } = req.headers;  
    if (!authorization || !authorization.startsWith('Bearer')) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid or no token provided' }); 
    }
    const token = authorization.split(' ')[1]; 
    console.log(token); 
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const { userId } = decoded; 
        req.userId = userId;  
        next(); 
    }
}


module.exports = authenticator; 