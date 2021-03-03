const Sequelize = require('sequelize');

const sequelize = new Sequelize('assg-3', 'root', 'mySQLpassword', {
    dialect: 'mysql', 
    host: 'localhost' 
});

module.exports = sequelize;