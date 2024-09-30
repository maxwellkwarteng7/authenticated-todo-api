require('dotenv').config();

const { Sequelize } = require('sequelize'); 

const sequelizeInstance = new Sequelize(process.env.DB_DATABASE,process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost'
}); 

module.exports = sequelizeInstance; 


