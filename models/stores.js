//Exporting the Store model
module.exports = function(sequelize, DataTypes) {
  //Creating the Stores Model
  var Store = sequelize.define("Store", {
    storeName: DataTypes.STRING
  });

  //Seeding the Stores Model
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
