const wrapper = require('express-async-handler'); 
const { StatusCodes } = require('http-status-codes'); 
const { BadRequestError } = require('../errors'); 
const User = require('../models'); 


const register = wrapper(async (req, res) => {
    const { username , password } = req.body; 
    if (!username || !password) {
        throw new BadRequestError('All fields are mandatory');
    }
    res.status(StatusCodes.CREATED).json({ msg: 'This is registered' }); 
}); 




module.exports = {
    register
}