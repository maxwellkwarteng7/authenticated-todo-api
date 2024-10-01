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
      User.hasMany(models.Todo, {
        foreignKey: 'userId',
        as: 'Tasks'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt); 
      }
    }
  });

  User.prototype.validatePassword = async (password , hash ) => {
    const isMatch = await bcrypt.compare(password, hash); 
    return isMatch; 
  }
  
  return User;
};