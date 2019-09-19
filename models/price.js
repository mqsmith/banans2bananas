//Exporting the Price model
module.exports = function(sequelize, DataTypes) {
  //Creating the Price Model
  var Price = sequelize.define("Price", {
    price: DataTypes.DECIMAL(10, 2)
  });
  //Creating the Price Model Associations
  Price.associate = function(models) {
    Price.belongsTo(models.Product);
    Price.belongsTo(models.Store);
  };

  return Price;
};
