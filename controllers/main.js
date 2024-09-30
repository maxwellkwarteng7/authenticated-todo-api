const wrapper = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');



const register = wrapper(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError('All fields are mandatory');
    }
});




module.exports = {
    register
}