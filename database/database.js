const Sequelize = require('sequelize');
const connection = new Sequelize('giaperguntas','root','',{
    host:'localhost',
    dialect:'mysql',
    dialectOptions: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
});

module.exports = connection;