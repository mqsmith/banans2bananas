var db = require("../models");
var sequelize = require("sequelize");
module.exports = function(app) {
  // Get route for user view
  app.get("/api/price/1", function(req, res) {
    db.Price.findAll({
      attributes: ["StoreId", "Price"],
      where: {
        price: [
          sequelize.literal(
            "(SELECT MIN (price) FROM Prices where ProductId=1)"
          ),
          "price"
        ]
      }
    }).then(function(dbPrice) {
      res.json(dbPrice);
    });
  });

  app.post("/api/price", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Price.create({
      price: req.body.price,
      StoreId: req.body.storeId,
      ProductId: db.Product.id
    }).then(function(dbPrice) {
      // We have access to the new todo as an argument inside of the callback function
      console.log("Price Table Updated");
      res.json(dbPrice);
    });
  });

  // get route for manager view
  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // POST route for manager view
  app.post("/api/products", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Product.create({
      productName: req.body.productName,
      upc: req.body.upc
    }).then(function(dbProduct) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbProduct);
    });
  });
};
