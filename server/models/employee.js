'use strict';

module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
      name: {
          type: DataTypes.STRING,
          validate: {
              notEmpty: true
          }
      },
      username: {
          type: DataTypes.STRING,
          validate: {
              notEmpty: true
          }
      },
      password: {
          type: DataTypes.STRING,
          validate: {
              notEmpty: true
          }
      },
      email: {
          type: DataTypes.STRING,
          validate: {
              notEmpty: true,
              isEmail: true
          }
      },
      photo_path: DataTypes.STRING,
      role: {
          type: DataTypes.STRING,
          validate: {
              notEmpty: true
          }
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          Employee.hasMany(models.Transaction)
      }
    }
  });

  return Employee;
};