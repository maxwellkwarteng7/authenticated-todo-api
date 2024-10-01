'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'userTasks'
      }); 
    }
  }
  Todo.init({
    todo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
    freezeTableName : true 
  });
  return Todo;
};