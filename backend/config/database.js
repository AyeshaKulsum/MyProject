const { Sequelize } = require('sequelize');

//DB Connection
module.exports = new Sequelize('myproject', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

