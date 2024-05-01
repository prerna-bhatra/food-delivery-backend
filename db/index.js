const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DBURL);

module.exports = {
    sequelize
};
