'use strict';
const bcrypt = require('bcrypt'); 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING, 
        unique: true, 
        validate: {
          notEmpty: true, 
        }
      }, 
      password: {
        type: DataTypes.STRING, 
        validate: {
          notEmpty : true 
        }
      }
    }, 
   {
    sequelize,
     modelName: 'User',
    
     hooks: {
      //  before the user is saved hash the password 
       beforeCreate: async (user ) => {
         const salt = bcrypt.genSalt(10); 
         user.password = bcrypt.hash(user.password, salt); 
       }, 
       //  if there's a change in the password or password is update hash the new one 
       beforeUpdate: async (user) => {
         if (user.changed('password')) {
         const salt = bcrypt.genSalt(10); 
           user.password = bcrypt.hash(user.password, salt); 
         }
       }
     }
    });
  
  // adding a protype method to check if password is valid 
  User.prototype.validataPassword =  async(password) => {
    return bcrypt.compare(password, this.password); 
  }
  return User;
};