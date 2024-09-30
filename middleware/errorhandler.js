const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors'); 


async function errorHandlingMiddleWare(req , res, err , next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message }); 
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong , please try again later !"); 
    }
    
}


module.exports = {
    errorHandlingMiddleWare
}