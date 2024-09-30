
const BadRequestError = require('./badRequest');
const UnauthorizedError = require('./unauthenticated');
const NotFoundError = require('./notFound');
const CustomError = require('./customError'); 



module.exports = {
    BadRequestError,
    UnauthorizedError,
    NotFoundError, 
    CustomError
}