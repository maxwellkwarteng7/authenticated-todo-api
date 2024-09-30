const CustomError = require("../errors/customError")
const { StatusCodes } = require('http-status-codes');

const errorhandler = (req, res, err) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }

   return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal server error , try again later!" });
}


module.exports = errorhandler; 