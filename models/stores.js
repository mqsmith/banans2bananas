module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define("Store", {
    storeName: DataTypes.STRING
  });

  // Store.associate = function(models) {
  //   // Associating Products with Stores
  //   Store.belongsToMany(models.Product, {
  //     through: "Price",
  //     as: "stores",
  //     foreignKey: "storeId",
  //     otherKey: "productId"
  //   });
  // };

  Store.seed = function() {
    console.log("called seed store");
    Store.create({
      storeName: "Kroger"
    });
    Store.create({
      storeName: "Walmart"
    });
  };

  return Store;
};
