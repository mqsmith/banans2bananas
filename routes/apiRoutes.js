//Requiring the models and setting them equal to a variable
var db = require("../models");
//Requiring seuelize to us it to query the database
var sequelize = require("sequelize");

//Exporting the API routes
module.exports = function(app) {
  // GET route that returns the lowest price to the user
  app.get("/api/products/:productName", function(req, res) {
    console.log(req.params.productName.toLowerCase());
    //Sequelize Query that uses the FindOne method to take the user input and get the product id
    db.Product.findOne({
      where: {
        productName: req.params.productName.toLowerCase()
      }
    }).then(function(dbProduct) {
      console.log(dbProduct.dataValues.id);
      console.log("Product ID: " + dbProduct.dataValues.id);
      //Takes the product id and sotres it in a variable to pass into the FindAll method below
      var storedProductId = dbProduct.dataValues.id;
      console.log(storedProductId);
      //Sequlize query that uses the variable from above to FindAll where the price is the minimum between all the stores, then returns Store ID and Price
      db.Price.findAll({
        attributes: ["StoreId", "Price"],
        where: {
          price: [
            //utilizing the literal sequelize method to pass in raw mySQL to find the min price in the price table of the specified product id
            sequelize.literal(
              "(SELECT MIN (price) FROM Prices where ProductId=" +
                storedProductId +
                ")"
            ),
            "price"
          ]
        }
      }).then(function(dbPrice) {
        console.log(dbPrice[0].dataValues.StoreId);
        //Takes the store id retured from the above query and uses the FineOne method to return the store name to the front end along with the price
        db.Store.findOne({
          where: {
            id: dbPrice[0].dataValues.StoreId
          }
        }).then(function(dbStore) {
          let minPrice = "Price: " + dbPrice[0].dataValues.Price;
          let productName = "Store: " + dbStore.dataValues.storeName;
          console.log(minPrice);
          console.log(productName);
          res.json(minPrice + " " + productName);
        });
        // console.log(dbProduct.dataValues.productName);
      });
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
    //Uses the FindOrCreate method to query the Product table, if it finds the product it doesn't duplicate it, if it doesn't exist it creates it
    db.Product.findOrCreate({
      where: {
        productName: req.body.productName.toLowerCase(),
        upc: req.body.upc
      }
    })
      .then(([dbProduct, created]) => {
        console.log(dbProduct);
        console.log("Created? ", created);
        //Uses the FindOrCreate method to query the Price table, if it finds the product at that store it doesn't duplicate it, if it doesn't exist it creates it
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
