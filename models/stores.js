module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define("Store", {
    storeName: DataTypes.STRING
  });

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
