module.exports = function(sequelize, DataTypes) {
  var Price = sequelize.define("Price", {
    price: DataTypes.DECIMAL
  });

  Price.associate = function(models) {
    Price.belongsTo(models.Product);
    Price.belongsTo(models.Store);
  };

  return Price;
};
