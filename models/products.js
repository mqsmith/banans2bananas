module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    productName: DataTypes.STRING,
    upc: DataTypes.STRING,
    image: DataTypes.STRING
  });

  // Product.associate = function(models) {
  //   // Associating Products with Stores
  //   Product.belongsToMany(models.Store, {
  //     through: "Price",
  //     as: "products",
  //     foreignKey: "productId",
  //     otherKey: "storeId"
  //   });
  // };

  Product.seed = function() {
    console.log("called seed product");
    Product.create({
      productName: "bananas",
      upc: "0000000094011"
    });
    Product.create({
      productName: "toilet paper",
      upc: "0000000094015"
    });
  };

  return Product;
};
