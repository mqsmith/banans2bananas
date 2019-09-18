var db = require("../models");
var sequelize = require("sequelize");
module.exports = function(app) {
  // Get route for user view
  app.get("/api/products/:productName", function(req, res) {
    console.log(req.params.productName);
    db.Product.findAll({
      where: {
        productName: req.params.productName
      }
    }).then(function(dbProduct) {
      console.log(dbProduct.dataValues.id);
      var storedProductId = 7;
      console.log("storedProductId:" + storedProductId);
      // db.Price.findAll({
      //   attributes: ["StoreId", "Price"],
      //   where: {
      //     price: [
      //       sequelize.literal(
      //         "(SELECT MIN (price) FROM Prices where ProductId=" +
      //           storedProductId +
      //           ")"
      //       ),
      //       "price"
      //     ]
      //   }
      // }).then(function(dbPrice) {
      //   console.log(dbPrice);
      // });
    });
  });

  // app.post("/api/price", function(req, res) {
  //   console.log(req.body);
  //   // create takes an argument of an object describing the item we want to
  //   // insert into our table. In this case we just we pass in an object with a text
  //   // and complete property (req.body)
  //   db.Price.create({
  //     price: req.body.price,
  //     StoreId: req.body.storeId
  //   }).then(function(dbPrice) {
  //     // We have access to the new todo as an argument inside of the callback function
  //     console.log("Price Table Updated");
  //     res.json(dbPrice);
  //   });
  // });

  // get route for manager view
  app.get("/api/products", function(req, res) {
    db.Product.findAll({}).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // POST route for manager view
  app.post("/api/products", function(req, res) {
    // db.Product.create({
    //   productName: req.body.productName,
    //   upc: req.body.upc
    // })
    db.Product.findOrCreate({
      where: {
        productName: req.body.productName,
        upc: req.body.upc
      }
    })
      .then(([dbProduct, created]) => {
        console.log(dbProduct);
        console.log("Created? ", created);
        // console.log("PRODUCTid: " + dbProduct.dataValues.id);
        // db.Price.findOrCreate({
        //   where: { ProductId: 157, StoreId: 1 },
        //   defaults: { ProductId: 157, price: req.body.price, StoreId: 1 }
        // });
        db.Price.findOrCreate({
          where: {
            ProductId: dbProduct.dataValues.id,
            StoreId: req.body.storeId,
            price: req.body.price
          }
        })
          .then(([dbPrice, created]) => {
            console.log(dbPrice);
            console.log("Created? ", created);
            res.json(dbPrice);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
