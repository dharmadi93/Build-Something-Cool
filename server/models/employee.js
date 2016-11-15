'use strict';

module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    photo_path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Employee;
};