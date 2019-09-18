module.exports = function(sequelize, DataTypes) {
  var Price = sequelize.define("Price", {
    price: DataTypes.DECIMAL
  });

  Price.associate = function(models) {
    Price.belongsTo(models.Product);
    Price.belongsTo(models.Store);
  };

  // Price.seed = function() {
  //   console.log("called seed price");
  //   Price.create({
  //     ProductId: 1,
  //     StoreId: 2,
  //     price: 1.99
  //   });
  //   Price.create({
  //     ProductId: 1,
  //     StoreId: 1,
  //     price: 2.5
  //   });
  // };

  return Price;
};
