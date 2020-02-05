const Sequelize = require('sequelize');
const connection = new Sequelize('giaperguntas','root','',{
    host:'localhost',
    dialect:'mysql',

});

module.exports = connection;