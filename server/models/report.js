'use strict';
module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define('Report', {
    TransactionId: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    base_price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Report;
};