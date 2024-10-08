const wrapper = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const { User } = require('../models');
const { ValidationError } = require('sequelize');
const jwt = require('jsonwebtoken');



const register = wrapper(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError('All fields are mandatory');
    }
    try {
        const newUser = await User.create({
            username, password
        });
        res.status(StatusCodes.CREATED).json({ msg: "User created" });
    } catch (error) {
        if (error instanceof ValidationError) {
            const validationError = error.errors.map(error => error.message);
            // res.status(StatusCodes.BAD_REQUEST).json({error : validationError}) 
            res.status(StatusCodes.BAD_REQUEST).json({ msg: validationError });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "sorry something went wrong, try again later" });
    }


});

const login = wrapper(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'All fields are required' });
    }
    // find the user 
    const user = await User.findOne({ where: { username } });
    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No account with this username found" });
    }

    // check if the passwords match 
  
    const isMatch = user && (await user.validatePassword(password, user.password));
    console.log(isMatch);

    if (isMatch) {
        // sign a token with a payload 
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.status(StatusCodes.OK).json({ token: token });
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid credentials , please try again' });
    }
});




module.exports = {
    register,
    login
}