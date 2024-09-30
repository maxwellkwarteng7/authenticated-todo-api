const { StatusCodes } = require('http-status-codes');
const NotExist = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ msg: "Route does not Exist" }); 


module.exports = NotExist; 