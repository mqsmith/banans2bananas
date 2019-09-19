//Exporting the Product model
module.exports = function(sequelize, DataTypes) {
  //Creating the Product Model
  var Product = sequelize.define("Product", {
    productName: DataTypes.STRING,
    upc: DataTypes.STRING,
    image: DataTypes.STRING
  });

  return Product;
};
