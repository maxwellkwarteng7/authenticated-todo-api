const CustomError = require("./customError");

class UnauthorizedError extends CustomError {
    constructor() {
        super(message); 
        this.statusCode = 401; 
    }
}


module.exports = UnauthorizedError ; 