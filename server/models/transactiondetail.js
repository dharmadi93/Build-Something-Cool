'use strict';
module.exports = function(sequelize, DataTypes) {
  var TransactionDetail = sequelize.define('TransactionDetail', {
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
  return TransactionDetail;
};