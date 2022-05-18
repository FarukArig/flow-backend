const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Chart = sequelize.define(
    "charts",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        stepList: DataTypes.JSON,
    },
    {
        indexes: [],
    }
);

module.exports = Chart;
