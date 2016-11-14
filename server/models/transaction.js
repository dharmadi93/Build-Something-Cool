'use strict';
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    faktur: DataTypes.STRING,
    EmployeeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Transaction.belongsTo(models.Employee)
      }
    }
  });
  return Transaction;
};