'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
      name: DataTypes.STRING,
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
  return Item;
};