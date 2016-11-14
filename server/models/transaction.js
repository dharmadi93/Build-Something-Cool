'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    faktur: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Transaction;
};