module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    productName: DataTypes.STRING,
    upc: DataTypes.STRING,
    image: DataTypes.STRING
  });

  Product.associate = function(models) {
    // Associating Products with Stores
    Product.belongsToMany(models.Store, {
      through: "Price",
      as: "products",
      foreignKey: "productId",
      otherKey: "storeId"
    });
  };

  return Product;
};
