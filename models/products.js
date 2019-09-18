module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    productName: DataTypes.STRING,
    upc: DataTypes.STRING,
    image: DataTypes.STRING
  });

  return Product;
};
