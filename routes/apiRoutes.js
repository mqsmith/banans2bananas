var db = require("../models");

module.exports = function(app) {
  // Get route for user view
  app.get("/api/price/:productId", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
    db.Product.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Product]
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // get route for manager view
  app.get("/api/products", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
    res.json([
      {
        id: 1,
        productName: "banana",
        upc: "0000000094011",
        image:
          "https://www.kroger.com/product/images/medium/front/0000000094011"
      },
      {
        id: 2,
        productName: "apple",
        upc: "0000000094012",
        image: "https://fillmurray.com/200/300"
      },
      {
        id: 3,
        productName: "pear",
        upc: "0000000094013",
        image: "https://fillmurray.com/200/400"
      },
      {
        id: 4,
        productName: "coconut",
        upc: "0000000094014",
        image: "https://fillmurray.com/200/500"
      }
    ]);
  });

  // POST route for manager view
  app.post("/api/products", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Product.create({
      productName: req.body.productName,
      upc: req.body.upc,
      price: req.body.price
    }).then(function(dbProduct) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbProduct);
    });
  });
};
