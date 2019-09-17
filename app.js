require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var app = express();
const Sequelize = require("sequelize");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var db = require("./models");


var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");
 app.get('/', (req, res)=> res.send("INDEX"));

var dbsequelize = new Sequelize('b2b_db', 'root', 'Internet@922', {
    host: 'localhost',
    dialect: 'mysql' ,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    //storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

// const dbsequelize = new Sequelize("b2b_db", "root", "Internet@922", {
//     host: "localhost",
//     dialect: "mysql",
//     operatorsAliases: false,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// });

// dbsequelize.authenticate()
// .then(()=> console.log("Database conneted"))
// .catch(err=> console.log(err));
// Routes
//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

dbsequelize.authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

app.listen(PORT, console.log(`server listening on port ${(PORT)}`));
