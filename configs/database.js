const Sequelize = require("sequelize");


module.exports = new Sequelize('b2b_db', 'root', 'Internet@922', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    //storage: 'path/to/database.sqlite'
});

